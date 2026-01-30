# Login flow

1. User navigates to app domain. Ex. [https://lmixer.kth.it][1].
2. User is redirected to the SSO service at [https://sso.kth.it][2].
3. User needs to log in and is redirected to Google sign in.
4. After sign in user is redirected back to the SSO service.
5. User is checked against group and roles.
6. If app is assigned to any group the user belongs to access is granted.
7. If all OK, redirect back to the app that was requested.

[1]: https://lmixer.kth.it
[2]: https://sso.kth.it
