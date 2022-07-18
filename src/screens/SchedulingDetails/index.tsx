import React, { useEffect, useState } from 'react';
import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import SpeedSvg from '../../assets/speed.svg'
import AccelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import People from '../../assets/people.svg'
import ExchangeSvg from '../../assets/Exchange.svg'
import { Feather } from "@expo/vector-icons"
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal,
  RentalPriceDetail,
} from './styles';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAccesoryIcon } from '../../utils/getAccesoryIcon';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { format } from 'date-fns';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface Params{
  car:CarDTO;
  dates:string[];
}
interface RentalPeriod{
  start:string;
  end:string;
}
export function SchedulingDetails() {
  const [rentalPeriod,setRentalPeriod]= useState<RentalPeriod>({} as RentalPeriod)
  const [loading,setLoading]= useState(false)
  const theme = useTheme()
  const navigation = useNavigation()

  const routes = useRoute()
  const {car,dates} = routes.params as Params

  const rentalTotal= Number(dates.length * car.rent.price)

  async function handleConfirmRental(){
    setLoading(true)
  const schedulesByCar =  await api.get(`schedules_bycars/${car.id}`)
  
  const unavailable_dates=[
    ...schedulesByCar.data.unavailable_dates,
    ...dates,

  ]
  await api.post('schedules_byuser',{
    user_id:1,
    car,
    startDate:format(getPlatformDate(new Date(dates[0])),'dd/MM/yyyy'),
    endDate:format(getPlatformDate(new Date(dates[dates.length -1 ])),'dd/MM/yyyy'),
  })
  api.put(`/schedules_bycars/${car.id}`,{
    id:car.id,
    unavailable_dates
  })
  .then(()=>
    navigation.navigate('SchedulingComplete')
  ).catch(()=>{
    Alert.alert('Não foi possivel confirmar o agendamento')
    setLoading(false)
  })
    
  }
  function handleBack() {
    navigation.goBack()
    
  }

  useEffect(()=>{
    setRentalPeriod({
      start:format(getPlatformDate(new Date(dates[0])),'dd/MM/yyyy'),
      end:format(getPlatformDate(new Date(dates[dates.length -1 ])),'dd/MM/yyyy'),
    })
      
  },[])
  return (
    <Container>
      <Header>
        <BackButton
          onPress={handleBack}
        />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>

          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accesory=>
              <Acessory
            key={accesory.type}
            name={accesory.name}
            icon={getAccesoryIcon(accesory.type)}
          />
              )
          }
          
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>{}</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>{`R$ ${car.rent.price} x ${dates.length} diarias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
        title='Alugar agora' 
        color={theme.colors.success}
        onPress={handleConfirmRental}
        enabled={!loading}
        loading={loading}
        />
      </Footer>
    </Container>
  );
}