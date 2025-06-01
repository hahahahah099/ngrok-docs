<!-- Code generated for API Clients. DO NOT EDIT. -->

#### Example Response

```json
{
  "next_page_uri": null,
  "tls_edges": [
    {
      "backend": null,
      "created_at": "2025-06-01T10:07:13Z",
      "description": "acme tls edge",
      "hostports": [
        "example.com:443"
      ],
      "id": "edgtls_2xu01AyHJHYRNfjt8LhKecjQ4Gr",
      "ip_restriction": null,
      "metadata": "{\"environment\": \"staging\"}",
      "mutual_tls": null,
      "policy": null,
      "tls_termination": null,
      "traffic_policy": null,
      "uri": "https://api.ngrok.com/edges/tls/edgtls_2xu01AyHJHYRNfjt8LhKecjQ4Gr"
    },
    {
      "backend": {
        "backend": {
          "id": "bkdhr_2xu0006rUBkfPzJZj6xo6Fo8gxp",
          "uri": "https://api.ngrok.com/backends/http_response/bkdhr_2xu0006rUBkfPzJZj6xo6Fo8gxp"
        },
        "enabled": true
      },
      "created_at": "2025-06-01T10:07:03Z",
      "description": "acme tls edge",
      "hostports": [
        "endpoint-example2.com:443"
      ],
      "id": "edgtls_2xtzzuGTDHG7rtOUm73PNawJBhZ",
      "ip_restriction": null,
      "mutual_tls": null,
      "policy": null,
      "tls_termination": null,
      "traffic_policy": null,
      "uri": "https://api.ngrok.com/edges/tls/edgtls_2xtzzuGTDHG7rtOUm73PNawJBhZ"
    }
  ],
  "uri": "https://api.ngrok.com/edges/tls"
}
```
