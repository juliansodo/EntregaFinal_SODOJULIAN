import React, { useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { AddOrRmvProducts, ContainerWithBackgroundColor, GoToCartButton } from '../components';
import { Table, Row } from 'react-native-table-component';

export function DetailProduct({route, navigation}) {
  const { product } = route.params;
  return (
    <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]} >
      <ScrollView className="flex-1">
        <View className="w-full">
        <Image 
          source={{ uri: product.imagen }} 
            className="w-full h-60 object-cover p-3"
          />
        </View>
        <View className="p-4">
          <Text className="text-xl font-bold mb-2 text-white">{product.nombre}</Text>
          <Text className="text-2xl font-bold text-white mb-4">
            ${product.precio}
          </Text>
          <Text className="text-base text-white  mb-6">
            {product.descripcion}
          </Text>
          
          <Table borderStyle={{borderWidth: 3, borderColor: '#C1C0B9'}} >
            <Row 
              data={['Especificaciones']} 
              style={{backgroundColor: '#1e3a8a'}} 
              textStyle={{textAlign: 'center', fontWeight: 'bold', color: 'white'}} 
            />
            {Object.entries(product.especificaciones_tecnicas).map(([key, value]) => (
              <Row 
                key={key}
                data={[key.charAt(0).toUpperCase() + key.slice(1), value]} 
                textStyle={{textAlign: 'center', fontWeight: 'bold', color: 'white'}}
              />
            ))}
          </Table>
        </View>
        <AddOrRmvProducts product={product} textButtonClasses='text-xl px-6 py-1' textQtyClasses='text-lg text-white' disabledButtonClasses='text-black text-xl px-6 py-1'/>
        <GoToCartButton txtButtonClasses={'text-center w-60 p-2 mx-auto mt-10'} txtClasses={'text-center text-sm font-bold'} />
      </ScrollView>
    </ContainerWithBackgroundColor>
  )
}
