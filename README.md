# My todo list

## Technologies: React + Redux + Express + Typescript


### Backend
To create a backend I followed by the next guide:
[How to Create a Simple REST API using TypeScript and Node.js](https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/)
But I used [cors middleware](https://expressjs.com/en/resources/middleware/cors.html) instead of adding CORS headers manually (section "Setting up the server")


### Frontend
To create a frontend I followed by the next guide:
[Create React App without Create React App](https://blog.bitsrc.io/create-react-app-without-create-react-app-b0a5806a92)
Some clarifications regarding this guide:
* Step 7 "Create index.html file". Here you need to create a html-element (like div) with id "root".
  You also need to include main.js in your html `<script src="main.js" async></script>`
* Step 8 "Create index.js file". As I used a newer React version I got the error "ReactDOM.render is no longer supported in React 18"
  So I called the render() method in other way
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

<details>
<summary>Then I added TypeScript to my project</summary>

* <b>Step 1</b>: Install "ts-loader" package

`npm i ts-loader -D`

* <b>Step 2</b>: Add tsconfig.json file (configuration for TS)

<details>
<summary>tsconfig.json</summary>

```
{
  "compilerOptions": {
    "target": "es6",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
```
</details>

* <b>Step 3</b>: Change webpack config

<details>
<summary>webpack.config.js</summary>

```
module.exports = {
  //...
  resolve: {
    extensions: ['.ts','.tsx','.js','.jsx','.json']
  },
  //...
  rules: [
    //...
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: 'ts-loader'
    }
  ],
  //...
}
```
</details>

* <b>Step 4</b>: Rename all your components extension from \*.js/\*.jsx to \*.tsx.
  For example: App.js -> App.tsx


</details>
