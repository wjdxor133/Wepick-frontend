import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Routes from "./Routes";
import Reset from "./styles/Reset";
import Common from "./styles/Common";
import "./styles/Common.js";

ReactDOM.render(
    <ThemeProvider theme={Common}>
        <Reset />
        <Routes />
    </ThemeProvider>
    , document.getElementById('root'));

