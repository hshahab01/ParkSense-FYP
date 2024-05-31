import * as React from 'react';
import { View } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';

const Header = ({ Title }) => {

    return (
        <View style={{ marginBottom: 0, marginTop: -30 }}>
            <Appbar.Header style={{
                elevation: 2,
                alignItems: 'center',
            }}>
                <Appbar.Content title={Title} titleStyle={{
                    fontFamily: 'Quicksand_700Bold',
                    fontSize: 22
                }}
                />
                {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
                {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
            </Appbar.Header>
            <Divider style={{ height: 0.5 }} />
        </View>

    );
};

export default Header;