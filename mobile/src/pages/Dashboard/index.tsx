import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';

import { DivImg, Text, TextButton } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DivImg>
        <Image source={logoImg} />
      </DivImg>
      <Text>SEJA BEM-VINDO</Text>
      <TouchableOpacity onPress={signOut}>
        <TextButton>SAIR</TextButton>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
