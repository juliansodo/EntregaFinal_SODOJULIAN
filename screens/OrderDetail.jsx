import React from 'react'
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ContainerWithBackgroundColor, CustomButton, ItemListContainer } from '../components';
export  function OrderDetail({navigation, route}) {
    const { order } = route.params;
    //- console.log(order);
  return (
    <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]}>
        <View className='flex-1 p-2'>
            <CustomButton text={"Volver"} buttonClasses={"bg-white rounded-lg p-2 w-16"} textClasses={"text-black text-sm text-center"} onPress={() => {
                navigation.goBack();
            }} />
            <View className=' justify-between bg-white rounded-lg p-2 mt-5'>
                <Text className='text-black text-xl text-center'>Compra ID: {order.id}</Text>
            </View>
            <View>
                <ItemListContainer products={order.products} type={"list"} isEdit={false}   />   
            </View>
        </View>
    </ContainerWithBackgroundColor>
  )
}
