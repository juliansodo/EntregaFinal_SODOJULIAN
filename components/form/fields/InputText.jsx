
import { styled } from 'nativewind'
import React from 'react'
import { TextInput, View, Text } from 'react-native'

const StyledTextInput = styled(TextInput)
const ViewTextInput = styled(View)
export default function InputText({value,  viewClasses, inputClasses, textClasses, labelText,  ...otras}) {
  return (
    <ViewTextInput className={viewClasses}>
        <Text className={textClasses}>{labelText}</Text>
        <StyledTextInput value={value} className={inputClasses} place {...otras}></StyledTextInput>
    </ViewTextInput>
  )
}
