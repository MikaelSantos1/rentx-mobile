import React from 'react';
import { StatusBar } from 'react-native';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles';
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
export function Home() {
  const carData={
    brand:'Audi',
    name:'Audi a3',
    rent:{
        period:'Dia',
        price:140,
    },
    thumbnail:'https://storage.googleapis.com/golden-wind/ignite/react-native/images/1.png',
  }
  return (
    <Container>
      <StatusBar barStyle='light-content'
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      <CarList
      data={[1,2,3,5,6,7]}
      keyExtractor={item=>String(item)}
      renderItem={({item})=><Car data={carData}/>}
      
      />
     
    </Container>
  );
}