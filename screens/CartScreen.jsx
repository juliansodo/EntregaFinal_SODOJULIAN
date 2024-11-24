import React, { useContext, useState } from 'react'
import { View, Text, Modal, Button } from 'react-native'
import { ContainerWithBackgroundColor, EmptyCartList, ItemListContainer } from '../components'
import { CustomButton } from '../components/buttons/CustomButton'
import { useSelector } from 'react-redux'
import { useSavePurchaseMutation } from '../services/purchaseService'
import { Pressable } from 'react-native'
import { useCart } from '../hooks'
import { useDispatch } from 'react-redux'
import { updateCart } from '../app/features/cartSlice'

export  function CartScreen({navigation}) {
  const cart = useSelector((state) => state.cart.cart);
  const cartTotal = useSelector((state) => state.cart.total);
  const user = useSelector((state) => state.user.user);
  const finalAmount = useSelector((state) => state.cart.total);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const setCart = useCart().setCart;
  const [savePurchase] = useSavePurchaseMutation();

  const finishPurchase = async () => {
    //- console.log("Finalizar compra");
    setShowModal(false);
    //- console.log("Cart: ", cart);
    const finalCart = {
      products: [...cart],
      finalAmount: cartTotal,
      user_id: user.localId,
    }
    
    //- console.log("Final cart: ", finalCart);
    const response =  await savePurchase(finalCart);
    //- console.log("Response: ", response);
    if (response.data.status === "OK") {
      //- console.log("Compra guardada correctamente");
      dispatch(updateCart([]));
      setCart([]);
      navigation.navigate("Profile");
    } else {
      //- console.log("Error al guardar la compra");
    }
  }
  return (
    <ContainerWithBackgroundColor gradients={["#111d5d", "#111d5d"]}>
      <View>
       {cart.length > 0 ? (
        <>
        <ItemListContainer type="list" products={cart}  />
       <Text className='text-2xl font-bold text-white text-center'>Total: ${finalAmount.toFixed(2)}</Text>
       <CustomButton text='Finalizar compra' onPress={() => {setShowModal(true)}} buttonClasses='bg-[#2e41a6] p-4 rounded-lg w-1/2 mx-auto mt-4' textClasses='text-md text-white text-center' />
       <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(!showModal);
          }}>
          <View className='flex-1 justify-center items-center'>
            <View className='bg-white p-4 rounded-lg w-full'>
              <Text className='text-2xl font-bold text-center'>Finalizar compra</Text>
              <Text className='text-md font-bold text-center'>¿Estás seguro que quieres finalizar la compra?</Text>
              <View className='flex-row justify-center items-center space-x-5 mt-5'>
              <Pressable
                className='bg-[#2e41a6] p-4 rounded-lg w-1/2 mx-auto '
                onPress={() => finishPurchase()}>
                <Text className='text-md text-white text-center'>Confirmar compra</Text>
              </Pressable>
              <Pressable
                className='bg-[#6878d0] p-4 rounded-lg w-1/2 mx-auto '
                onPress={() => setShowModal(!showModal)}>
                <Text className='text-md text-white text-center'>Cancelar</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        </>
       ) : (
        <EmptyCartList />
       )}
      </View>
    </ContainerWithBackgroundColor>
  )
}
