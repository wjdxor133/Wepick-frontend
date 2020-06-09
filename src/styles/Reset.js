import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:boerder-box;
    }
    @font-face {
      font-family: 'Roboto', 'Noto Sans KR';
      src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap');
    }
    body{
      font-family: 'Roboto', 'Noto Sans KR', sans-serif;
    }
`;


export default globalStyles;