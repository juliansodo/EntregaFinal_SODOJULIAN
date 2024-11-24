import React from 'react'
import { useActionSheet } from '@expo/react-native-action-sheet';

export default function useCustomActionSheet() {
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = (options = [], data, containerStyle = {}, titleStyle = {}, textStyle = {}, onClickCategory = () => {}) => {  
    showActionSheetWithOptions({
      options: [...options, "Cancelar"],
      cancelButtonIndex: options.length -1,
      title: 'Elegí una categoría',
      textStyle: textStyle,
      titleTextStyle: titleStyle,
      containerStyle: containerStyle
    }, (index) => {
      onClickCategory(data[index]);
    });
  };

  return { openActionSheet };
}
