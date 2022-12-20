saml2-express-ts-sample
===

This Project is an example for saml2 integration with auth0、OKTA、[saml-idp](https://github.com/mcguinness/saml-idp).

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
- [auth0](./auth0.md)
- [okta](https://developer.okta.com/docs/concepts/saml/#federated-identity)
- [saml-idp](https://github.com/mcguinness/saml-idp)
```bash
git clone https://github.com/mcguinness/saml-idp

npm start -- --host=localhost \
             --acsUrl=http://localhost:5858/auth/saml2/acs \
             --sloUrl=http://localhost:5858/auth/saml2/sls \
             --aud=http://localhost:5858/auth/saml2/acs \
             --enc=true \
             --encCert=sp.cer \
             --encKey=sp.key
```


## Redirect to IDP
When the user directly accesses the service provider, sp should redirect to the idp login follow sso.

- GET `auth/saml2`: Redirect to IDP

## Identity Provider Configuration
- GET `/auth/saml2/metadata`: Metadata endpoint 
- POST `/auth/saml2/acs`: Assertion Consumer Service endpoint 
- GET `/auth/saml2/sls`: Single Logout Service endpoint 


## Service Provider Configuration

[🔍 Here](./.env)
