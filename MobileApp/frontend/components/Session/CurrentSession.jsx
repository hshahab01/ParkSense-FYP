import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Avatar, Button, Card, Divider, Text, Icon } from 'react-native-paper';
import { theme } from '../../constants/themes';

const CurrentSession = ({ session }) => {

    // console.log("current:", session)
    const head = "Quicksand_700Bold"
    const content = "Quicksand_600SemiBold"

    const { CarRegNo, InTime,LotName } = session
    const timeIn = new Date(InTime)

    const DayIn = timeIn.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(',', '');
    const InHour = (timeIn.getHours())
    const InMin = (timeIn.getMinutes())

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            const passedTime = new Date(InTime);

            const timeDifference = currentTime.getTime() - passedTime.getTime();
            const totalSeconds = Math.floor(timeDifference / 1000);

            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;

            setHours(h);
            setMinutes(m);
            setSeconds(s);
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [InTime]);

    const margin = 10

    return (
        <View>
            <Card
                style={{
                    paddingHorizontal: margin,
                    paddingVertical: margin * 1.8,
                    margin: margin
                }}
            // onPress={}
            >
                <View style={{ flexDirection: 'row', marginHorizontal: 3 }}>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={{
                            marginRight: 'auto',
                            maxWidth: '100%',
                            minWidth: '90%',
                            fontFamily: head,
                            fontSize: 18
                        }}
                    >
                        {LotName}
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
                        }}
                        >
                            {((InHour) % 12 || 12) < 10 ? '0' : ''}{((InHour) % 12 || 12)}{":"}{InMin < 10 ? '0' : ''}{InMin}{InHour > 12 ? ' PM ' : ' AM '}{DayIn}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 1.5 }}>
                        <Icon
                            source="car-clock"
                            color={theme.colors.onPrimaryContainer}
                            size={23}
                        />
                        <Text style={{
                            fontFamily: content,
                            fontSize: 14
                        }}
                        >
                            {''}{hours ? hours + "h " + minutes + "m ": minutes ? minutes + "m " : null}{seconds + "s "}
                        </Text>
                    </View>
                </View>
            </Card>
        </View>
    );
};

export default CurrentSession;