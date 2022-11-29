# Auth0 Configuration Example

- install cert to service provider.
- basic setting with auth0 login.
- ! idp not certificate with sp.

## Step 1: Create Application

![Create Application](./images/create_application.png)

## Step 2: SAML2 Addons

![SAML2 Addons](./images/saml2_addons.png)

## Step 3: Download Certificate

![Download Certificate](./images/download_cert.png)

Move certificate to initial/idp.cert

```bash
mv xxx.pem initial/idp.cert
```

## Step 4: Setting SAML2_IDP_SSO

![Setting SAML2_IDP_SSO](./images/setting_idp_endpoint.png)

.env

```
SAML2_IDP_SSO=https://dev-8z3xgtyu.us.auth0.com/samlp/84P0UWeAdh1Eh9BQmVezXQeeoUngM2YC
```


## Step 5: Setting Callback URL

![ACS Setting](./images/saml2_acs_setting.png)

## Step 6: Run Server

```bash
npm run start:dev
```

## Step 7: Open browser and test it

![Open Browser](./images/open_browser.png)

## Step 8: Login Success

![Login Success](./images/login_success.png)