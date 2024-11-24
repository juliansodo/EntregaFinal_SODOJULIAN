import { View } from 'react-native';

import { Store, Home } from './screens';
import { StatusBar, SafeAreaView, Platform } from 'react-native';
import { Navbar } from './components';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { CartProvider } from './context/CartContext';
import MainRouter from './routes/MainRouter';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { createSessionsTable, initDB } from './localDb';
import { useEffect, useState } from 'react';
import LoadingScreen from './screens/LoadingScreen';
import { Text } from 'react-native';
export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        //- //- console.log('Iniciando configuración de la base de datos...');
        await initDB();
        await createSessionsTable(); 
        setDbReady(true);
        //- //- console.log('Base de datos configurada exitosamente.');
      } catch (err) {
        console.error('Error al configurar la base de datos:', err);
        setError(err); 
      }
    };

    setupDatabase();
    
    return () => {
     
      //- console.log('Cerrando aplicación...');
    };
  }, []);

  if (error) {
    return <View><Text>Error: {error.message}</Text></View>; 
  }

  if (!dbReady) return <LoadingScreen />; 

  return (
    <Provider store={store}>
      <CartProvider>
        <ActionSheetProvider>
          <View className="flex-1">
            <StatusBar
              barStyle="light-content"
              translucent
            />

            <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
              <View className="flex-1">
                <MainRouter />
              </View>
            </SafeAreaView>
          </View>
        </ActionSheetProvider>
      </CartProvider>
    </Provider>
  );
}
