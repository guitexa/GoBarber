import React, { useEffect, useCallback, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  ForgorPassword,
  ForgorPasswordText,
  CreateAccount,
  CreateAccountText,
} from './styles';

const SignIn: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const keyboardDidShow = useCallback(() => {
    setOpen(true);
  }, []);

  const keyboardDidHide = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Login</Title>
            </View>
            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              autoCapitalize="none"
              onSubmitEditing={Keyboard.dismiss}
            />
            <Input
              name="password"
              icon="lock"
              placeholder="Senha"
              autoCapitalize="none"
              onSubmitEditing={Keyboard.dismiss}
            />
            <Button onPress={() => {}}>Entrar</Button>
            <ForgorPassword onPress={() => {}}>
              <ForgorPasswordText>Esqueci minha senha</ForgorPasswordText>
            </ForgorPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      {!open && (
        <CreateAccount>
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountText>Criar uma conta</CreateAccountText>
        </CreateAccount>
      )}
    </>
  );
};

export default SignIn;
