import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';

export function Home() {
  const [cars,setCars]= useState<CarDTO[]>([])
  const [loading,setLoading]= useState(true)
  const navigation = useNavigation()

  const carData={
    brand:'Audi',
    name:'Audi a3',
    rent:{
        period:'Dia',
        price:140,
    },
    thumbnail:'https://storage.googleapis.com/golden-wind/ignite/react-native/images/1.png',
  }

  function handleCarDetails(){
    navigation.navigate('CarDetails')
  }
  useEffect(()=>{
      async function fetchCars(){
        try{
          const {data}= await api.get('/cars')
          setCars(data)
        }catch(err){
          console.log(err)
        }finally{
          setLoading(false)
        }
      
      
      }
      fetchCars()
  },[])

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
      
      {
        loading ? <Load/>
        : <CarList
        data={cars}
        keyExtractor={item=>(item.id)}
        renderItem={({item})=>
        <Car data={item} onPress={handleCarDetails}/>}
        />
      }
     
     
    </Container>
  );
}