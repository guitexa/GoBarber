import React from 'react';
import { render } from '@testing-library/react';
import ToastContainer from '../../components/ToastContainer';

const toastMessages = [
  {
    id: '00001',
    title: 'title-example',
  },
];

describe('ToastContainer component', () => {
  it('should render toast container element', () => {
    const { getByTestId } = render(<ToastContainer messages={toastMessages} />);

    const toastContainerElement = getByTestId('toast-container');

    expect(toastContainerElement).toBeTruthy();
  });

  it('should render toast container with toast element', async () => {
    const { getByTestId } = render(<ToastContainer messages={toastMessages} />);

    const toastContainerElement = getByTestId('toast-container');

    expect(toastContainerElement).toHaveTextContent(toastMessages[0].title);
  });
});
