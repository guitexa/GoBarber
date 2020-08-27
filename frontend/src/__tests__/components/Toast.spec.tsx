import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import Toast from '../../components/ToastContainer/Toast';

const toastMessage = {
  withoutDescription: {
    id: '00001',
    title: 'title-example',
  },
  withDescription: {
    id: '00001',
    title: 'title-example',
    description: 'description-example',
  },
};

const styleObject = {
  right: '0',
  opacity: '0',
};

const mockedRemoveToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      removeToast: mockedRemoveToast,
    }),
  };
});

describe('Toast component', () => {
  it('should render toast element', () => {
    const { getByTestId } = render(
      <Toast message={toastMessage.withoutDescription} style={styleObject} />
    );

    const toastElement = getByTestId('toast');

    expect(toastElement).toBeTruthy();
  });

  it('should render toast element with description', () => {
    const { debug, getByTestId } = render(
      <Toast message={toastMessage.withDescription} style={styleObject} />
    );

    const descriptionToastElement = getByTestId('description-toast');

    expect(descriptionToastElement).toHaveTextContent(
      toastMessage.withDescription.description
    );
  });

  it('should remove toast element after 3500ms', async () => {
    render(
      <Toast message={toastMessage.withoutDescription} style={styleObject} />
    );

    await wait(
      () => {
        expect(mockedRemoveToast).toBeCalledWith(
          toastMessage.withoutDescription.id
        );
      },
      {
        timeout: 3600,
      }
    );
  });

  it('should remove toast element when click to close', async () => {
    const { getByTestId } = render(
      <Toast message={toastMessage.withoutDescription} style={styleObject} />
    );

    const buttonRemoveToast = getByTestId('button-remove-toast');

    fireEvent.click(buttonRemoveToast);

    expect(mockedRemoveToast).toBeCalledWith(
      toastMessage.withoutDescription.id
    );
  });
});
