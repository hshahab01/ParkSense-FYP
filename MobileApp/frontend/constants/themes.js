import * as React from 'react';
import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';
import { Platform } from 'react-native';
import { useFonts } from 'expo-font';

export const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    // colors: {
    "colors": {
        "primary": "rgb(141, 53, 174)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(249, 216, 255)",
        "onPrimaryContainer": "rgb(51, 0, 69)",
        "secondary": "rgb(74, 103, 0)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(189, 244, 71)",
        "onSecondaryContainer": "rgb(20, 31, 0)",
        "tertiary": "rgb(130, 82, 79)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(255, 218, 215)",
        "onTertiaryContainer": "rgb(51, 17, 16)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(255, 251, 255)",
        "onBackground": "rgb(30, 27, 30)",
        "surface": "rgb(255, 251, 255)",
        "onSurface": "rgb(30, 27, 30)",
        "surfaceVariant": "rgb(235, 223, 233)",
        "onSurfaceVariant": "rgb(76, 68, 77)",
        "outline": "rgb(125, 116, 125)",
        "outlineVariant": "rgb(207, 195, 205)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(51, 47, 51)",
        "inverseOnSurface": "rgb(247, 239, 243)",
        "inversePrimary": "rgb(238, 177, 255)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(249, 241, 251)",
            "level2": "rgb(246, 235, 249)",
            "level3": "rgb(243, 229, 246)",
            "level4": "rgb(241, 227, 245)",
            "level5": "rgb(239, 223, 244)"
        },
        "surfaceDisabled": "rgba(30, 27, 30, 0.12)",
        "onSurfaceDisabled": "rgba(30, 27, 30, 0.38)",
        "backdrop": "rgba(53, 46, 54, 0.4)",
        "white": "rgb(252,252,252)",
        "black": "rgb(29,29,29)"
    },
    "fonts": configureFonts({
        config: {
            fontFamily: Platform.select({
                web: "Quicksand, Ubuntu",
                ios: 'System',
                // android: "Quicksand, Ubuntu", 
                default: 'sans-serif',
                // default: 'Quicksand_300Light, Quicksand_400Regular, Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_700Bold'
            }),
        }
    }),

};

