import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Routes from "./Routes";
import Reset from "./styles/Reset";
import Common from "./styles/Common";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers"

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <ThemeProvider theme={Common}>
    <Provider store={store}>
      <Reset />
      <Routes />
    </Provider>
  </ThemeProvider>
,document.getElementById('root')
);