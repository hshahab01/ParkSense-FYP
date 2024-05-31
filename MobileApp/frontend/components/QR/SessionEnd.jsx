import React from 'react'
import { View } from 'react-native'
import { useAuth } from '../../auth/AuthProvider';
import { Button, Card, RadioButton, Text } from 'react-native-paper';
import axios from 'axios';
import { theme } from '../../constants/themes';

const SessionEnd = ({ route, navigation }) => {

    const { token } = useAuth();

    const [value, setValue] = React.useState('');
    const [buttonState, setbuttonState] = React.useState('disabled');
    const [vehicles, setVehicles] = React.useState([]);

    const margin = 10

    React.useEffect(() => {
        const getVehicles = async () => {
            api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/car";
            console.log("api", api_url)

            try {
                const payload = await axios.get(api_url, {
                    headers: {
                        'Authorization': token,
                    }
                })
                list = payload.data
                console.log(list.MyVehicles)
                setVehicles(list.MyVehicles)
            }
            catch (err) {
                // alert(err)
                console.log(err)
            }
        }
        getVehicles();
    }, [token])

    const endSession = async () => {
        api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/car/end"

        obj = { carRegNo: value }

        try {
            const payload = await axios.post(api_url, obj, {
                headers: {
                    'Authorization': token,
                }
            })
            console.log(payload.data)
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <View>
            <Card style={{ paddingHorizontal: margin, paddingVertical: margin * 1.8, margin: margin }}>

                <View style={{ marginBottom: margin }}>
                    <Text style={{
                        fontFamily: "Quicksand_700Bold",
                        fontSize: 23
                    }}>
                        Select Car
                    </Text>
                </View>

                <View>
                    <RadioButton.Group onValueChange={newValue => { setValue(newValue); setbuttonState('contained') }} value={value}>
                        {vehicles.map((car, index) => {
                            return (
                                <View style={{ flexDirection: 'row', alignContent: 'center' }} key={index}>
                                    <RadioButton style={{ marginRight: 'auto' }} value={car.RegistrationNumber} />
                                    <Text style={{
                                        fontFamily: "Quicksand_500Medium",
                                        fontSize: 18
                                    }}
                                    >
                                        {car.Make} {car.Model} ({car.RegistrationNumber})
                                    </Text>
                                </View>
                            )
                        })}
                    </RadioButton.Group>
                </View>

            </Card>

            <View style={{ flexDirection: 'row', justifyContent: 'center', margin: margin }}>
                <Button mode={buttonState} onPress={() => endSession()} style={{ marginLeft: 'auto', }}>
                    <Text style={{ fontFamily: "Quicksand_500Medium", color: theme.colors.onPrimary }}>
                        End Session
                    </Text>
                </Button>
            </View>
        </View>
    )
}

export default SessionEnd