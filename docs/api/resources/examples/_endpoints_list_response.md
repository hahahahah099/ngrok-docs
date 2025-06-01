<!-- Code generated for API Clients. DO NOT EDIT. -->

#### Example Response

```json
{
  "endpoints": [
    {
      "bindings": [
        "public"
      ],
      "created_at": "2025-06-01T10:07:08Z",
      "description": "sample cloud endpoint",
      "domain": {
        "id": "rd_2xtzzv8YHnKeCyXVsZ5CPMVaEdP",
        "uri": "https://api.ngrok.com/reserved_domains/rd_2xtzzv8YHnKeCyXVsZ5CPMVaEdP"
      },
      "hostport": "endpoint-example2.com:443",
      "id": "ep_2xu00XKbcUMoU9yppwX2pYW14UN",
      "metadata": "{\"environment\": \"staging\"}",
      "pooling_enabled": false,
      "proto": "https",
      "public_url": "https://endpoint-example2.com",
      "traffic_policy": "{\"on_http_request\":[{\"actions\":[{\"type\":\"deny\",\"config\":{\"status_code\":404}}]}]}",
      "type": "cloud",
      "updated_at": "2025-06-01T10:07:08Z",
      "uri": "https://api.ngrok.com/endpoints/ep_2xu00XKbcUMoU9yppwX2pYW14UN",
      "url": "https://endpoint-example2.com"
    },
    {
      "bindings": [
        "public"
      ],
      "created_at": "2025-06-01T10:07:06Z",
      "hostport": "27c51e805a95.ngrok.paid:443",
      "id": "ep_2xu00NHDbE367bOrHaC1L5RhQVL",
      "name": "command_line",
      "pooling_enabled": false,
      "principal": {
        "id": "usr_2xtzxpaEsd0yqyMyFO8MENEEVDK",
        "uri": ""
      },
      "proto": "https",
      "public_url": "https://27c51e805a95.ngrok.paid",
      "tunnel": {
        "id": "tn_2xu00NHDbE367bOrHaC1L5RhQVL",
        "uri": "https://api.ngrok.com/tunnels/tn_2xu00NHDbE367bOrHaC1L5RhQVL"
      },
      "tunnel_session": {
        "id": "ts_2xu00Jox3UoQJxnfVKJhSiYAwiw",
        "uri": "https://api.ngrok.com/tunnel_sessions/ts_2xu00Jox3UoQJxnfVKJhSiYAwiw"
      },
      "type": "ephemeral",
      "updated_at": "2025-06-01T10:07:06Z",
      "upstream_url": "http://localhost:80",
      "url": "https://27c51e805a95.ngrok.paid"
    },
    {
      "bindings": [
        "public"
      ],
      "created_at": "2025-06-01T10:07:03Z",
      "domain": {
        "id": "rd_2xtzzv8YHnKeCyXVsZ5CPMVaEdP",
        "uri": "https://api.ngrok.com/reserved_domains/rd_2xtzzv8YHnKeCyXVsZ5CPMVaEdP"
      },
      "edge": {
        "id": "edgtls_2xtzzuGTDHG7rtOUm73PNawJBhZ",
        "uri": "https://api.ngrok.com/edges/tls/edgtls_2xtzzuGTDHG7rtOUm73PNawJBhZ"
      },
      "hostport": "endpoint-example2.com:443",
      "id": "ep_2xtzztbE5xpEsGWYdNKEOvk0LIk",
      "pooling_enabled": false,
      "proto": "tls",
      "public_url": "tls://endpoint-example2.com",
      "type": "edge",
      "updated_at": "2025-06-01T10:07:03Z"
    }
  ],
  "next_page_uri": null,
  "uri": "https://api.ngrok.com/endpoints"
}
```
