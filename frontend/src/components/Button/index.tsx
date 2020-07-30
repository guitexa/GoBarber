import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container loading={Number(loading)} type="submit" {...rest}>
    {loading ? 'Enviando e-mail...' : children}
  </Container>
);

export default Button;
