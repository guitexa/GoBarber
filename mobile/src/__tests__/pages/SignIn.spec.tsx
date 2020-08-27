import React from 'react';
import { render } from '@testing-library/react-native';

import SignIn from '../../pages/SignIn';

describe('SignIn page', () => {
  it('should be able to render email and password fields', () => {
    const { getByPlaceholderText } = render(<SignIn />);

    const inputElement = getByPlaceholderText('E-mail');
    const passwordElement = getByPlaceholderText('Senha');

    expect(inputElement).toBeTruthy();
    expect(passwordElement).toBeTruthy();
  });
});
