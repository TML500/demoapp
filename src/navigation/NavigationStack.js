import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
const Stack = createStackNavigator();
//
import { HomeScreen } from '../container'

const NavigationStack = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
        </GestureHandlerRootView>
    )
}

export default NavigationStack