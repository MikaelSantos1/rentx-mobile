import React from 'react';
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
  About
} from './styles';

export function CarDetails() {
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

        <About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Perferendis, at, molestias harum ab maiores sit facere perspiciatis porro blanditiis, in ea magnam corporis nesciunt delectus quia eos. 
          Fugit, molestiae accusantium.
        </About>
      </Content>
    </Container>
  );
}