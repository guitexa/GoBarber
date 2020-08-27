import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import RouteData from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import ResetPassword from '../../pages/ResetPassword';
import api from '../../services/api';

const mockedHistoryPush = jest.fn();
const mockedToken = {
  withToken: {
    pathname: '',
    hash: '',
    search: '?token=new-token',
    state: '',
  },
  withoutToken: {
    pathname: '',
    hash: '',
    search: '',
    state: '',
  },
};

const mockedResetPassword = new MockAdapter(api);
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: '',
    }),
  };
});

mockedResetPassword.onPost().reply(200);

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ResetPassword Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to reset password', async () => {
    jest.spyOn(RouteData, 'useLocation').mockReturnValue(mockedToken.withToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const newPasswordConfirmationField = getByPlaceholderText(
      'Digite novamente'
    );
    const buttonElement = getByText('Alterar');

    fireEvent.change(newPasswordField, { target: { value: '123456' } });
    fireEvent.change(newPasswordConfirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        })
      );
    });

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should NOT be able to reset password without token', async () => {
    jest
      .spyOn(RouteData, 'useLocation')
      .mockReturnValue(mockedToken.withoutToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const newPasswordConfirmationField = getByPlaceholderText(
      'Digite novamente'
    );
    const buttonElement = getByText('Alterar');

    fireEvent.change(newPasswordField, { target: { value: '123456' } });
    fireEvent.change(newPasswordConfirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        })
      );
    });

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should NOT be able to reset password without password', async () => {
    jest.spyOn(RouteData, 'useLocation').mockReturnValue(mockedToken.withToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordConfirmationField = getByPlaceholderText(
      'Digite novamente'
    );
    const buttonElement = getByText('Alterar');

    fireEvent.change(newPasswordConfirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should NOT be able to reset password without password confirmation', async () => {
    jest.spyOn(RouteData, 'useLocation').mockReturnValue(mockedToken.withToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const buttonElement = getByText('Alterar');

    fireEvent.change(newPasswordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should NOT be able to reset password if API fails', async () => {
    jest.spyOn(RouteData, 'useLocation').mockReturnValue(mockedToken.withToken);

    mockedResetPassword.onPost().reply(500);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const newPasswordConfirmationField = getByPlaceholderText(
      'Digite novamente'
    );
    const buttonElement = getByText('Alterar');

    fireEvent.change(newPasswordField, { target: { value: '123456' } });
    fireEvent.change(newPasswordConfirmationField, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        })
      );
    });

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should NOT be able to reset password if password has less than 6 digits', async () => {
    jest.spyOn(RouteData, 'useLocation').mockReturnValue(mockedToken.withToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const newPasswordConfirmationField = getByPlaceholderText(
      'Digite novamente'
    );
    const buttonElement = getByText('Alterar');

    fireEvent.change(newPasswordField, { target: { value: '12345' } });
    fireEvent.change(newPasswordConfirmationField, {
      target: { value: '12345' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should NOT be able to reset password if password confirmation is different from password', async () => {
    jest.spyOn(RouteData, 'useLocation').mockReturnValue(mockedToken.withToken);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordField = getByPlaceholderText('Nova senha');
    const newPasswordConfirmationField = getByPlaceholderText(
      'Digite novamente'
    );
    const buttonElement = getByText('Alterar');

    fireEvent.change(newPasswordField, { target: { value: '123456' } });
    fireEvent.change(newPasswordConfirmationField, {
      target: { value: '1234567' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
