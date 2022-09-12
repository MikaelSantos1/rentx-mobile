import React, { useEffect, useState } from 'react';
import { StatusBar,BackHandler, Button } from 'react-native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
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
import {
  Alert
} from 'react-native'
import { LoadingAnimation } from '../../components/LoadingAnimation';
import {synchronize} from '@nozbe/watermelondb/sync'
import { database } from '../../database';
import { Car as ModelCar } from '../../database/models/car';
export function Home() {
  const [cars,setCars]= useState<ModelCar[]>([])
  const [loading,setLoading]= useState(true)

  const navigation = useNavigation()
  const netInfo = useNetInfo()

  function handleCarDetails(car:ModelCar){
    navigation.navigate('CarDetails',{car})
  }
  async function offlineSyncronize(){
    console.log('teste')
    await synchronize({
      database,
      pullChanges: async ({lastPulledAt}) =>{
        const {data} = await api.get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
        const {changes,latestVersion}= data
        console.log(changes,latestVersion)
        return {changes,timestamp:latestVersion}
      },
      pushChanges:async ({changes}) =>{
        const users=changes.users
        await api.post(`/users/sync/`,users)
      }
    })
  }
 

  useEffect(()=>{
    
    let isMonted = true
      async function fetchCars(){
        try{
          const {data}= await api.get('/cars')
          const carsCollection = database.get<ModelCar>('cars')
          const car = await carsCollection.query().fetch()
          console.log(car)
          if(isMonted){
            setCars(car)
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
   
     <Button title='Sincronizar' onPress={offlineSyncronize}/>
    </Container>
  );
}