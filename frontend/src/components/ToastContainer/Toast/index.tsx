import React, { useEffect } from 'react';
import { FiAlertCircle, FiInfo, FiCheckCircle, FiX } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={25} />,
  success: <FiCheckCircle size={25} />,
  error: <FiAlertCircle size={25} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3500);
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      data-testid="toast"
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && (
          <p data-testid="description-toast">{message.description}</p>
        )}
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <FiX size={20} />
      </button>
    </Container>
  );
};

export default Toast;
