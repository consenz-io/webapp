/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_AUTH0_DOMAIN: string
    REACT_APP_AUTH0_CLIENT_ID: string
    REACT_APP_SECRET_HASURA: string
    REACT_APP_API_URL: string
  }
}
