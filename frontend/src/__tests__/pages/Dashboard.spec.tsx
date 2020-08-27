import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import Dashboard from '../../pages/Dashboard';
import api from '../../services/api';

const mockedUser = {
  id: '12345',
  name: 'Barber',
  email: 'mail@mail.com',
  avatar_url: 'barberavatar.png',
  password: 123456,
};

const mockedMonthAvailability = [
  {
    day: 1,
    available: true,
  },
  {
    day: 2,
    available: true,
  },
  {
    day: 3,
    available: true,
  },
  {
    day: 4,
    available: true,
  },
  {
    day: 5,
    available: true,
  },
  {
    day: 6,
    available: true,
  },
  {
    day: 7,
    available: true,
  },
  {
    day: 8,
    available: true,
  },
  {
    day: 9,
    available: true,
  },
  {
    day: 10,
    available: true,
  },
  {
    day: 11,
    available: true,
  },
  {
    day: 12,
    available: true,
  },
  {
    day: 13,
    available: true,
  },
  {
    day: 14,
    available: true,
  },
  {
    day: 15,
    available: true,
  },
  {
    day: 16,
    available: true,
  },
  {
    day: 17,
    available: true,
  },
  {
    day: 18,
    available: true,
  },
  {
    day: 19,
    available: true,
  },
  {
    day: 20,
    available: true,
  },
  {
    day: 21,
    available: true,
  },
  {
    day: 22,
    available: true,
  },
  {
    day: 23,
    available: true,
  },
  {
    day: 24,
    available: true,
  },
  {
    day: 25,
    available: true,
  },
  {
    day: 26,
    available: true,
  },
  {
    day: 27,
    available: true,
  },
  {
    day: 28,
    available: true,
  },
  {
    day: 29,
    available: true,
  },
  {
    day: 30,
    available: true,
  },
  {
    day: 31,
    available: true,
  },
];

const mockedAppointments = [
  {
    id: '5d0571a6-92e6-4ca6-b9cb-ee5fce8acd4a',
    provider_id: '1109cc5a-b59f-4a56-af14-1584d62c68bf',
    user_id: '94c78366-47b9-49af-920f-7431748162a1',
    date: '2020-08-04T20:00:00.000Z',
    created_at: '2020-08-04T06:32:30.726Z',
    updated_at: '2020-08-04T06:32:30.726Z',
    user: {
      id: '94c78366-47b9-49af-920f-7431748162a1',
      name: 'Guilherme Teixeira',
      email: 'mail@mail.com',
      avatar: 'b1ba530918-20170131_21224012.jpg',
      created_at: '2020-07-29T06:49:17.261Z',
      updated_at: '2020-08-03T20:34:52.082Z',
      avatar_url:
        'http://localhost:4356/files/b1ba530918-20170131_21224012.jpg',
    },
  },
  {
    id: 'd57ee9f9-a1a7-4023-a706-febe56837428',
    provider_id: '1109cc5a-b59f-4a56-af14-1584d62c68bf',
    user_id: '94c78366-47b9-49af-920f-7431748162a1',
    date: '2020-08-04T13:00:00.000Z',
    created_at: '2020-08-04T06:27:51.098Z',
    updated_at: '2020-08-04T06:27:51.098Z',
    user: {
      id: '94c78366-47b9-49af-920f-7431748162a1',
      name: 'Guilherme Teixeira',
      email: 'mail@mail.com',
      avatar: 'b1ba530918-20170131_21224012.jpg',
      created_at: '2020-07-29T06:49:17.261Z',
      updated_at: '2020-08-03T20:34:52.082Z',
      avatar_url:
        'http://localhost:4356/files/b1ba530918-20170131_21224012.jpg',
    },
  },
];

const mockedApi = new MockAdapter(api);

mockedApi
  .onGet(`/providers/${mockedUser.id}/month-availability`)
  .reply(200, mockedMonthAvailability);
mockedApi.onGet('/appointments/me').reply(200, mockedAppointments);

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: mockedUser,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Dashboard Page', () => {
  it('should be able to show user avatar', async () => {
    const { getByAltText } = render(<Dashboard />);

    const avatarElement = getByAltText(mockedUser.name);

    expect(avatarElement).toBeTruthy();
  });
});
