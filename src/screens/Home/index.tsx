import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton


} from './styles';
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';


export function Home() {
  const [cars,setCars]= useState<CarDTO[]>([])
  const [loading,setLoading]= useState(true)

  const navigation = useNavigation()
  const theme = useTheme()

  function handleCarDetails(car:CarDTO){
    navigation.navigate('CarDetails',{car})
  }

  function handleOpenMyCars(){
    navigation.navigate('MyCars')
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
            Total de {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>
      
      {
        loading ? <Load/>
        : <CarList
        data={cars}
        keyExtractor={item=>(item.id)}
        renderItem={({item})=>
        
            <Car data={item} onPress={()=>handleCarDetails(item)}/>
           
        }
        />
      }
     <MyCarsButton onPress={handleOpenMyCars}>
      <Ionicons 
      name="ios-car-sport"
      size={32}      
      color={theme.colors.shape}
      />
      
     </MyCarsButton>
     
    </Container>
  );
}