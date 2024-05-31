import React from 'react'
import { ScrollView, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { theme } from '../../constants/themes'

const Home = ({ navigation }) => {

    const renderAllLots = () => {
        navigation.navigate('Parking Lots');
    }

    return (
        <ScrollView style={{ backgroundColor: theme.colors.background }}>

            <TouchableHighlight onPress={renderAllLots} underlayColor={theme.colors.onPrimary}>
                <View style={{ marginHorizontal: 10, marginBottom: 15, marginTop: 50 }}>
                    <Card>
                        <Card.Title
                            title="Locate a Parking Lot"
                            titleStyle={{
                                fontFamily: 'Quicksand_700Bold',
                                fontSize: 20
                            }} />
                        <Card.Content>
                            <Text style={{
                                fontFamily: 'Quicksand_500Medium'
                            }}>Insert map here Insert map here Insert map here Insert map here Insert map here Insert map here Insert map here Insert map here </Text>
                        </Card.Content>
                    </Card>
                </View>
            </TouchableHighlight>

            <View style={{ marginHorizontal: 10, margin: 15 }}>
                <Card>
                    <Card.Title
                        title="Recent Lots"
                        titleStyle={{
                            fontFamily: 'Quicksand_700Bold',
                            fontSize: 20
                        }} />
                    <Card.Content>
                        <Text style={{
                            fontFamily: 'Quicksand_500Medium'
                        }}> Insert map here Insert map here Insert map here Insert map here Insert map here </Text>
                    </Card.Content>
                </Card>
            </View>

            <View style={{ marginHorizontal: 10, margin: 15 }}>
                <Card>
                    <Card.Title
                        title="Frequent Lots"
                        titleStyle={{
                            fontFamily: 'Quicksand_700Bold',
                            fontSize: 20
                        }} />
                    <Card.Content>
                        <Text style={{
                            fontFamily: 'Quicksand_500Medium'
                        }}> Insert map here Insert map here Insert map here Insert map here Insert map here </Text>
                    </Card.Content>
                </Card>
            </View>


        </ScrollView>

    )
}

export default Home