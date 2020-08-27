import React from 'react';
import { render } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button component', () => {
  it('should render button element', () => {
    const { getByTestId } = render(<Button children="text-button" />);

    const buttonElement = getByTestId('button-container');

    expect(buttonElement).toHaveTextContent('text-button');
  });

  it('should display loading message and hide children', () => {
    const { getByTestId } = render(<Button loading children="text-button" />);

    const buttonElement = getByTestId('button-container');

    expect(buttonElement).toHaveTextContent('Enviando e-mail...');
    expect(buttonElement).not.toHaveTextContent('text-button');
  });
});
