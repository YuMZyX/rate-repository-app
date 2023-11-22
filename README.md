# Rate repository app
Rate repository app created with React Native for reviewing GitHub repositories.

Initial API for the application has been created by Kalle Ilves from Helsinki University and then forked and refactored by me for production readiness.
https://github.com/YuMZyX/rate-repository-api

## ✔️ Requirements

Works at least with Node version v16.19.0 (does not work currently eg. with Node v18.13.0). If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Nvm is also handy if you want to quickly switch between different Node versions.

## 🚀 Getting started

0. ensure that you are using the right Node version:

```bash
$ node -v
v16.19.0
```

1. Clone this repository and run `npm install` in the `rate-repository-app` directory.
   
2. Create a file `.env` in the `rate-repository-app` directory and add `APOLLO_URI` variable with url of the API as a value (usually in the form of http://MY_IP:4000/graphql when running the API locally).
   
3. Run `npm start` to start the application with Metro builder and use either the web view, android/ios emulator or Expo Go application that is installed to your phone to use the application.


Anonymous users have following features:
- A list of public GitHub repositories that have been reviewed in the app, including their avatar, fork count, code language, star count, review count, rating and description.
- Possibility to click/press any repository in the list to see their reviews and to see a button leading to the repository itself.
- Possibility to sign up and sign in

Signed in users can also:
- Create reviews for any public GitHub repositories including ones that are not yet listed in the application
- See a list of reviews created by yourself.
- Delete reviews created by yourself.


![image](https://github.com/YuMZyX/osa10/assets/145103073/01092a29-c746-475e-8478-9a5f1e32e754)


## 🐛 Found a bug?

Submit an issue with the bug description and a sway to reproduce the bug.
