import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
:root {
  --background: #E5E5E5;
  --background-button: #ff9000;
  --text-body: #969CB3;
  --text-title: #363F5F;
  --text-title2: #ffffff;
  --shape:#3e3b47;

}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}

body {
  background: #312E38;
  color: #FFF;
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font-family: 'Roboto Slad', serif;
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6, strong {
  font-weight: 500;
}

a {
  text-decoration: none;
}

button{
  cursor: pointer;
}

`;
