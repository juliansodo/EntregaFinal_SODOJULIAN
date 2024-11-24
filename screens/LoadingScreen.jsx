import React from 'react'


import { View, Text } from 'react-native';
import { ContainerWithBackgroundColor } from '../components';

export default function LoadingScreen() {
  return (
    <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text className='text-white text-2xl font-bold'>Cargando...</Text>
        </View>
    </ContainerWithBackgroundColor>
  );
}
