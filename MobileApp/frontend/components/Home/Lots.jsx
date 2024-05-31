import axios from 'axios'
import React from 'react'
import { useAuth } from '../../auth/AuthProvider'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, SegmentedButtons } from 'react-native-paper';
import { StyleSheet,ScrollView } from 'react-native';
import { theme } from '../../constants/themes';
import Lot from './Lot';

const Lots = ({routes, navigation}) => {

    const [value, setValue] = React.useState('All');
    const {token} = useAuth();

    const [parkingLots, setParkingLots] = React.useState([])
    const [recentLots, setRecentLots] = React.useState([])
    const [frequentLots, setFrequentLots] = React.useState([])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            margin: 10,
            marginTop:-20
        },
    });

    React.useEffect(() => {
        
        const getParkingLots = async () => {
            api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/car/lotinfo"

            try {
                const payload = await axios.get(api_url, {
                    headers: {
                        'Authorization': token,
                    }
                })
                list = payload.data
                setParkingLots(list)
            }
            catch (err) {
                console.log(err.response.data.message)
            }
        }
        if (token) {
            getParkingLots();
        }
    }, [token])

    React.useEffect(() => {
        const getFrequentLots = async () => {
            api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/car/frequent"

            try {
                const payload = await axios.get(api_url, {
                    headers: {
                        'Authorization': token,
                    }
                })
                list = payload.data
                setFrequentLots(list)
            }
            catch (err) {
                console.log(err.response.data.message)
            }
        }
        if (token) {
            getFrequentLots();
        }
    }, [token])

    React.useEffect(() => {
        const getRecentLots = async () => {
            api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/car/recent"

            try {
                const payload = await axios.get(api_url, {
                    headers: {
                        'Authorization': token,
                    }
                })
                list = payload.data
                setRecentLots(list)
            }
            catch (err) {
                console.log(err.response.data.message)
            }
        }
        if (token) {
            getRecentLots();
        }
    }, [token])

    return (
        <>
        <Divider></Divider>
            <ScrollView style={{ backgroundColor: theme.colors.background}} >

                <SafeAreaView style={styles.container}>
                    <SegmentedButtons
                        value={value}
                        onValueChange={setValue}
                        buttons={[
                            {
                                value: 'All',
                                label: 'All',
                            },
                            {
                                value: 'Frequent',
                                label: 'Frequent',
                            },
                            {
                                value: 'Recent',
                                label: 'Recent',
                            },
                        ]}
                    />
                </SafeAreaView>
                {value === 'All' ?
                    parkingLots.map((lot, index) => {
                        return (
                            <Lot parkingLot={lot} key={index}/>
                        )
                    })
                    :
                    value === 'Frequent' ?
                        frequentLots.map((frequent, index) => {
                            return (
                                <>
                                </>
                            )
                        })
                        :
                        recentLots.map((recent, index) => {
                            return (
                                <>
                                </>
                            )
                        })
                }
            </ScrollView>
        </>
    )
}

export default Lots