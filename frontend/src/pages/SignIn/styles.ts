import styled from 'styled-components';
import { shade } from 'polished';

import BgImage from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
    color: #ff9000;
    transition: all 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
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
