# Veritheum

### Requirements

#### Node.js & yarn

Node version `16.10.0` and up needed to run the React scripts. And yarn to run the scripts and handle dependencies.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Development

Install node dependencies:

    yarn (install)

Run dev server for development in the browser:

    yarn start

To build application for production:

    yarn build

Run test handled by [testing-library](https://testing-library.com/):

    yarn test

### Chaining Redux actions

To dispatch another action after certain action is complete we can use [chainActionsMiddleware](./src/store/index.js).

For example:

```javascript
// CREATE ActionChains object ({ [CauseActionType]: Array<NextAction> | NextAction })
const actionChains = {
    // Once ACTION_ONE is dispatched middleware 'chainActionsMiddleware' will dispatch ACTION_TWO
    'ACTION_ONE': 'ACTION_TWO',
    // Once DSP_SILENT_LOGIN_FULFILLED is dispatched action created by actions.wiFetchNewItems() will be dispatched
    [types.DSP_SILENT_LOGIN_FULFILLED]: () => actions.wiFetchNewItems(),
    // To send multiple actions set array of actions
    'ACTION_ONE': ['ACTION_TWO', () => ({ type: 'ACTION_THREE' })]
};

// PASS actionChains object to configureStore function in /src/index.js
const store = configureStore(initialReduxState, actionChains);
```

### Environment Variables

Add `.env` file to root directory. Variables must start with a prefix `REACT_APP_`. Variable named `REACT_APP_API_URL` is then accessed in the code with

    process.env.REACT_APP_API_URL

Node variables are populated only during initial dev server load, so restart server when adding or updating variables.

#### A list of all used variables
    ESLINT_NO_DEV_ERRORS="true"
    REACT_APP_API_BASE_URL=""
    REACT_APP_API_VERSION="v1"
    REACT_APP_LOCAL_API_PORT="3000"
    REACT_APP_ORCID_CLIENT_ID="<secret>"
    REACT_APP_ORCID_SECRET="<secret>"
    REACT_APP_REDUX_ACTIONS_DENYLIST=""
    REACT_APP_REDUX_SANITIZER="false"
    REACT_APP_REDUX_STATE_LOG="false"

#### Other env variables

During development, you can avoid your webpack build failing because of `eslint` errors by adding env variable:

    ESLINT_NO_DEV_ERRORS="true"

To make Redux dev tools skip recording certain actions set

    REACT_APP_REDUX_ACTIONS_DENYLIST="ACTION_ONE,ACTION_TWO"

To make Redux dev tools stop serializing large chunks of data

    REACT_APP_REDUX_SANITIZER="false"

> This can also be achieved by adding `disable_sanitizer=true` to the sessionStorage and then reload the browser window, it will only work until the end of the browser session

To log Redux store

    REACT_APP_REDUX_STATE_LOG="true"

Useful during development to view whole store when `REACT_APP_REDUX_SANITIZER` is enabled