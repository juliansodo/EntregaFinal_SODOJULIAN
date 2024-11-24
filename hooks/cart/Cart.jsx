import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, updateTotal } from "../../app/features/cartSlice";
//import { useStorage } from "../storage/Storage";

export function useCart() {
  const storage = null;
  const dispatch = useDispatch();
  const cartRedux = useSelector((state) => state.cart.cart);
  const [totalUniqueProducts, setTotalUniqueProducts] = useState(0);
  const initialCart = storage != null
    ? JSON.parse(storage.getItem(storage.entryTypes.CART)) || []
    : [];
  const [cart, setCart] = useState(cartRedux || []); 
  const [finalAmount, setFinalAmount] = useState(0);


  const addProduct = (product) => {
    const productQty = getQtyOfProduct(product);
    let newProduct = { ...product };
    if (productQty > 0) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...product, cantidad: 1 }]);
    }
       
  };
  const removeProduct = (product, isTotal = false) => {
    const productQty = getQtyOfProduct(product);
    if (productQty > 1) {
      if(isTotal){
        setCart(cart.filter((p) => p.id !== product.id));
      }else{
        setCart(
          cart.map((p) =>
            p.id === product.id ? { ...p, cantidad: p.cantidad - 1 } : p
          )
        );
      }
    } else if (productQty == 1) {
      setCart(cart.filter((p) => p.id !== product.id));
    }
  };

  const clearCart = () => {
    setCart([]);
  };
  const getQtyOfProduct = (product) => {
    if (product) {
      const productExist = cart.find((p) => p.id === product.id);
      return productExist ? productExist.cantidad : 0;
    }
  };

  useEffect(() => {
    if (storage !=null) {
      storage.setItem(storage.entryTypes.CART, JSON.stringify(cart));
    }
    const finalAmountCart = cart.reduce(
      (acc, product) => acc + product.cantidad * product.precio,
      0
    );
    setFinalAmount(finalAmountCart);

    dispatch(updateCart(cart));
    dispatch(updateTotal(finalAmountCart));
  }, [cart]);

  return {
    cart,
    addProduct,
    removeProduct,
    totalUniqueProducts,
    getQtyOfProduct,
    finalAmount,
    clearCart,
    setCart
  };
}
