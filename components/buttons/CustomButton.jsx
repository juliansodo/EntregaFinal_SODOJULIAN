import { styled } from 'nativewind'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const StyledButton = styled(Pressable)
const StyledText = styled(Text)


export function CustomButton({ text, onPress, buttonClasses, textClasses, icon, iconPosition="right", iconSpacing = 4, ...otras }) {
  return (
    <>
    {icon?
    <StyledButton onPress={onPress} className={`flex-row items-center ${buttonClasses}`} {...otras}>
      {iconPosition === "left" && icon}
      <StyledText className={`flex-1 text-center ${textClasses}`}>{text}</StyledText>
      <View className="absolute right-2">{iconPosition === "right" && icon}</View>
    </StyledButton>
    :
    <StyledButton onPress={onPress} className={buttonClasses} {...otras}>
      <StyledText className={textClasses}>{text}</StyledText>
    </StyledButton>
    }
    </>
  )
}
