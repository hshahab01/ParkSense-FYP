import React from 'react'
import { useAuth } from '../../auth/AuthProvider';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { theme } from '../../constants/themes';
import axios from 'axios';

const ParkingDetails = ({ route, navigation }) => {

    const { token } = useAuth;

    const [lotInfo, setLotInfo] = React.useState('')

    const margin = 10

    React.useEffect(() => {
        console.log("meow")
        const getLotInfo = async () => {
            // console.log("lot_id",route.params.lot_id)
            api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/parking/get/" + route.params.lot_id
            //console.log("api",api_url)
            try {
                const payload = await axios.get(api_url, {
                    headers: {
                        'Authorization': token
                    }
                })
                const obj = payload.data
                console.log("info:", obj)
                setLotInfo(obj)
            }
            catch (err) {
                console.log(err)
            }
        }
        getLotInfo()
    }, [token])

    return (
        <ScrollView style={{ backgroundColor: theme.colors.white }}>

            <Card style={{ paddingHorizontal: margin, paddingVertical: margin * 1.8, margin: margin }}>

                <View>
                    <Text style={{
                        fontFamily: "Quicksand_600SemiBold",
                        fontSize: 23,
                        marginBottom: margin
                    }}>
                        {lotInfo.LotName}
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        {lotInfo.Location}
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        Total Zones: {lotInfo.TotalZones}
                    </Text>
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 18
                    }}
                    >
                        Total Capacity: {lotInfo.TotalCapacity}
                    </Text>

                    <View>
                        {lotInfo ? lotInfo.zones.map((zone, index) => {
                            return (
                                <View key={index}>
                                    <Text style={{
                                        fontFamily: "Quicksand_400Regular",
                                        fontSize: 18
                                    }}
                                    >
                                        {zone.zoneId}
                                    </Text>
                                    <Text style={{
                                        fontFamily: "Quicksand_400Regular",
                                        fontSize: 18
                                    }}
                                    >
                                        empty: {zone.emptySpaces}
                                    </Text>
                                    <Text style={{
                                        fontFamily: "Quicksand_400Regular",
                                        fontSize: 18
                                    }}
                                    >
                                        max: {zone.maxSpaces}
                                    </Text>
                                </View>)
                        }) : null}
                    </View>
                </View>

            </Card>

        </ScrollView>

    )
}

export default ParkingDetails