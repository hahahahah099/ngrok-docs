<!-- Code generated for API Clients. DO NOT EDIT. -->

#### Example Response

```json
{
  "next_page_uri": null,
  "reserved_domains": [
    {
      "acme_challenge_cname_target": null,
      "certificate": {
        "id": "cert_2xtzxyq578DGxdgrwh9X4GpFWRq",
        "uri": "https://api.ngrok.com/tls_certificates/cert_2xtzxyq578DGxdgrwh9X4GpFWRq"
      },
      "certificate_management_policy": null,
      "certificate_management_status": null,
      "cname_target": "2udamkamcl8pjmrff.kbrggbfqbvg4ylv9.local-ngrok-cname.com",
      "created_at": "2025-06-01T10:06:47Z",
      "domain": "myapp.mydomain.com",
      "error_redirect_url": null,
      "http_endpoint_configuration": null,
      "https_endpoint_configuration": null,
      "id": "rd_2xtzxyRSTp2JIstLphFxQwbn9F6",
      "region": "",
      "uri": "https://api.ngrok.com/reserved_domains/rd_2xtzxyRSTp2JIstLphFxQwbn9F6"
    },
    {
      "acme_challenge_cname_target": null,
      "certificate": null,
      "certificate_management_policy": {
        "authority": "letsencrypt",
        "private_key_type": "ecdsa"
      },
      "certificate_management_status": {
        "provisioning_job": {
          "error_code": null,
          "msg": "Managed certificate provisioning in progress.",
          "retries_at": null,
          "started_at": "2025-06-01T10:06:47Z"
        },
        "renews_at": null
      },
      "cname_target": "4knqktdwka2umyjjc.kbrggbfqbvg4ylv9.local-ngrok-cname.com",
      "created_at": "2025-06-01T10:06:47Z",
      "description": "Device 0001 Dashboard",
      "domain": "manage-0002.app.example.com",
      "error_redirect_url": null,
      "http_endpoint_configuration": null,
      "https_endpoint_configuration": null,
      "id": "rd_2xtzxsx3Whh1KlMDjfvMJiYE0ig",
      "metadata": "{\"service\": \"dashboard\"}",
      "region": "",
      "uri": "https://api.ngrok.com/reserved_domains/rd_2xtzxsx3Whh1KlMDjfvMJiYE0ig"
    }
  ],
  "uri": "https://api.ngrok.com/reserved_domains"
}
```
