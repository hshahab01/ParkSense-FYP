import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, RadioButton, Text } from 'react-native-paper';
import { theme } from '../../constants/themes';
import { useAuth } from '../../auth/AuthProvider';
import axios from 'axios';

const SessionStart = ({ route, navigation }) => {

    const { token } = useAuth();

    const { data } = route.params

    // console.log("Received result:", data);

    const [value, setValue] = React.useState('');
    const [buttonState, setbuttonState] = React.useState('disabled');
    const [vehicles, setVehicles] = React.useState([]);

    const margin = 10

    React.useEffect(() => {
        const getVehicles = async () => {
            api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/car";
            // console.log("api1", api_url)
            try {
                const payload = await axios.get(api_url, {
                    headers: {
                        'Authorization': token,
                    }
                })
                list = payload.data
                // console.log(list.MyVehicles)
                setVehicles(list.MyVehicles)
            }
            catch (err) {
                // alert(err)
                console.log(err)
            }
        }
        getVehicles();
    }, [token])

    const startSession = async () => {
        api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/car/start"

        body = { carRegNo: value, lotID: data.Lot_ID }

        try {
            const payload = await axios.post(api_url, body, {
                headers: {
                    'Authorization': token,
                }
            })
            navigation.navigate('ParkingDetails', {
                lot_id: data.Lot_ID,
            });
        }
        catch (err) {
            console.log("Error:", err)
            alert(err)
        }
    }

    return (
        <ScrollView style={{ backgroundColor: theme.colors.white }}>

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
                        {/* <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                            <RadioButton style={{ marginRight: 'auto' }} value="car 1" />
                            <Text style={{
                                fontFamily: "Quicksand_500Medium",
                                fontSize: 18
                            }}
                            >
                                car 1
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <RadioButton style={{ marginLeft: 'auto' }} value="car 2" />
                            <Text style={{
                                fontFamily: "Quicksand_500Medium",
                                fontSize: 18
                            }}>
                                car 2
                            </Text>
                        </View> */}
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

            <Card style={{ paddingHorizontal: margin, paddingVertical: margin * 1.8, margin: margin }}>

                <View>
                    <Text style={{
                        fontFamily: "Quicksand_700Bold",
                        fontSize: 23,
                        marginBottom: margin
                    }}>
                        Lot information
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        {data.Lot_Name}
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        location?
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        Total Zones: {data.Total_Zones}
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        Total Capacity: {data.Total_Capacity}
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        {data.hello}
                    </Text>
                </View>

            </Card>

            <View style={{ flexDirection: 'row', justifyContent: 'center', margin: margin }}>
                <Button mode={buttonState} onPress={() => startSession()} style={{ marginLeft: 'auto', }}>
                    <Text style={{ fontFamily: "Quicksand_500Medium", color: theme.colors.onPrimary }}>
                        Start Session
                    </Text>
                </Button>
            </View>

        </ScrollView>

    );
};

export default SessionStart;    