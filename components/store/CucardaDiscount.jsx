import { styled } from 'nativewind'
import React from 'react'
import { View, Text } from 'react-native'

const StyledView = styled(View);
const StyledText = styled(Text);

export function CucardaDiscount({qty= 10, bgColor= "#2e41a6", textColor= "white"}) {
  return (
    <StyledView className={`bg-[${bgColor}] rounded-full border-2 border-white shadow-2xl shadow-black py-3 px-2 absolute -top-2 -right-0 z-50 `}>
      <StyledText className={`text-white text-xs`}>
        -{qty}%
      </StyledText>
    </StyledView>
  )
}
