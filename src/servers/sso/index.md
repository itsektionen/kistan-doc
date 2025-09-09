# SSO / Login

## Software

We use a software called [Authentik][1] to manage access to different resources.
It is hosted on the servers in Kistan and provides federated access to all
resources and apps. It can be used as a backend for both OAuth2, SAML and OIDC.
This is supported by Google Workspace via LDAP as the source for accounts and
groups.

The service is hosted on the domain [https://goauthentik.io/][2] where a login
will also show a dashboard with available apps.

## Login flow

1. User navigates to app domain.
2. User is redirected to the SSO service at [https://sso.kth.it][2].
3. User needs to log in and is redirected to Google sign in.
4. After sign in user is redirected back to the SSO service.
5. User is checked against group and roles.
6. If all OK, redirect back to the app requested.

## Auth proxy

Services that needs to be controlled by auth that we host ourselves can add
authentication using the [Traefik][3] proxy. The app also needs to be added with
access control to the SSO service to be allowed in the proxy.

[1]: https://goauthentik.io/

[2]: https://sso.kth.it

[3]: https://traefik.io