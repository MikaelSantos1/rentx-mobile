import React, { useEffect, useState } from 'react';
import { StatusBar,BackHandler } from 'react-native';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,



} from './styles';
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { LoadingAnimation } from '../../components/LoadingAnimation';


export function Home() {
  const [cars,setCars]= useState<CarDTO[]>([])
  const [loading,setLoading]= useState(true)

  const navigation = useNavigation()


  function handleCarDetails(car:CarDTO){
    navigation.navigate('CarDetails',{car})
  }

 

  useEffect(()=>{
    let isMonted = true
      async function fetchCars(){
        try{
          const {data}= await api.get('/cars')
          if(isMonted){
            setCars(data)
          }
          
        }catch(err){
          console.log(err)
        }finally{
          if(isMonted){
            setLoading(false)
          }
          
        }
      
      
      }
      fetchCars()
      return ()=>{
        isMonted=false
      }
  },[])
  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress',()=>{
      return true
    })
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
          {
            !loading &&
            <TotalCars>
            Total de {cars.length} carros
          </TotalCars>
          }
          
        </HeaderContent>
      </Header>
      
      {
        loading ? <LoadingAnimation/>
        : <CarList
        data={cars}
        keyExtractor={item=>(item.id)}
        renderItem={({item})=>
        
            <Car data={item} onPress={()=>handleCarDetails(item)}/>
           
        }
        />
      }
   
     
    </Container>
  );
}