import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/auth';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

const mockedApi = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: '12345',
        name: 'Jane Doe',
        email: 'janedoe@mail.com',
      },
      token: 'token-12345',
    };

    mockedApi.onPost('sessions').reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    result.current.signIn({
      email: 'janedoe@mail.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user)
    );

    expect(result.current.user.email).toEqual('janedoe@mail.com');
  });

  it('should restore saved data from storage when auth inits', () => {
    const data = {
      user: {
        id: '12345',
        name: 'Jane Doe',
        email: 'janedoe@mail.com',
      },
      token: 'token-12345',
    };

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return data.token;
        case '@GoBarber:user':
          return JSON.stringify(data.user);
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual(data.user.email);
  });

  it('should be able to sign out', () => {
    const data = {
      user: {
        id: '12345',
        name: 'Jane Doe',
        email: 'janedoe@mail.com',
      },
      token: 'token-12345',
    };

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return data.token;
        case '@GoBarber:user':
          return JSON.stringify(data.user);
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user', () => {
    const user = {
      id: '12345',
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      avatar_url: 'avatar.png',
    };

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user)
    );

    expect(result.current.user).toEqual(user);
  });
});
