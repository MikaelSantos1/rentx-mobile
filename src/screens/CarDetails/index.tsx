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
  About,
  Acessories,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

export function CarDetails() {
  const navigation = useNavigation()

  function handleConfirmRental(){
    navigation.navigate('Scheduling')
  }

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


        <About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Perferendis, at, molestias harum ab maiores sit facere perspiciatis porro blanditiis, in ea magnam corporis nesciunt delectus quia eos.
          Fugit, molestiae accusantium.
        </About>
      </Content>

      <Footer>
        <Button 
        title='Escolher periodo de aluguel' 
        onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}