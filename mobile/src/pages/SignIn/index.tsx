import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Login</Title>
      <Input
        name="email"
        icon="mail"
        placeholder="E-mail"
        autoCapitalize="none"
      />
      <Input
        name="password"
        icon="lock"
        placeholder="Senha"
        autoCapitalize="none"
      />
      <Button
        onPress={() => {
          console.log('ok');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default SignIn;
