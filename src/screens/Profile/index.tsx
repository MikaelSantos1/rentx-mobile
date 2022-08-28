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
} from './styles';

export function Profile() {
    const [option,setOption]= useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    const theme = useTheme()
    const navigation = useNavigation()

    function handleBack() {
        navigation.goBack()
    }
    function handleSignOut() { }
    function handleOptionChange(optionSelected:'dataEdit' | 'passwordEdit'){
        setOption(optionSelected)
    }
    return (
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
                    <Photo source={{ uri: 'https://github.com/MikaelSantos1.png' }} />
                    <PhotoButton onPress={() => { }}>
                        <Feather name='camera' size={24} color={theme.colors.shape} />
                    </PhotoButton>
                </PhotoContainer>
            </Header>
            <Content>
                <Options>
                    <Option 
                    onPress={()=>handleOptionChange('dataEdit')}
                    active={option==='dataEdit'}>
                        <OptionTitle
                            active={option==='dataEdit'}>
                                Dados
                        </OptionTitle>
                    </Option>
                    <Option   
                    onPress={()=>handleOptionChange('passwordEdit')}
                    active={option==='passwordEdit'}>
                        <OptionTitle
                            active={option==='passwordEdit'}
                            
                            > 
                                Trocar senha
                        </OptionTitle>
                    </Option>
                </Options>
            </Content>
        </Container>
    );
}