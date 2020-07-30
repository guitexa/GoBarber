import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import BgImage from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

const animationFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${animationFromLeft} 1s;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 16px;
    }

    a {
      color: #f2f2f2;
      text-decoration: none;
      margin-top: 16px;
      transition: all 0.2s;

      &:hover {
        color: ${shade(0.2, '#f2f2f2')};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f2f2f2;
    transition: all 0.2s;

    &:hover {
      color: ${shade(0.2, '#f2f2f2')};
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${BgImage}) no-repeat center;
  background-size: cover;
`;
