import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  background-color: #18171c;
  border-radius: 8px;
  display: flex;
  align-items: center;
  border: 2px solid #18171c;
  color: #4f4a5a;
  transition: all 0.2s;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border: 2px solid #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border: 2px solid #ff9000;
      & > svg {
        color: #ff9000;
      }
    `}

  ${(props) =>
    props.isFilled &&
    css`
      & > svg {
        color: #ff9000;
      }
    `}

  input {
    color: #f2f2f2;
    background-color: transparent;
    flex: 1;
    padding: 16px 0;
    border: 0;

    &::placeholder {
      color: #4f4a5a;
    }
  }

  svg {
    margin: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    color: #c53030;
    margin: 0 16px;
  }

  span {
    color: #f2f2f2;
    background-color: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
