- [Back to Main](../README.md)
- [Set Up](#set-up)
- [Scripts](#scripts)
- [Folders](#folders)
- [Variables](#variables)

# 1. <a id="set-up">Set Up</a>

## 1.1. ENV variables

Follow instructions in https://hasura.io/docs/latest/graphql/core/guides/integrations/auth0-jwt/ to do the following:<br>
Create user in Auth0.<br>
Create a new app for development.<br>
Copy the client ID and client secret to new file '.env.local':
```
REACT_APP_SECRET_HASURA=[client_secret]
REACT_APP_AUTH0_DOMAIN=[auth0_domain_name]
REACT_APP_AUTH0_CLIENT_ID=[client_id]
```

# 2. <a id="scripts">Scripts</a>

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# 3. <a id="folders">Folders</a>

## 4.1. Components

Any component that can be used in a page should be in this folder.  
The folder is divided into sub-folders by subject of components, as necessary.

## 4.2. Pages

Each screen has its own folder, with the page layout and style.

# 3. <a id="variables">Variables</a>

## 3.1. Strings

All strings in the project are defined in the [strings](./src/strings/) folder, to allow easy compatibility with other languages.  

### How to add a string to the app:
- Add the name to [strings/bank.ts](./src/strings/bank.ts) (e.g. LOGIN_TAGLINE)
- Add the definition to [strings/en.ts](./src/strings/en.ts) (e.g. LOGIN_TAGLINE: "Sign In To Start Agreeing!")
- Add the definition to [strings/he.ts](./src/strings/he.ts) (optional)
- In the component:
```
import { useTranslation } from "react-i18next";

const {t} = useTranslation();
```
Use it in the returned content: 
```
{t(StringBank.LOGIN_TAGLINE)}
```
See example [pages/login/Login.tsx](./src/pages/login/Login.tsx)  

## 3.2 Theme

Theme variables are defined in [theme/theme.tsx](./src/theme/theme.tsx).  
Styles that are defined in the theme:  
__typography__  
__palette__  