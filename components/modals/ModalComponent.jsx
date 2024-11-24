import React from "react";
import { Modal, View } from "react-native";

export  function ModalComponent({
  animationType = "slide",
  visible = false,
  onRequestClose,
  children,
}) {
  return (
    <View >
      <Modal
        animationType={animationType}
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}
        className="flex-1 items-center justify-center w-screen h-screen bg-white"
      >
        <View className="bg-red-500 rounded-lg ">
          {children}
        </View>
      </Modal>
    </View>
  );
}
