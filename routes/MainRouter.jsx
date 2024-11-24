import React, { useEffect, useState } from 'react'
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AuthRouter } from './AuthRouter';
import LoggedRouter from './LoggedRouter';
import { useSelector } from 'react-redux';

export default function MainRouter({children}) {
  const userRedux = useSelector(state => state.user.user);
  const [user, setUser] = useState(userRedux);
  useEffect(() => {
    setUser(userRedux);
  }, [userRedux]);
  return (
    <NavigationContainer>
      {user? console.log("Usuario logueado"): console.log("Usuario no logueado")}
      {user?<LoggedRouter />: <AuthRouter />}
        {/* <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="DetailProduct" component={DetailProduct} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} /> */}

    </NavigationContainer>
  )
}

