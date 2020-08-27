import React from 'react';
import { FiMail } from 'react-icons/fi';
import { render, wait, fireEvent } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        error: '',
        registerField: jest.fn(),
        defaultValue: '',
      };
    },
  };
});

describe('Input component', () => {
  it('should render input element', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');

    expect(inputElement).toBeTruthy();
  });

  it('should change input element border-color on focus and blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000');
    });
  });

  it('should render icon on input container and keep it colored when input is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input icon={FiMail} name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');
    const iconElement = getByTestId('input-icon');

    expect(iconElement).toBeTruthy();

    fireEvent.change(inputElement, { target: { value: 'mail@mail.com' } });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(iconElement).toHaveStyle('color: #ff9000');
    });
  });
});
