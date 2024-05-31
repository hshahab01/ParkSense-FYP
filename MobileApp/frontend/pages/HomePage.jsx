import React from 'react'
import { ScrollView, View } from 'react-native'
import { Appbar, Card, Text } from 'react-native-paper'
import { theme } from '../constants/themes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../components/Home/Home'
import { getHeaderTitle } from '@react-navigation/elements';
import Lots from '../components/Home/Lots'

const HomePage = () => {

    const Stack = createNativeStackNavigator();

    function CustomNavigationBar({ navigation, route, options, back }) {
        const title = getHeaderTitle(options, route.name);

        return (
            <Appbar.Header>
                {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                <Appbar.Content title={title} titleStyle={{ fontFamily: "Quicksand_700Bold" }} style={{elevation:10}}/>
            </Appbar.Header>
        );
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: -30
        }}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{
                header: (props) => <CustomNavigationBar {...props} />,
            }}>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false,}} />
                <Stack.Screen name="Parking Lots" component={Lots} />
            </Stack.Navigator>
        </View>
    )
}

export default HomePage