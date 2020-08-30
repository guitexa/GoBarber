import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import SignIn from '../../pages/SignIn';

const mockedNavigate = jest.fn();
const mockedSignIn = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

describe('SignIn page', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    mockedSignIn.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByTestId('enter-button');

    fireEvent.changeText(emailField, 'janedoe@mail.com');
    fireEvent.changeText(passwordField, '123456');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('Dashboard');
    });
  });
});
