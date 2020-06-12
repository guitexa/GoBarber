import React from 'react';

import Logo from '../../assets/logo.svg';

import { AnimationContainer } from './styles';

const Dashboard: React.FC = () => (
  <AnimationContainer>
    <img src={Logo} alt="GoBarber" />
    <h1>Seja bem-vindo</h1>
  </AnimationContainer>
);

export default Dashboard;
