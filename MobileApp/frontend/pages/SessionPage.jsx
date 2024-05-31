import * as React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Appbar, Card, Icon, Text } from 'react-native-paper';
import { theme } from '../constants/themes';
import CurrentSession from '../components/Session/CurrentSession';
import PastSession from '../components/Session/PastSession';
import Header from '../components/Overlay/Header';
import { SegmentedButtons } from 'react-native-paper';
import { useAuth } from '../auth/AuthProvider';
import axios from 'axios';

const SessionPage = () => {

    const [value, setValue] = React.useState('Active');
    const { token } = useAuth();

    // console.log("token:", token)

    const active = { CarRegNo: 'ABC-123', InTime: new Date(), DayIn: '1 Jan 2024', LotName: 'IBA Main Campus' }
    const past = [{ CarRegNo: 'ABC-123', InTime: new Date(), DayIn: '1 Jan 2024', OutTime: new Date(), DayOut: '2 Jan 2024', LotName: 'IBA Main Campus' },
    { CarRegNo: 'XYZ-123', InTime: new Date(), DayIn: '2 Jan 2024', OutTime: new Date(), DayOut: '21 Jan 2024', LotName: 'Regent Plaza' },
    { CarRegNo: 'ABC-123', InTime: new Date(), DayIn: '1 Jan 2024', OutTime: new Date(), DayOut: '2 Jan 2024', LotName: 'IBA Main Campus' },
    { CarRegNo: 'XYZ-123', InTime: new Date(), DayIn: '2 Jan 2024', OutTime: new Date(), DayOut: '21 Jan 2024', LotName: 'Lucky One Mall' }
    ]
    const [activeSessions, setActiveSessions] = React.useState([])
    const [pastSessions, setPastSessions] = React.useState([])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            margin: 10
        },
    });

    React.useEffect(() => {
        //apicall 
        const getActive = async () => {
            api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/car/current"

            try {
                const payload = await axios.get(api_url, {
                    headers: {
                        'Authorization': token,
                    }
                })
                list = payload.data
                setActiveSessions(list)
            }
            catch (err) {
                console.log(err.response.data.message)
            }
        }
        getActive();
    }, [token])

    React.useEffect(() => {
        //apicall 
        const getPast = async () => {
            api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/car/past"

            try {
                const payload = await axios.get(api_url, {
                    headers: {
                        'Authorization': token,
                    }
                })
                list = payload.data
                setPastSessions(list)
            }
            catch (err) {
                console.log(err.response.data.message)
            }
        }
        getPast();
    }, [token])

    return (
        <>
            <Header Title={"Session History"} />

            <ScrollView style={{backgroundColor:theme.colors.background}}>
                <SafeAreaView style={styles.container}>
                    <SegmentedButtons
                        value={value}
                        onValueChange={setValue}
                        buttons={[
                            {
                                value: 'Active',
                                label: 'Active',
                            },
                            {
                                value: 'Past',
                                label: 'Past',
                            },
                        ]}
                    />
                </SafeAreaView>
                {value === 'Active' ?
                    activeSessions.length == 0 ?
                        <View style={{
                            alignItems: 'center', // Center horizontally
                            marginTop: 100, // Margin from the top
                        }}>
                            <Icon source="emoticon"
                                color="#bababa"
                                size={60}
                            />
                            <Text style={{ fontFamily: "Quicksand_400Regular" }}>
                                wow... so much empty
                            </Text>
                        </View> :
                        activeSessions.map((session, index) => {
                            return (
                                <CurrentSession session={session} key={index} />
                            )
                        })
                    :
                    pastSessions.length == 0 ?
                        <View style={{
                            alignItems: 'center', // Center horizontally
                            marginTop: 100, // Margin from the top
                        }}>
                            <Icon source="emoticon"
                                color="#bababa"
                                size={60}
                            />
                            <Text style={{ fontFamily: "Quicksand_400Regular" }}>
                                wow... so much empty
                            </Text>
                        </View>
                        :
                        pastSessions.map((session, index) => (
                            <PastSession session={session} key={index} />
                        ))
                }
            </ScrollView>
        </>
    );
};

export default SessionPage;
