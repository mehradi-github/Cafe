# Simulating Server Response with Mock Service Worker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up ESLint, Prettier and React Bootstrap

Install ESLint, Prettier, ESLint Plugin for Testing Library, ESLint Plugin for Jest DOM: [https://github.com/mehradi-github/Jest-RTL](https://github.com/mehradi-github/Jest-RTL)

Installing react-bootstrap Official Site: [https://react-bootstrap.github.io/getting-started/introduction](https://react-bootstrap.github.io/getting-started/introduction)

```sh
npm install react-bootstrap bootstrap
```

index.html

```html
<script
  src="https://unpkg.com/react/umd/react.production.min.js"
  crossorigin
></script>

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossorigin
></script>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin
></script>
```

src/index.tsx

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

## Simulating Data from Server

Mock by intercepting requests on the network level: [https://mswjs.io/docs/basics/response-resolver](https://mswjs.io/docs/basics/response-resolver)

```sh
npm i -D msw
```

Configure server: [https://mswjs.io/docs/getting-started/integrate/node](https://mswjs.io/docs/getting-started/integrate/node)

file src/mocks/server.ts

```javascript
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
```

file src/setupTests.ts

```javascript
import { server } from './mocks/server';
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
```

Mock Service Worker REST API:

[https://mswjs.io/docs/getting-started/mocks/rest-api](https://mswjs.io/docs/getting-started/mocks/rest-api)

Testing Library waitFor Method:
[https://testing-library.com/docs/dom-testing-library/api-async#waitfor](https://testing-library.com/docs/dom-testing-library/api-async#waitfor)

Kent C.Dodds Blog Post on Context with Embedded State
[https://kentcdodds.com/blog/application-state-management-with-react](https://kentcdodds.com/blog/application-state-management-with-react)

Testing Library Documentation for Creating Custom render Method
[https://testing-library.com/docs/react-testing-library/setup#custom-render](https://testing-library.com/docs/react-testing-library/setup#custom-render)

React Testing Library Documentation on Skipping Auto Cleanup
[https://testing-library.com/docs/react-testing-library/setup#skipping-auto-cleanup](https://testing-library.com/docs/react-testing-library/setup#skipping-auto-cleanup)
