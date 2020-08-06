import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

export const Header = styled.header`
  width: 100%;
  height: 144px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1100px;
  padding: 0 50px;
  display: flex;
  flex: 1;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    background: transparent;
    border: none;
    outline: none;
    margin-left: auto;

    svg {
      color: #999591;
      transition: all 0.2s;

      &:hover {
        color: #f2f2f2;
      }
    }
  }
`;

export const Profile = styled.div`
  margin-left: 50px;
  display: flex;
  align-items: center;

  img {
    height: 70px;
    border-radius: 50px;
  }
`;

export const WelcomeUser = styled.div`
  margin-left: 20px;
  line-height: 24px;
  display: flex;
  flex-direction: column;

  span {
    color: #f4ede8;
  }

  a {
    text-decoration: none;
    color: #ff9000;
    transition: all 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Content = styled.div`
  max-width: 1100px;
  width: 100%;
  padding: 50px;
  display: flex;
`;

export const Schedule = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 10px;
    display: flex;
    align-items: center;

    span {
      color: #ff9000;
      display: flex;
      align-items: center;

      & + span::before {
        content: '';
        background: #ff9000;
        width: 1px;
        height: 13px;
        margin: 0 8px;
      }
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 50px;
  font-size: 20px;

  > span {
    color: #999591;
  }

  > div {
    margin-top: 20px;
    display: flex;
    align-items: center;
    background: #3e3b47;
    border-radius: 10px;
    padding: 15px 25px;
    position: relative;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 20px;
    }

    div {
      display: flex;
      align-items: center;
      margin-left: auto;

      svg {
        color: #ff9900;
        margin-right: 10px;
      }

      span {
        color: #999591;
      }
    }

    &::before {
      content: '';
      position: absolute;
      background: #ff9900;
      width: 2px;
      height: 70%;
      left: 0;
    }
  }
`;

export const Section = styled.section`
  font-size: 20px;

  p {
    color: #99959190;
    font-size: 15px;
  }

  > span {
    color: #999591;
    display: block;
    width: 100%;
    border-bottom: 1px solid #3e3b47;
    margin: 50px 0 30px 0;
    padding-bottom: 15px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  > div {
    display: flex;
    align-items: center;
    margin-right: 20px;
    width: 80px;

    svg {
      color: #ff9900;
      margin-right: 10px;
    }

    span {
      color: #f4ede8;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex: 1;
    align-items: center;
    background: #3e3b47;
    border-radius: 10px;
    padding: 15px 25px;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 20px;
    }

    span {
      color: #f4ede8;
    }
  }
`;

export const Calendar = styled.aside`
  .DayPicker {
    background: #28262e;
    border-radius: 8px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker-Day {
    padding: 0.45em 0.5em;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 10px 5px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 8px;
    color: #f2f2f2;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }

  .DayPicker-Caption > div {
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 0;
  }
`;
