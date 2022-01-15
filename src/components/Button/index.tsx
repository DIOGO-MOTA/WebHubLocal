import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loadin?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loadin, ...rest }) => (
  <Container type="button" {...rest}>
    {loadin ? 'Carregando...' : children}
  </Container>
);

export default Button;
