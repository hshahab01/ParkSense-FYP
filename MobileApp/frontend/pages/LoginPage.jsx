import React, { useState } from 'react'
import { ScrollView, View, Image } from 'react-native'
import { TextInput, Text, Button, Snackbar } from 'react-native-paper';
import { theme } from '../constants/themes'
import axios from 'axios';
import { useAuth } from '../auth/AuthProvider'
import { AuthContext } from "../auth/auth-context"

const LoginPage = ({ navigation, route }) => {

    const auth = React.useContext(AuthContext);
    // const { handleLoginSuccess } = useAuth();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = loginData

    const onChange = (name, value) => {
        setLoginData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setVisible(false);
    };

    const [visible, setVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('')

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const margin = 10

    const login = async () => {
        api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/login"
        // console.log(api_url)

        try {
            const payload = await axios.post(api_url, loginData)
            console.log("response", payload.data.token)
            const username = "user";
            auth.login(username, payload.data.token)
            // handleLoginSuccess();
        }
        catch (err) {
            console.log("Error:", err)
            setErrorMessage(err.response.data.message)
            setVisible(true)
        }
    }

    return (
        <View style={{
            backgroundColor: theme.colors.white,
            flex: 1,
            justifyContent: 'center',
            // marginTop: 1
        }}>
            {/* <Image
                source={require('../assets/parksense_logo.png')}
                style={{
                    resizeMode: 'center',
                    height: 100,
                    width: 270,
                    // flex: 1,
                    justifyContent: 'center', // Center vertically
                    alignItems: 'center',
                    marginHorizontal: 50,
                    marginTop: -90,
                    marginBottom: 100
                }} /> */}
            <Text
                variant="headlineLarge"
                style={{
                    fontFamily: 'Quicksand_700Bold',
                    textAlign: 'center',
                    marginBottom: 15
                }}>
                Login
            </Text>
            <TextInput
                style={{
                    margin: margin,
                    cursorColor: theme.colors.error,
                    color: theme.colors.error
                }}
                label="Email"
                name="email"
                value={email}
                mode='outlined'
                // textContentType='emailAddress'
                onChangeText={(text) => onChange("email", text)}
                cursorColor={theme.colors.error}
            />
            <TextInput
                style={{ margin: margin }}
                label="Password"
                name="password"
                value={password}
                secureTextEntry
                mode='outlined'
                // right={<TextInput.Icon icon="eye" />}
                onChangeText={(text) => onChange("password", text)}
            />
            {visible && <Text variant="labelSmall"
                // color={theme.colors.error}
                style={{
                    fontFamily: 'Quicksand_700Bold',
                    textAlign: 'left',
                    marginBottom: 15,
                    marginHorizontal: margin,
                    color: theme.colors.error
                }}
            >
                {errorMessage}
            </Text>
            }
            <Button
                mode="contained"
                style={{ marginTop: 20 }}
                disabled={!email || !password}
                onPress={login}
            >
                Login
            </Button>
            {/* <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Hide',
                }}
            >
                Incorrect Credentials. Please try again
            </Snackbar> */}
        </View>
    )
}

export default LoginPage