import React from 'react'
import { View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { theme } from '../../constants/themes'

const Lot = ({ parkingLot }) => {

    const { Location,
        LotName,
        TotalLotAvailability,
        TotalLotCapacity,
        TotalLotOccupied,
        TotalZones } = parkingLot

    const head = "Quicksand_700Bold"
    const content = "Quicksand_600SemiBold"
    const sub = "Quicksand_500Medium"

    const margin = 10

    return (
        <View>
            <Card style={{ paddingHorizontal: margin, paddingVertical: margin * 1.3, margin: margin }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 3 }}>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={{
                            marginRight: 'auto',
                            maxWidth: '70%',
                            minWidth: '60%',
                            fontFamily: head,
                            fontSize: 18
                        }}
                    >
                        {LotName}
                    </Text>

                </View>
                <View style={{ marginVertical: margin, }}>
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={{
                            fontFamily: content,
                            fontSize: 14
                        }}>
                            {Location}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>

                        
                    </View>
                </View>

                <View style={{ marginHorizontal: 3 }}>

                    <Text style={{
                        fontFamily: sub,
                        fontSize: 14,
                        // textAlign: 'left'
                    }}
                    >
                        Zones: {TotalZones}
                    </Text>
                    <Text style={{
                            fontFamily: sub,
                            fontSize: 14
                        }}>
                            Capacity: {TotalLotCapacity}
                        </Text>
                </View>

            </Card>

        </View>
    )
}

export default Lot