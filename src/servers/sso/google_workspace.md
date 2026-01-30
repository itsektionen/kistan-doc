# Google Workspace

We authenticate users using their Google Workspace credentials via SAML.

The SAML application is set up in the [Google Admin Console][1], only accessible using the admin account. The application is then located under Apps->Web and mobile apps->Authentik.

## Attributes

User attributes are shared with Authentik. For the group membership information, the Google Groups that should be sent in the SAML response must be added here **manually**.

- Email - `email`
- First name - `first_name`
- Last name - `last_name`
- Google Groups - `groups`

## Settings

SSO config as signed responses have the following url settings.

- ACS URL - `https://sso.kth.it/source/saml/google/acs/`
- Entity ID - `https://sso.kth.it`
- Start ID - `https://sso.kth.it`

The name ID format used is the primary email.

_(These settings might change over time. Check [Authentik Docs][2] for the latest settings if something breaks.)_

## Certificates

The current certificates expire on 9 Sept 2030.

[1]: https://admin.google.com/
[2]: https://docs.goauthentik.io/
