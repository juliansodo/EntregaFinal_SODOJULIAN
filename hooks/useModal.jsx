import React, { useState } from "react";

export default function useModal() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return {
    modalVisible,
    showModal,
    hideModal,
  };

}
