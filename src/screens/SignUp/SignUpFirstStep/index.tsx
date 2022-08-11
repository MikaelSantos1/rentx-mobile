import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import * as Yup from 'yup'
import {
    Container,
    Steps,
    Header,
    Title,
    SubTitle,
    Form,
    FormTitle
} from './styles';

export function SignUpFirstStep() {
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [driverLicense, setDriverLicense]= useState('')
    const navigation = useNavigation()
    function handleBack() {
        navigation.goBack()
    }
  async  function handleNextStep(){
        try{
            const schema = Yup.object().shape({
                name:Yup.string().required('Nome é obrigatório'),
                email:Yup.string().email('Email invalido').required('Nome é obrigatório'),
                driverLicense:Yup.string().required('CNH é obrigatoria'),
            })
             const data ={name, email,driverLicense}
             await schema.validate(data)
            navigation.navigate('SignUpSecondStep',{user:data})
        }catch(error){
            if(error instanceof Yup.ValidationError){
                return Alert.alert('Opa', error.message)
            }
        }
       
    }
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
                <FormTitle>1.Dados</FormTitle>
                <Input 
                iconName='user'
                placeholder='nome'
                onChangeText={setName}
                value={name}
                 />
                <Input 
                iconName='mail' 
                placeholder='email' 
                keyboardType='email-address'
                onChangeText={setEmail}
                value={email}
                />
                <Input 
                iconName='credit-card' 
                placeholder='CNH' 
                keyboardType='numeric'
                onChangeText={setDriverLicense}
                value={driverLicense}
                />
            </Form>
            <Button
            title='Próximo'
            onPress={handleNextStep}
            />
        </Container>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}