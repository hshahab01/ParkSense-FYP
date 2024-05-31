import { AppRegistry, Image } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import Navbar from './components/Overlay/Navbar';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './constants/themes';
import ParkSense from './components/Overlay/ParkSense';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import * as Keychain from "react-native-keychain";
import { useAuth } from './auth/AuthProvider';

import { AuthContext } from "./auth/auth-context"

import {
    useFonts,
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import LoginPage from './pages/LoginPage';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading';
import HomePage from './pages/HomePage';
import QRcode from './pages/QRcodePage';
import SessionPage from './pages/SessionPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {

    const { token, login, logout, userId } = useAuth();

    const Stack = createNativeStackNavigator();

    let [fontsLoaded] = useFonts({
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_500Medium,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
    });

    // React.useEffect(() => {
    async function deleteToken() {
        await SecureStore.deleteItemAsync("user")
    }
    deleteToken();
    // }, [])

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    if (!fontsLoaded) {
        return null;
        // return (<AppLoading/>); // Or render a loading indicator
    }
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout,
            }}
        >
            <NavigationContainer>
                <PaperProvider theme={theme}>

                    {!token ?
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: true,
                                headerTitle: props => <ParkSense {...props} width={260} margin={15} />, // Render ParkSense component in headerTitle
                                headerTitleAlign: 'left',
                            }}
                        >
                            <Stack.Screen name="LoginPage" component={LoginPage}
                            // options={{ headerTitle: (props) => <ParkSense {...props} /> }} 
                            />

                        </Stack.Navigator>
                        :
                        // <PaperProvider theme={theme}>
                        <>
                            <ParkSense />
                            <Navbar />
                            {/* <Stack.Navigator>
                            <Stack.Screen name="HomePage" component={HomePage}
                                // options={{ headerTitleAlign: 'center' }} 
                                options={{ headerShown: false }} />
                            <Stack.Screen name="ProfilePage" component={ProfilePage} />
                            <Stack.Screen name="QRcode" component={QRcode} />
                            <Stack.Screen name="SessionPage" component={SessionPage} />
                        </Stack.Navigator> */}
                        </>
                        // </PaperProvider>

                    }
                </PaperProvider>

            </NavigationContainer >
        </AuthContext.Provider >
    );
}

AppRegistry.registerComponent(appName, () => App);