import React from 'react'
import { Text, View, Pressable } from 'react-native'
export function GoToStoreButton({label, onPressHandler}) {
    
  return (
    <Pressable 
      className="bg-[#1405e2d2] rounded-md py-1 px-3" 
      onPress={() => onPressHandler()}
    >
      <Text className="text-white text-xl font-bold text-center">
        {label}
      </Text>
    </Pressable>
  )
}
