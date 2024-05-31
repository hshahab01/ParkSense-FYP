import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react'
import { CommonActions } from '@react-navigation/native';
import { Text, BottomNavigation, } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import HomePage from '../../pages/HomePage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SessionPage from '../../pages/SessionPage';
import QRcodePage from '../../pages/QRcodePage';
import TransactionPage from '../../pages/TransactionPage';

const Tab = createMaterialBottomTabNavigator();

const Navbar = () => {

  const [key, setKey] = React.useState(0); // Initialize key state

  // Function to handle tab press
  const handleTabPress = () => {
    // Increment the key to force component remount
    setKey(key + 1);
    console.log(key)
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => {
            // console.log('color', color, ' size', size)
            return <Icon name="home" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionPage}
        options={{
          tabBarLabel: 'Sessions',
          tabBarIcon: ({ color }) => {
            return <Icon name="car-clock" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Scan"
        component={QRcodePage}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color }) => {
            return <Icon name="qrcode-scan" size={24} color={color} />;
          },
        }}
        listeners={{
          tabPress: handleTabPress, // Attach tab press listener
        }}
        initialParams={{ key: Date.now() }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionPage}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({ color }) => {
            return <Icon name="history" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => {
            return <Icon name="account" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  )

  function Profile() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
      }}>
        <Text
          // variant="headlineMedium"
          style={{
            fontFamily: 'Quicksand_400Regular'
          }}>Profile!</Text>
      </View>
    );
  }

}

export default Navbar