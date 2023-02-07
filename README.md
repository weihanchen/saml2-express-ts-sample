saml2-express-ts-sample
===

This Project is an example for saml2 integration with [saml-idp](https://github.com/mcguinness/saml-idp)、auth0、OKTA.

🔥 Support Upload Metadata...

## Quick Start

### self-signed certificate
If you need stronger security, please use credentials for mutual security verification

generate service provider's cert

```sh
cd initial
openssl req -newkey rsa:4096 -x509 -nodes -sha256 -keyout sp.pem -out sp.crt
```

### Start with  Service Provider
```sh
npm run start:dev
```

### Configuration with IDP
- [(✔️ default) saml-idp](https://github.com/mcguinness/saml-idp)
```bash
git clone https://github.com/mcguinness/saml-idp

|- saml2-express-ts-sample
    |- ...
|- saml-idp
    |- ...

cd saml-idp

npm start -- --host=localhost \
             --port=5857 \
             --acsUrl=http://localhost:5858/auth/saml2/acs \
             --sloUrl=http://localhost:5858/auth/saml2/sls \
             --aud=http://localhost:5858/auth/saml2/acs \
             --enc=true \
             --encCert="../saml2-express-ts-sample/initial/sp.cer" \
             --encKey="../saml2-express-ts-sample/initial/sp.key"
```
- [auth0](./auth0.md)
- [okta](https://developer.okta.com/docs/concepts/saml/#federated-identity)




## Redirect to IDP
When the user directly accesses the service provider, sp should redirect to the idp login follow sso.

- GET `auth/saml2`: Redirect to IDP

## Identity Provider Configuration
- GET `/auth/saml2/metadata`: Metadata endpoint 
- POST `/auth/saml2/acs`: Assertion Consumer Service endpoint 
- GET `/auth/saml2/sls`: Single Logout Service endpoint 

## How to update idp configuration with metadata?

- PUT `/auth/saml2/idp-metadata`
    - body
        - url(string): `idp's metdata url`

```sh
curl -XPUT localhost:5858/auth/saml2/idp-metadata -d '{"url": "http://localhost:5857/metadata"}' -H 'Content-Type: application/json'
```


## Service Provider Configuration

[🔍 Here](./.env)
