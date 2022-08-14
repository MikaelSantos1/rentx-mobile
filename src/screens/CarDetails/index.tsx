import React from 'react';
import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,

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
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccesoryIcon } from '../../utils/getAccesoryIcon';
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import theme from '../../styles/theme';

interface Params {
  car: CarDTO
}

export function CarDetails() {
  const navigation = useNavigation()
  const routes = useRoute()
  const { car } = routes.params as Params

  const scrollY = useSharedValue(0)
  const scrollHandle = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
    console.log(event)
  })
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleConfirmRental() {
    navigation.navigate('Scheduling', {
      car
    })
  }
  function handleBack() {
    navigation.goBack()
  }

  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor={'transparent'}
      />
      <Animated.View style={[headerStyleAnimation, styles.header,{backgroundColor:theme.colors.background_secondary}]}>


        <Header>
          <BackButton

            onPress={handleBack}
          />
        </Header>

        <Animated.View style={[sliderCarsStyleAnimation]}>

          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>

        </Animated.View>
      </Animated.View>
      <Animated.ScrollView contentContainerStyle={{
        padding: 24,
        paddingTop: getStatusBarHeight() + 160,
        alignItems: 'center'

      }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>

          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price> R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(acessory => (
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
        
        <About>
          {car.about}
        </About>
        
        <About>
          {car.about}
        </About>
        
        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title='Escolher periodo de aluguel'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  },

})