import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  height: 144px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #28262e;

  > div {
    max-width: 1100px;
    padding: 0 50px;
    display: flex;
    flex: 1;
    align-items: center;
  }

  a {
    color: #999591;
    transition: all 0.2s;
    padding: 2px;

    &:hover {
      text-decoration: none;
      color: #f2f2f2;
    }
  }
`;

const animationFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled.div`
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
  margin-top: -80px;

  animation: ${animationFromRight} 1s;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 340px;
    text-align: center;

    h1 {
      text-align: left;
      font-size: 20px;
      margin-bottom: 16px;
      display: flex;
      width: 100%;
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

export const ProfilePic = styled.div`
  position: relative;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #ff9000;
    border-radius: 50%;
    border: none;
    outline: none;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }

    input {
      display: none;
    }

    svg {
      margin-bottom: 2px;
      color: #312e38;
    }
  }
`;
