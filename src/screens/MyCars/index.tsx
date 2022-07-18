import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { AntDesign } from '@expo/vector-icons'
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Apointments,
  ApoimentsTitle,
  ApoimentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterPeriod,
  CarFooterTitle,
  CarFooterDate,
} from './styles';
import { Load } from '../../components/Load';

interface CarProps {
  car: CarDTO;
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const theme = useTheme()
  function handleBack() {
    navigation.goBack()

  }
  useEffect(() => {
    async function FetchCars() {
      try {
        const { data } = await api.get('/schedules_byuser?user_id=1')
        setCars(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    FetchCars()
  }, [])
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {'\n'}
          data de inicio  {'\n'}
          do aluguel {'\n'}
        </Title>
        <SubTitle>
          Conforto segurança e praticidade
        </SubTitle>
      </Header>
      {
        loading ?
          <Load />
          :
          <Content>
            <Apointments>
              <ApoimentsTitle>Agendamentos feitos</ApoimentsTitle>
              <ApoimentsQuantity>{cars.length}</ApoimentsQuantity>
            </Apointments>

            <FlatList
              data={cars}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (

                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Periodo</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                    </CarFooterPeriod>
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooter>
                </CarWrapper>

              )}
            />
          </Content>
      }


    </Container>
  );
}