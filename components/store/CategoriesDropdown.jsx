import React from "react";
import { CustomButton } from "../buttons/CustomButton";
import { View } from "react-native";
import useCustomActionSheet from "../../hooks/actionsheet/useCustomActionSheet";
import { FontAwesome5 } from "@expo/vector-icons";

export function CategoriesDropdown({ categories, categoryName, setCategoryId, setCategoryName}) {
  const { openActionSheet } = useCustomActionSheet();

  const handleCategorySelect = (selectedCategory) => {
    //- console.log("Categoría seleccionada:", selectedCategory);
    setCategoryId(selectedCategory.id);
    setCategoryName(selectedCategory.nombre);
  };
  const actionSheetStyle = {  
    textStyle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      alignItems: "center",
      width: "100%", 
    },
    titleStyle: {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20,
      width: "100%", 
    },
    containerStyle: {
      backgroundColor: "#2e41a6",
      maxHeight: 500,
      borderRadius: 20,
      alignItems: "center", 
    },
  };
  return (
    <View className="flex justify-center items-center w-full p-10 -mb-8">
      {categories.length > 0 ? (
        <CustomButton
          text={categoryName}
          onPress={() =>
            openActionSheet(
              categories.map((category) => category.nombre),
              categories,
              actionSheetStyle.containerStyle,
              actionSheetStyle.titleStyle,
              actionSheetStyle.textStyle,
              handleCategorySelect,
            )
          }
          icon={<FontAwesome5 name="chevron-down" size={20} color="#fff" />}
          iconPosition="right"
          iconSpacing={1}
          buttonClasses="bg-[#2e41a6] rounded-full py-2 w-60"
          textClasses="text-white text-center font-bold text-sm"
        />
      ) : null}
    </View>
  );
}
