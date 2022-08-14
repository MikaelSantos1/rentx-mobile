import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { Confirmation } from '../screens/Confirmation'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash'
import { Signin } from '../screens/Signin'
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep'
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep'

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false
        }} initialRouteName={'Home'}>
             <Screen
                name='Signin'
                component={Signin}
            />
             <Screen
                name='SignUpFirstStep'
                component={SignUpFirstStep}
            />
              <Screen
                name='SignUpSecondStep'
                component={SignUpSecondStep}
            />
             {/* <Screen
                name='Splash'
                component={Splash}
            /> */}
         

            <Screen
                name='Confirmation'
                component={Confirmation} />

        </Navigator>
    )
}