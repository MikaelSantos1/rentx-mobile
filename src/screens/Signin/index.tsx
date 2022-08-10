import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PassowordInput } from '../../components/PasswordInput';
import theme from '../../styles/theme';
import * as Yup from 'yup'

import {
    Container,
    Header,
    Title,
    SubTitle,
    Footer,
    Form
} from './styles';
import { useNavigation } from '@react-navigation/native';

export  function Signin() {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const navigation = useNavigation()
    async  function handleSign(){
        try{
            const schema = Yup.object().shape({
                email:Yup.string().required('Email obrigatorio').email('Digite um email valido'),
                password:Yup.string().required('Senha é obrigatória ')
            })
            await schema.validate({email,password})
            Alert.alert('Tudo certo!')
        }catch(error){
            if(error instanceof Yup.ValidationError){
                 Alert.alert('Opa',error.message)
            }else{
                 Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login. Verifique as credenciais')
            }
        }
       
    }
    function handleNewAccount(){
        navigation.navigate('SignUpFirstStep')
    }
    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle='dark-content'
                        backgroundColor='transparent'
                        translucent
                    />
                    <Header>
                        <Title>Estamos {'\n'}quase la</Title>
                        <SubTitle>
                            Faça seu login para começar
                            {'\n'}uma experiencia incrivel
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input
                            iconName='mail'
                            placeholder='Email'
                            keyboardType='email-address'
                            autoCorrect={false}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <PassowordInput
                            iconName='lock'
                            placeholder='Senha'
                           
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title='Login'
                            onPress={ handleSign}
                            enabled={true}
                            loading={false} />

                        <Button
                            title='Criar conta gratuita'
                            color={theme.colors.background_secondary}
                            onPress={handleNewAccount}
                            enabled={true}
                            loading={false}
                            light
                        />

                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}