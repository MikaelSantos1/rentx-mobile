import React from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg'
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';

export function Scheduling(){
    const theme = useTheme()
    const navigation = useNavigation()

  function handleConfirmRental(){
    navigation.navigate('SchedulingDetails')
  }
  return (
    <Container>
        <Header>
            <StatusBar
            barStyle='light-content'
            translucent
            backgroundColor='transparent'
            />
        <BackButton
          onPress={() => { }}
          color={theme.colors.shape}
        />
        <Title>
            Escolha uma {'\n'}
            data de inicio  {'\n'}
            do aluguel {'\n'}
        </Title>
        <RentalPeriod>
            <DateInfo>
                <DateTitle>De</DateTitle>
                <DateValue selected={false}></DateValue>
            </DateInfo>
        
            <ArrowSvg/>
            <DateInfo>
                <DateTitle>Ate</DateTitle>
                <DateValue selected={true}>10-52</DateValue>
            </DateInfo>
            </RentalPeriod>
      </Header>

      <Content>
          <Calendar/>
      </Content>
      <Footer>
        <Button 
        title='Confirmar'
        onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}