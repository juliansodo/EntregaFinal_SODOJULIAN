import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { CustomButton } from '../buttons/CustomButton'
import { CartContext } from '../../context/CartContext';


export  function AddOrRmvProducts({product, textButtonClasses, textQtyClasses, disabledButtonClasses}) {
  const {addProduct, removeProduct, getQtyOfProduct} = useContext(CartContext);
    const styleButtons = `bg-[#2e41a6] px-3 py-1 rounded-md  hover:bg-purple-800 active:scale-95 transition-transform transform ${textButtonClasses}`
    const styleText = `text-white font-bold ${textButtonClasses}`
    const styleQtyText = `font-bold ${textQtyClasses}`
    const styleDisabledButton = `bg-gray-400 px-3 py-1 hover:bg-purple-800 active:scale-95 transition-transform transform rounded-md ${disabledButtonClasses}`
    const qty = getQtyOfProduct(product);
  return (
    <>
    <View className='flex flex-row justify-between items-center  mx-auto  space-x-2'>
        <CustomButton text='-' onPress={() => {qty > 0 ? removeProduct(product) : null}} buttonClasses={qty > 0 ? styleButtons : styleDisabledButton} textClasses={styleText} />
        <Text className={styleQtyText}>{qty}</Text>
        <CustomButton text='+' onPress={() => {addProduct(product)}} buttonClasses={styleButtons} textClasses={styleText} />
        </View>
    </>    
  )
}
