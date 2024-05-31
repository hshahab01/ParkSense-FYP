import React from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import * as Keychain from "react-native-keychain";

const Scanner = ({ navigation }) => {

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = React.useState(false);
    const [result, setResult] = React.useState("null");

    const scanHandler = ({ data }) => {
        console.log("scanned", JSON.parse(data))

        if (JSON.parse(data).Session === "ENTRY") {
            setTimeout(() => {
                navigation.navigate('SessionStart', {
                    data: JSON.parse(data),
                });
            }, 1000);
        }
        else if (JSON.parse(data).Session == "EXIT") {
            setTimeout(() => {
                navigation.navigate('SessionEnd', {
                    data: JSON.parse(data),
                });
            }, 1000);
        }


    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
        },
        camera: {
            flex: 1,
        },
        buttonContainer: {
            flex: 2,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            margin: 2,
        },
        button: {
            flex: 1,
            alignSelf: 'flex-end',
            alignItems: 'center',
        },
        text: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
        },
        barcodeGuideline: {
            width: 40, // Adjust for desired size
            height: 0, // Adjust for desired size
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            // marginTop: 'auto',
            // marginBottom: 'auto'
        },
        barcodeGuideline1: {
            width: 0, // Adjust for desired size
            height: 40, // Adjust for desired size
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 20,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto'
        },
    });

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing='back'
                barCodeScannerSettings={{
                    barCodeTypes: ["qr"],
                }}
                onBarcodeScanned={scanHandler}
            >
                <View style={{ flexDirection: 'row', marginTop: 90, marginHorizontal: -60 }}>

                    <View style={styles.barcodeGuideline} />
                    <View style={styles.barcodeGuideline} />

                </View>
                <View style={{ flexDirection: 'row', marginTop: -4, marginHorizontal: -100 }}>

                    <View style={styles.barcodeGuideline1} />
                    <View style={styles.barcodeGuideline1} />

                </View>


                <View style={{ flexDirection: 'row', marginTop: 200, marginHorizontal: -100 }}>

                    <View style={styles.barcodeGuideline1} />
                    <View style={styles.barcodeGuideline1} />

                </View>
                <View style={{ flexDirection: 'row', marginTop: -4, marginHorizontal: -60 }}>

                    <View style={styles.barcodeGuideline} />
                    <View style={styles.barcodeGuideline} />

                </View>
            </CameraView>
        </View>
    )
}

export default Scanner