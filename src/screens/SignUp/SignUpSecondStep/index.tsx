import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { PassowordInput } from '../../../components/PasswordInput';
import { api } from '../../../services/api';

import {
    Container,
    Steps,
    Header,
    Title,
    SubTitle,
    Form,
    FormTitle
} from './styles';

interface Params{
    user:{
        name:string
        email:string 
        driverLicense:string;
    }
}

export function SignUpSecondStep() {
    const [password,setPassword]= useState('')
    const [passwordConfirm,setPasswordConfirm]= useState('')
    const navigation = useNavigation()
    const route = useRoute()
    const { user} = route.params as Params
    function handleBack() {
        navigation.goBack()
    }
   async function handleRegister(){
        if(!password || !passwordConfirm) return Alert.alert('Informe a senha e confirme')

        if(password!=passwordConfirm){
            return Alert.alert('As senhas nao sao iguais')
        }
        await api.post('/users',{
            name:user.name,
            email:user.email,
            driver_license:user.driverLicense,
            password,
        }).then(()=>{
            navigation.navigate('Confirmation',{
                nextScreenRoute:'Signin',
                title:'Conta criada!',
                message:`Agora é so fazer login ${'\n'}e aproveitar sua conta`
            
            })
        }).catch((error)=>{
            console.log(error)
            Alert.alert('Opa', 'Não foi possivel cadastrar')
        })
    }
   const theme = useTheme()
    return (
        <KeyboardAvoidingView behavior='position' enabled style={{flex:1}}>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <BackButton onPress={handleBack} />
                <Steps>
                    <Bullet active />
                    <Bullet active={false} />
                </Steps>
            </Header>
            <Title>Crie sua {'\n'}conta</Title>
            <SubTitle>Faça seu cadastro de  {'\n'}forma rapida e facil</SubTitle>

            <Form>
                <FormTitle>2.Senha</FormTitle>
                <PassowordInput 
                iconName='lock' 
                placeholder='senha'
                value={password}
                onChangeText={setPassword}
                />
                <PassowordInput 
                iconName='lock' 
                placeholder='repetir senha'
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                />
            </Form>
            <Button
            title='Cadastrar'
            onPress={handleRegister}
            color={theme.colors.success}
            />
        </Container>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}