# Getting Started with Create React App

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
