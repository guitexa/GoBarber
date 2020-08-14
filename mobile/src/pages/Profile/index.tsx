import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Alert,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';

import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  AvatarContainer,
  CameraContainer,
  Avatar,
  ContainerTitle,
  Title,
  ButtonSignOut,
  ButtonSignOutText,
} from './styles';

interface DataForm {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signOut, updateUser } = useAuth();

  const { goBack, reset } = useNavigation();

  const [open, setOpen] = useState(false);

  const handleAvatarChange = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma imagem',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher na galeria',
      },
      (response) => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar avatar');
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api
          .patch('/users/avatar', data)
          .then((apiResponse) => updateUser(apiResponse.data));

        Alert.alert('Sucesso!', 'Avatar atualizado com sucesso');
      }
    );
  }, [updateUser, user.id]);

  const handleSubmit = useCallback(
    async (data: DataForm) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape(
          {
            name: Yup.string(),
            email: Yup.string().email('Digite um e-mail válido'),
            old_password: Yup.string().when(
              ['password', 'password_confirmation'],
              {
                is: (val) => !!val,
                then: Yup.string().required('Senha obrigatória'),
              }
            ),
            password: Yup.string().when(
              ['old_password', 'password_confirmation'],
              {
                is: (val) => !!val,
                then: Yup.string()
                  .required('Senha obrigatória')
                  .min(6, 'Senha deve ter no mínimo 6 dígitos'),
              }
            ),
            password_confirmation: Yup.string()
              .when(['password', 'old_password'], {
                is: (val) => !!val,
                then: Yup.string().required('Campo obrigatório'),
              })
              .oneOf([Yup.ref('password')], 'Senha redigitada não confere'),
          },
          [
            ['password', 'password_confirmation'],
            ['old_password', 'password_confirmation'],
            ['password', 'old_password'],
          ]
        );

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
          ...(name && email ? { name, email } : {}),
          ...(name && old_password
            ? { name, old_password, password, password_confirmation }
            : {}),
          ...(email && old_password
            ? { email, old_password, password, password_confirmation }
            : {}),
          ...(name && email && old_password
            ? { name, email, old_password, password, password_confirmation }
            : {}),
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        if (Object(formData).length === 0) {
          return Alert.alert(
            'Erro',
            'Para atualizar seu cadastro você deve preencher algum dos campos'
          );
        }

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Sucesso!!!', 'Perfil atualizado com sucesso!');

        reset({
          index: 0,
          routes: [
            {
              name: 'Dashboard',
            },
          ],
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na atualização',
          'Verifique as informações e tente novamente'
        );
      }
    },
    [reset, updateUser]
  );

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  useEffect(
    useCallback(() => {
      const onBackPress = () => {
        goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [goBack])
  );

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
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Container>
            {!open && (
              <Header>
                <BackButton onPress={() => goBack()}>
                  <Icon name="chevron-left" size={25} color="#f5ede8" />
                </BackButton>
                <AvatarContainer>
                  <CameraContainer onPress={handleAvatarChange}>
                    <Icon name="camera" size={27} color="#312e38" />
                  </CameraContainer>
                  <Avatar source={{ uri: user.avatar_url }} />
                </AvatarContainer>
              </Header>
            )}
            <ContainerTitle>
              <Title>Meu perfil</Title>
            </ContainerTitle>
            <Form
              style={{
                width: '100%',
                paddingLeft: 18,
                paddingRight: 18,
              }}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                defaultValue={user.name}
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
              />
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail (Opcional)"
                defaultValue={user.email}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
              />
              <Input
                containerStyle={{ marginTop: 10 }}
                name="old_password"
                icon="lock"
                placeholder="Senha Atual"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Nova Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={Keyboard.dismiss}
              />
              <Input
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                  Keyboard.dismiss;
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Atualizar perfil
              </Button>
            </Form>
            {!open && (
              <ButtonSignOut onPress={() => signOut()}>
                <ButtonSignOutText>Sair da conta</ButtonSignOutText>
                <Icon name="log-out" size={20} color="#999591" />
              </ButtonSignOut>
            )}
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
