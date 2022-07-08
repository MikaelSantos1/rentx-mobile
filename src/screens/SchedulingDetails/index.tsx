import React from 'react';
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
  Acessories,
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

export function SchedulingDetails() {
  const theme = useTheme()
  return (
    <Container>
      <Header>
        <BackButton
          onPress={() => { }}
        />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={['https://storage.googleapis.com/golden-wind/ignite/react-native/images/1.png']} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>audi</Brand>
            <Name>Audi a4</Name>

          </Description>
          <Rent>
            <Period>teste</Period>
            <Price>1222</Price>
          </Rent>
        </Details>

        <Acessories>
          <Acessory
            name='308km/h'
            icon={SpeedSvg}
          />
          <Acessory
            name='308km/h'
            icon={SpeedSvg}
          />
          <Acessory
            name='308km/h'
            icon={SpeedSvg}
          />
          <Acessory
            name='308km/h'
            icon={SpeedSvg}
          />
          <Acessory
            name='308km/h'
            icon={SpeedSvg}
          />
          <Acessory
            name='308km/h'
            icon={SpeedSvg}
          />
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>D</DateTitle>
            <DateValue>07/07</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>D</DateTitle>
            <DateValue>07/07</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>R$ 200x 3 diarias</RentalPriceQuota>
            <RentalPriceTotal>R$ 600</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>

      <Footer>
        <Button title='Confirmar' color='red' />
      </Footer>
    </Container>
  );
}