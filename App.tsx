
import 'react-native-gesture-handler';
import React from 'react';
import { useFonts, Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo'

import { Inter_400Regular, Inter_500Medium, } from '@expo-google-fonts/inter'
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/styles/theme';
import { Scheduling } from './src/screens/Scheduling';
import { SchedulingDetails } from './src/screens/SchedulingDetails';
import { Confirmation } from './src/screens/Confirmation';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './src/hooks';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    
    <ThemeProvider theme={theme}>
      <AppProvider>
      <Routes/>
      </AppProvider>
    </ThemeProvider>
   
    
  );
}

