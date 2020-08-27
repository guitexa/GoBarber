import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  Header,
  ProfilePic,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const data = new FormData();

        data.append('avatar', event.target.files[0]);

        api
          .patch('/users/avatar', data)
          .then((response) => updateUser(response.data));
      }

      addToast({
        type: 'success',
        title: 'Avatar atualizado com sucesso',
      });
    },
    [updateUser, addToast]
  );

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
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

        if (Object.entries(formData).length === 0) {
          return addToast({
            type: 'error',
            title:
              'Para atualizar seu cadastro você deve preencher algum dos campos',
          });
        }

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado com sucesso!',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro na atualização',
          type: 'error',
          description: 'Verifique as informações e tente novamente',
        });
      }
    },
    [addToast, history, updateUser]
  );

  return (
    <Container>
      <Header>
        <div>
          <Link to={'/dashboard'}>
            <FiArrowLeft size={25} />
          </Link>
        </div>
      </Header>
      <Content>
        <AnimationContainer>
          <ProfilePic>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera size={20} />
              <input
                type="file"
                id="avatar"
                data-testid="input-avatar"
                onChange={handleAvatarChange}
              />
            </label>
          </ProfilePic>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Meu perfil</h1>
            <Input
              name="name"
              defaultValue={user.name}
              icon={FiUser}
              autoFocus
              placeholder="Nome (Opcional)"
            />
            <Input
              name="email"
              defaultValue={user.email}
              icon={FiMail}
              placeholder="E-mail (Opcional)"
            />
            <Input
              styled={{ marginTop: 20 }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />
            <Button>Confirmar alterações</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Profile;
