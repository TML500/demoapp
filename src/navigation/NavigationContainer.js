import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './NavigationStack'

const Container = () => {
    return (
        <NavigationContainer>
            <NavigationStack />
        </NavigationContainer>
    )
}

export default Container