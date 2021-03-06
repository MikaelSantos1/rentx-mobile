import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import GasolineSvg from '../../assets/gasoline.svg'
import { CarDTO } from '../../dtos/CarDTO';
import { getAccesoryIcon } from '../../utils/getAccesoryIcon';
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Perioud,
  Price,
  Type,
  CarImage,
} from './styles';

interface Props extends RectButtonProps{
    data:CarDTO 
}


export function Car({data,...rest}:Props){
  const MotorIcon= getAccesoryIcon(data.fuel_type)
  return (
    <Container {...rest}>
        <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.name}</Name>

            <About>
                <Rent>
                    <Perioud>{data.rent.period}</Perioud>
                    <Price>{ `R$ ${data.rent.price}`}</Price>
                </Rent>
                <Type>
                    <MotorIcon/>
                </Type>
            </About>
        </Details>
        <CarImage source={{uri:data.thumbnail}} 
        resizeMode="contain"
        />
    </Container>
  );
}