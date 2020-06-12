import styled, { keyframes } from 'styled-components';

const animationFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${animationFromTop} 1s;

  h1 {
    margin-top: 40px;
    font-size: 40px;
  }
`;
