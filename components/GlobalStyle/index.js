import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  body {
    font-family: 'Helvetica', 'Arial', 'PingFang TC', 'Heiti TC', 'Microsoft Jhenghei', sans-serif;
    font-size: 14px;
  }

  a {
    text-decoration: none;
  }

  #__next {
    position: relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

export default GlobalStyle;
