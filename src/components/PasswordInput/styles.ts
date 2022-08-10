
import { TextInput } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface Props{
    isFocused:boolean
}

export const Container = styled.View`
   flex-direction:row;
   
  
`;
export const IconContainer = styled.View<Props>`
    height:56px;
    width:55px;
    justify-content:center;
    align-items:center;
    background-color:${({theme})=>theme.colors.background_secondary};
    margin-right:2px;
    ${({isFocused, theme})=> isFocused && css`
    border-bottom-width:2px;
    border-bottom-color:${theme.colors.main};
   `}
`

export const InputText= styled(TextInput)<Props>`
    background-color:${({theme})=>theme.colors.background_secondary};
    flex:1;
    color:${({theme})=>theme.colors.text};
    font-family:${({theme})=>theme.fonts.primary_400};
    font-size:${RFValue(15)}px;
    text-decoration:none;
    padding:0 23px;
    ${({isFocused, theme})=> isFocused && css`
    border-bottom-width:2px;
    border-bottom-color:${theme.colors.main};
   `}
   
`
