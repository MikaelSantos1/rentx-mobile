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

export function AppStackRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false
        }} initialRouteName={'Home'}>
             {/* <Screen
                name='Signin'
                component={Signin}
            /> */}
           
             {/* <Screen
                name='Splash'
                component={Splash}
            /> */}
            <Screen
                name='Home'
                component={Home}   
            />

            <Screen
                name='CarDetails'
                component={CarDetails} />

            <Screen
                name='Scheduling'
                component={Scheduling} />

            <Screen
                name='Confirmation'
                component={Confirmation} />

            <Screen
                name='SchedulingDetails'
                component={SchedulingDetails} />
            <Screen
                name='MyCars'
                component={MyCars} />
           
        </Navigator>
    )
}