import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Divider, Text, Card, Icon, MD3Colors, } from 'react-native-paper'
import { theme } from '../../constants/themes';
import { AirbnbRating } from 'react-native-ratings';
import StarRating from 'react-native-star-svg-rating';

const PastSession = ({ session }) => {

    const [rating, setRating] = React.useState(0);

    // console.log("past:",session)
    const head = "Quicksand_700Bold"
    const content = "Quicksand_600SemiBold"

    const { CarRegNo, InTime, OutTime, LotName, Charge, Make, Model, Rating } = session
    // console.log(session)

    const timeIn = new Date(InTime)
    const timeOut = new Date(OutTime)

    const DayIn = timeIn.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(',', '');
    const InHour = (timeIn.getHours())
    const InMin = (timeIn.getMinutes())
    // const InSec = (timeIn.getSeconds())

    const DayOut = timeOut.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(',', '');
    const OutHour = (timeOut.getHours())
    const OutMin = (timeOut.getMinutes())
    // const OutSec = (timeOut.getSeconds())

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
                    <Text style={{
                        marginLeft: 'auto',
                        fontFamily: content,
                        fontSize: 18
                    }}>
                        $ {Charge || `0.00`}
                    </Text>
                </View>
                <View style={{ marginVertical: margin, }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            source="arrow-right-thick"
                            color='green'
                            size={25}
                        />
                        <Text style={{
                            fontFamily: content,
                            fontSize: 14
                        }}>
                            {((InHour) % 12 || 12) < 10 ? '0' : ''}{((InHour) % 12 || 12)}{":"}{InMin < 10 ? '0' : ''}{InMin}{InHour > 12 ? ' PM ' : ' AM '}{DayIn}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon
                            source="arrow-left-thick"
                            color='#bb0000'
                            size={25}
                        />
                        <Text style={{
                            fontFamily: content,
                            fontSize: 14
                        }}>
                            {((OutHour) % 12 || 12) < 10 ? '0' : ''}{((OutHour) % 12 || 12)}{":"}{OutMin < 10 ? '0' : ''}{OutMin}{OutHour > 12 ? ' PM ' : ' AM '}{DayOut}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 3 }}>
                    <Icon
                        source="car"
                        color={theme.colors.onPrimaryContainer}
                        size={25}
                    />
                    <Text style={{
                        fontFamily: "Quicksand_500Medium",
                        fontSize: 14,
                        // textAlign: 'left'
                    }}
                    >
                        {Make} {Model} {`(`}{CarRegNo}{`)`}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 7 }}>
                    <StarRating
                        rating={Rating}
                        onChange={setRating}
                        animationConfig={{ scale: 1 }}
                        starSize={25}
                    />
                </View>
            </Card>

        </View>
    )
}

export default PastSession