import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '1%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ key, item, props }) => (
        <Toast key={key} message={item} style={props}></Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
