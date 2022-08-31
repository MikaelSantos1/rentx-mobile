import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons'
import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section
} from './styles';
import { Input } from '../../components/Input';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { PassowordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/Auth';
import * as ImagePicker from 'expo-image-picker';

export function Profile() {
    const {user}= useAuth()
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    const [avatar,setAvatar]= useState(user.avatar)
    const [name,setName]= useState(user.name)
    const [driverLicense,setDriverLicense]= useState(user.driver_license)
    const theme = useTheme()
    const navigation = useNavigation()
    
    function handleBack() {
        navigation.goBack()
    }
    function handleSignOut() { }
    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected)
    }
    async function handleSelectAvatar(){
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,4],
            quality:1
        })
        if(result.cancelled){
            return
        }
        if(result.uri){
            setAvatar(result.uri)
        }
    }
    return (
        <KeyboardAvoidingView behavior='position' enabled style={{flex:1}}>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss }>
            <Container>
                <Header>
                    <HeaderTop>
                        <BackButton
                            onPress={handleBack}
                            color={theme.colors.shape} />
                        <HeaderTitle>
                            Editar perfil
                        </HeaderTitle>
                        <LogoutButton onPress={handleSignOut}>
                            <Feather
                                name='power'
                                size={24}
                                color={theme.colors.shape} />
                        </LogoutButton>
                    </HeaderTop>
                    <PhotoContainer>
                        <Photo source={{ uri: avatar }} />
                        <PhotoButton onPress={handleSelectAvatar}>
                            <Feather name='camera' size={24} color={theme.colors.shape} />
                        </PhotoButton>
                    </PhotoContainer>
                </Header>
                <Content style={{marginBottom:useBottomTabBarHeight()}}>
                    <Options>
                        <Option
                            onPress={() => handleOptionChange('dataEdit')}
                            active={option === 'dataEdit'}>
                            <OptionTitle
                                active={option === 'dataEdit'}>
                                Dados
                            </OptionTitle>
                        </Option>
                        <Option
                            onPress={() => handleOptionChange('passwordEdit')}
                            active={option === 'passwordEdit'}>
                            <OptionTitle
                                active={option === 'passwordEdit'}

                            >
                                Trocar senha
                            </OptionTitle>
                        </Option>
                    </Options>
{

            option==='dataEdit'?
                    <Section >
                        <Input
                            iconName='user'
                            placeholder='Nome'
                            autoCorrect={false}
                            defaultValue={user.name}
                            onChangeText={setName}
                        />
                        <Input
                            iconName='mail'
                            editable={false}
                            defaultValue={user.email}
                        />
                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                            keyboardType='numeric'
                            defaultValue={user.driver_license}
                            onChangeText={setDriverLicense}                      
                             />
                    </Section>

                    :
                    <Section >
                        <PassowordInput
                            iconName='lock'
                            placeholder='Senha atual'
                            
                        />
                        <PassowordInput
                            iconName='lock'
                            placeholder='Nova senha'
                            

                        />
                        <PassowordInput
                             iconName='lock'
                             placeholder='Repetir senha'
                             
                                                  
                             />
                    </Section>
                    }
                </Content>
            </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}