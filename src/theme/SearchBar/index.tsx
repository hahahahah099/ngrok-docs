import type { AutocompleteState } from "@algolia/autocomplete-core";
import { DocSearchButton, useDocSearchKeyboardEvents } from "@docsearch/react";
import type {
	DocSearchHit,
	DocSearchModalProps,
	DocSearchModal as DocSearchModalType,
	DocSearchTransformClient,
	InternalDocSearchHit,
	StoredDocSearchHit,
} from "@docsearch/react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { useHistory } from "@docusaurus/router";
import {
	isRegexpStringMatch,
	useSearchLinkCreator,
} from "@docusaurus/theme-common";
import {
	useAlgoliaContextualFacetFilters,
	useSearchResultUrlProcessor,
} from "@docusaurus/theme-search-algolia/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import translations from "@theme/SearchTranslations";
import type { FacetFilters } from "algoliasearch/lite";
import type React from "react";
import {
	type ComponentRef,
	type ReactNode,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";

type DocSearchProps = Omit<
	DocSearchModalProps,
	"onClose" | "initialScrollY"
> & {
	contextualSearch?: string;
	externalUrlRegex?: string;
	searchPagePath: boolean | string;
};

let DocSearchModal: typeof DocSearchModalType | null = null;

function importDocSearchModalIfNeeded() {
	if (DocSearchModal) {
		return Promise.resolve();
	}
	return Promise.all([
		// @ts-expect-error
		import("@docsearch/react/modal"),
		// @ts-expect-error
		import("@docsearch/react/style"),
		import("./styles.css"),
	]).then(([{ DocSearchModal: Modal }]) => {
		DocSearchModal = Modal;
	});
}

function useNavigator({
	externalUrlRegex,
}: Pick<DocSearchProps, "externalUrlRegex">) {
	const history = useHistory();
	const [navigator] = useState<DocSearchModalProps["navigator"]>(() => {
		return {
			navigate(params) {
				// Algolia results could contain URL's from other domains which cannot
				// be served through history and should navigate with window.location
				if (isRegexpStringMatch(externalUrlRegex, params.itemUrl)) {
					window.location.href = params.itemUrl;
				} else {
					history.push(params.itemUrl);
				}
			},
		};
	});
	return navigator;
}

function useTransformSearchClient(): DocSearchModalProps["transformSearchClient"] {
	const {
		siteMetadata: { docusaurusVersion },
	} = useDocusaurusContext();
	return useCallback(
		(searchClient: DocSearchTransformClient) => {
			searchClient.addAlgoliaAgent("docusaurus", docusaurusVersion);
			return searchClient;
		},
		[docusaurusVersion],
	);
}

function useTransformItems(props: Pick<DocSearchProps, "transformItems">) {
	const processSearchResultUrl = useSearchResultUrlProcessor();
	const [transformItems] = useState<DocSearchModalProps["transformItems"]>(
		() => {
			return (items: DocSearchHit[]) =>
				props.transformItems
					? // Custom transformItems
						props.transformItems(items)
					: // Default transformItems
						items.map((item) => ({
							...item,
							url: processSearchResultUrl(item.url),
						}));
		},
	);
	return transformItems;
}

function useResultsFooterComponent({
	closeModal,
}: {
	closeModal: () => void;
}): DocSearchProps["resultsFooterComponent"] {
	return useMemo(
		() =>
			({ state }) => <ResultsFooter state={state} onClose={closeModal} />,
		[closeModal],
	);
}

type CustomFields = {
	isProduction: boolean;
	vercel: {
		env: string;
		url: string;
	};
};

/**
 * Returns a different root URL based on environment.
 * This prevents search results from sending you to
 * prod when you're using docs in localhost.
 */
const getUrlRootForHit = ({ isProduction, vercel }: CustomFields) => {
	if (!isProduction) return "http://localhost:3000";

	// Return preview URL if we're in a Vercel preview deployment
	if (vercel?.env === "preview") return `https://${vercel.url}`;

	return "https://ngrok.com";
};

/**
 * We're using <a> instead of <Link> as a temporary workaround until we get server side redirects set up.
 * Currently we use CSR, which doesn't trigger our redirect script, so search results hit 404s if the page is intended to be redirected.
 */
function Hit({
	hit,
	children,
}: {
	hit: InternalDocSearchHit | StoredDocSearchHit;
	children: React.ReactNode;
}) {
	const {
		siteConfig: { customFields },
	} = useDocusaurusContext();
	const root = getUrlRootForHit(customFields as CustomFields);
	return <a href={`${root}${hit.url}`}>{children}</a>;
}

type ResultsFooterProps = {
	state: AutocompleteState<InternalDocSearchHit>;
	onClose: () => void;
};

function ResultsFooter({ state, onClose }: ResultsFooterProps) {
	const createSearchLink = useSearchLinkCreator();

	return (
		<Link to={createSearchLink(state.query)} onClick={onClose}>
			<Translate
				id="theme.SearchBar.seeAll"
				values={{ count: state.context.nbHits }}
			>
				{"See all {count} results"}
			</Translate>
		</Link>
	);
}

function useSearchParameters({
	contextualSearch,
	...props
}: DocSearchProps): DocSearchProps["searchParameters"] {
	function mergeFacetFilters(f1: FacetFilters, f2: FacetFilters): FacetFilters {
		const normalize = (f: FacetFilters): FacetFilters =>
			typeof f === "string" ? [f] : f;
		return [...normalize(f1), ...normalize(f2)];
	}

	const contextualSearchFacetFilters =
		useAlgoliaContextualFacetFilters() as FacetFilters;

	const configFacetFilters: FacetFilters =
		props.searchParameters?.facetFilters ?? [];

	const facetFilters: FacetFilters = contextualSearch
		? // Merge contextual search filters with config filters
			mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
		: // ... or use config facetFilters
			configFacetFilters;

	// We let users override default searchParameters if they want to
	return {
		...props.searchParameters,
		facetFilters,
	};
}

function DocSearch({ externalUrlRegex, ...props }: DocSearchProps) {
	const navigator = useNavigator({ externalUrlRegex });
	const searchParameters = useSearchParameters({ ...props });
	const transformItems = useTransformItems(props);
	const transformSearchClient = useTransformSearchClient();

	const searchContainer = useRef<ComponentRef<"div"> | null>(null);
	const searchButtonRef = useRef<ComponentRef<"button"> | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [initialQuery, setInitialQuery] = useState<string | undefined>(
		undefined,
	);

	const prepareSearchContainer = useCallback(() => {
		if (!searchContainer.current) {
			const divElement = document.createElement("div");
			searchContainer.current = divElement;
			document.body.insertBefore(divElement, document.body.firstChild);
		}
	}, []);

	const openModal = useCallback(() => {
		prepareSearchContainer();
		importDocSearchModalIfNeeded().then(() => setIsOpen(true));
	}, [prepareSearchContainer]);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		searchButtonRef.current?.focus();
		setInitialQuery(undefined);
	}, []);

	const handleInput = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "f" && (event.metaKey || event.ctrlKey)) {
				// ignore browser's ctrl+f
				return;
			}
			// prevents duplicate key insertion in the modal input
			event.preventDefault();
			setInitialQuery(event.key);
			openModal();
		},
		[openModal],
	);

	const resultsFooterComponent = useResultsFooterComponent({ closeModal });

	useDocSearchKeyboardEvents({
		isOpen,
		onOpen: openModal,
		onClose: closeModal,
		onInput: handleInput,
		searchButtonRef,
	});

	return (
		<>
			<Head>
				{/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
				<link
					rel="preconnect"
					href={`https://${props.appId}-dsn.algolia.net`}
					crossOrigin="anonymous"
				/>
			</Head>

			<DocSearchButton
				onTouchStart={importDocSearchModalIfNeeded}
				onFocus={importDocSearchModalIfNeeded}
				onMouseOver={importDocSearchModalIfNeeded}
				onClick={openModal}
				ref={searchButtonRef}
				translations={props.translations?.button ?? translations.button}
			/>

			{isOpen &&
				DocSearchModal &&
				searchContainer.current &&
				createPortal(
					<DocSearchModal
						onClose={closeModal}
						initialScrollY={window.scrollY}
						initialQuery={initialQuery}
						navigator={navigator}
						transformItems={transformItems}
						hitComponent={Hit}
						transformSearchClient={transformSearchClient}
						{...(props.searchPagePath && {
							resultsFooterComponent,
						})}
						placeholder={translations.placeholder}
						{...props}
						translations={props.translations?.modal ?? translations.modal}
						searchParameters={searchParameters}
					/>,
					searchContainer.current,
				)}
		</>
	);
}

export default function SearchBar(): ReactNode {
	const { siteConfig } = useDocusaurusContext();
	return <DocSearch {...(siteConfig.themeConfig.algolia as DocSearchProps)} />;
}
