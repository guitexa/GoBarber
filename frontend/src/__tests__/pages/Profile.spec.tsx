import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import Profile from '../../pages/Profile';
import api from '../../services/api';

const mockedApi = new MockAdapter(api);
const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedUpdateUser = jest.fn();
const mockedUser = {
  id: '12345',
  name: 'Barber',
  email: 'mail@mail.com',
  avatar_url: 'barberavatar.png',
  password: 123456,
};
const newUserData = {
  id: mockedUser.id,
  name: 'Jane Doe',
  email: 'janedoe@mail.com',
  avatar_url: 'barberavatar.png',
  old_password: mockedUser.password,
  password: '123123',
  password_confirmation: '123123',
};

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      updateUser: mockedUpdateUser,
      user: mockedUser,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

mockedApi.onPut().reply(200);
mockedApi.onPatch().reply(200);

describe('Profile Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to update name', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome (Opcional)');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(nameField, { target: { value: newUserData.name } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        })
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should be able to update email', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const emailField = getByPlaceholderText('E-mail (Opcional)');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(emailField, { target: { value: newUserData.email } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        })
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should be able to update name and email', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome (Opcional)');
    const emailField = getByPlaceholderText('E-mail (Opcional)');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(nameField, { target: { value: newUserData.name } });
    fireEvent.change(emailField, { target: { value: newUserData.email } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        })
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should be able to update password', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const currentPasswordField = getByPlaceholderText('Senha atual');
    const newPasswordField = getByPlaceholderText('Nova senha');
    const confirmPasswordField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(currentPasswordField, {
      target: { value: mockedUser.password },
    });
    fireEvent.change(newPasswordField, {
      target: { value: newUserData.password },
    });
    fireEvent.change(confirmPasswordField, {
      target: { value: newUserData.password_confirmation },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        })
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should be able to update name and password', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome (Opcional)');
    const currentPasswordField = getByPlaceholderText('Senha atual');
    const newPasswordField = getByPlaceholderText('Nova senha');
    const confirmPasswordField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(nameField, { target: { value: newUserData.name } });
    fireEvent.change(currentPasswordField, {
      target: { value: mockedUser.password },
    });
    fireEvent.change(newPasswordField, {
      target: { value: newUserData.password },
    });
    fireEvent.change(confirmPasswordField, {
      target: { value: newUserData.password_confirmation },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        })
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should be able to update email and password', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const emailField = getByPlaceholderText('E-mail (Opcional)');
    const currentPasswordField = getByPlaceholderText('Senha atual');
    const newPasswordField = getByPlaceholderText('Nova senha');
    const confirmPasswordField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(emailField, { target: { value: newUserData.email } });
    fireEvent.change(currentPasswordField, {
      target: { value: mockedUser.password },
    });
    fireEvent.change(newPasswordField, {
      target: { value: newUserData.password },
    });
    fireEvent.change(confirmPasswordField, {
      target: { value: newUserData.password_confirmation },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        })
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should be able to update name, email and password', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome (Opcional)');
    const emailField = getByPlaceholderText('E-mail (Opcional)');
    const currentPasswordField = getByPlaceholderText('Senha atual');
    const newPasswordField = getByPlaceholderText('Nova senha');
    const confirmPasswordField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(nameField, { target: { value: newUserData.name } });
    fireEvent.change(emailField, { target: { value: newUserData.email } });
    fireEvent.change(currentPasswordField, {
      target: { value: mockedUser.password },
    });
    fireEvent.change(newPasswordField, {
      target: { value: newUserData.password },
    });
    fireEvent.change(confirmPasswordField, {
      target: { value: newUserData.password_confirmation },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        })
      );
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should NOT be able to update without data', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome (Opcional)');
    const emailField = getByPlaceholderText('E-mail (Opcional)');
    const currentPasswordField = getByPlaceholderText('Senha atual');
    const newPasswordField = getByPlaceholderText('Nova senha');
    const confirmPasswordField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(nameField, { target: { value: '' } });
    fireEvent.change(emailField, { target: { value: '' } });
    fireEvent.change(currentPasswordField, { target: { value: '' } });
    fireEvent.change(newPasswordField, { target: { value: '' } });
    fireEvent.change(confirmPasswordField, { target: { value: '' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        })
      );
    });
  });

  it('should NOT be able to update without old_password', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const confirmPasswordField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(newPasswordField, {
      target: { value: newUserData.password },
    });
    fireEvent.change(confirmPasswordField, {
      target: { value: newUserData.password_confirmation },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should NOT be able to update without password', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const currentPasswordField = getByPlaceholderText('Senha atual');
    const confirmPasswordField = getByPlaceholderText('Confirmar senha');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(currentPasswordField, {
      target: { value: mockedUser.password },
    });
    fireEvent.change(confirmPasswordField, {
      target: { value: newUserData.password_confirmation },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should NOT be able to update without password_confirmation', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const currentPasswordField = getByPlaceholderText('Senha atual');
    const newPasswordField = getByPlaceholderText('Nova senha');
    const buttonElement = getByText('Confirmar alterações');

    fireEvent.change(currentPasswordField, {
      target: { value: mockedUser.password },
    });
    fireEvent.change(newPasswordField, {
      target: { value: newUserData.password },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should NOT be able to update if API fails', async () => {
    mockedApi.onPut().reply(500);

    const { getByText } = render(<Profile />);

    const buttonElement = getByText('Confirmar alterações');

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should be able to update avatar', async () => {
    const { getByTestId } = render(<Profile />);

    const inputAvatarField = getByTestId('input-avatar');

    fireEvent.change(inputAvatarField, { target: { files: ['file.png'] } });

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        })
      );
    });
  });
});
