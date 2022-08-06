import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PassowordInput } from '../../components/PasswordInput';
import theme from '../../styles/theme';


import {
    Container,
    Header,
    Title,
    SubTitle,
    Footer,
    Form
} from './styles';

export function Signin() {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
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
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title='Login'
                            onPress={() => { }}
                            enabled={false}
                            loading={false} />

                        <Button
                            title='Criar conta gratuita'
                            color={theme.colors.background_secondary}
                            onPress={() => { }}
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