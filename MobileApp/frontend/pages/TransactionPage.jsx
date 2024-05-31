import React from 'react'
import { ScrollView, View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'
import Header from '../components/Overlay/Header'
import { useAuth } from '../auth/AuthProvider'
import { theme } from '../constants/themes'
import axios from 'axios'

const TransactionPage = () => {

    const { token } = useAuth();

    const [transactions, setTransactions] = React.useState([])

    React.useEffect(() => {
        const getTransactions = async () => {
            api_url = process.env.EXPO_PUBLIC_BACKEND_API_URL + "/car/transactions"

            try {
                const payload = await axios.get(api_url, {
                    headers: {
                        'Authorization': token,
                    }
                })
                list = payload.data.transactions
                setTransactions(list)
                // console.log(list)
            }
            catch (err) {
                console.log(err.response.data.message)
            }

        }
        getTransactions();
    }, [token])

    const margin = 10
    const head = "Quicksand_700Bold"
    const content = "Quicksand_600SemiBold"
    const sub = "Quicksand_400Regular"

    return (
        <ScrollView style={{backgroundColor:theme.colors.background}}>
            <Header Title={"Transaction History"} />
            {
                transactions.length == 0 ?
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
                    transactions.map((transaction, index) => {

                        const timeIn = new Date(transaction.Date)
                        const DayIn = timeIn.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        }).replace(',', '');
                        const InHour = (timeIn.getHours())
                        const InMin = (timeIn.getMinutes())

                        return (
                            <Card
                                style={{
                                    paddingVertical: margin,
                                    paddingRight: margin,
                                    margin: margin
                                }}
                                key={index}
                            // onPress={}
                            >
                                <View style={{ flexDirection: 'row', marginHorizontal: 3, marginVertical: 6 }}>
                                    <View style={{ margin: 5 }}>
                                        {transaction.Type === "Charge" ?
                                            <Icon
                                                source="arrow-bottom-left-bold-box"
                                                color={theme.colors.inversePrimary}
                                                size={40}
                                            />
                                            :
                                            <Icon
                                                source="car-clock"
                                                color={theme.colors.secondary}
                                                size={40}
                                            />
                                        }

                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                    </View>
                                    <View>
                                        <Text
                                            ellipsizeMode='tail'
                                            numberOfLines={1}
                                            style={{
                                                marginRight: 'auto',
                                                maxWidth: '90%',
                                                minWidth: '60%',
                                                fontFamily: content,
                                                fontSize: 22,
                                            }}
                                        >
                                            {transaction.Name}
                                        </Text>
                                        <Text style={{
                                            fontFamily: sub,
                                            fontSize: 12,
                                            marginVertical: 5
                                        }}
                                        >
                                            {((InHour) % 12 || 12) < 10 ? '0' : ''}{((InHour) % 12 || 12)}{":"}{InMin < 10 ? '0' : ''}{InMin}{InHour > 12 ? ' PM ' : ' AM '}{DayIn}
                                        </Text>
                                    </View>

                                    <Text style={{
                                        marginLeft: 'auto',
                                        fontFamily: content,
                                        fontSize: 20
                                    }}>
                                        {transaction.Type === "Charge" ? transaction.Amount : "+" + transaction.Amount}
                                    </Text>
                                </View>

                            </Card>
                        )
                    })
            }
        </ScrollView>
    )
}

export default TransactionPage