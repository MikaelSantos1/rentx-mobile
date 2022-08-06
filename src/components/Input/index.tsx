import React, { useState } from 'react';
import{Feather} from '@expo/vector-icons'
import {
  Container,
  IconContainer,
  InputText 
} from './styles';
import { useTheme } from 'styled-components';
import { 
  TextInputProps,
  
} 
  from 'react-native';

interface InputProps extends TextInputProps{
    iconName:React.ComponentProps<typeof Feather>['name']
    value?:string;
}

export function Input({iconName,value,...rest}:InputProps){
    const [isFocused,setIsFocused]= useState(false)
    const [isFilled,setIsFilled]= useState(false)

    function handleInputFocus(){
      setIsFocused(true)
    }
    function handleInputBloor(){
      setIsFocused(false)
      setIsFilled(!!value)
    }
    const theme = useTheme();

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
        name={iconName}
        size={24}
        color={(isFocused ||isFilled )?theme.colors.main:theme.colors.text_detail}
        />
        </IconContainer>
        <InputText 
        onFocus={handleInputFocus}
        onBlur={handleInputBloor}
        {...rest}
        
        />
    </Container>
  );
}