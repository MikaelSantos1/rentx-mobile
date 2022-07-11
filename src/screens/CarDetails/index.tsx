import React from 'react';
import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
  Accessories,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { useNavigation , useRoute} from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccesoryIcon } from '../../utils/getAccesoryIcon';

interface Params{
    car:CarDTO
}

export function CarDetails() {
  const navigation = useNavigation()
  const routes = useRoute()
  const {car} = routes.params as Params


  function handleConfirmRental(){
    navigation.navigate('Scheduling',{
      car
    })
  }
  function handleBack(){
    navigation.goBack()
  }

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
            <Price> R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
         {car.accessories.map(acessory=>(
           <Acessory 
           key={acessory.type}
           name={acessory.name}
           icon={getAccesoryIcon(acessory.type)}
           />
         ))}
        </Accessories>


        <About>
         {car.about}
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