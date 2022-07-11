import React, { useEffect, useState } from 'react';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
  Container
} from './styles';

export function MyCars(){
    const [cars,setCars]= useState<CarDTO>({} as CarDTO)
    const [loading,setLoading]= useState(true)

    useEffect(()=>{
        async function FetchCars(){
            try{
                const { data} = await api.get('/schedules_byuser?user_id=1')
                setCars(data)
                console.log(data)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        FetchCars()
    },[])
  return (
    <Container>
            {}
    </Container>
  );
}