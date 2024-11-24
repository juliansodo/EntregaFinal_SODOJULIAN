import { styled } from 'nativewind';
import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux';



const StyledView = styled(View);
const StyledText = styled(Text);

export  function QtyProductsInCartTag() {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <StyledView className='rounded-full  pl-1 items-center justify-center absolute z-20' style={{paddingTop:3}} >
        <StyledText className='text-xs text-blue-800 font-bold' >{cart.length}</StyledText>
    </StyledView>
  )
}
