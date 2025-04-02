// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Stack, useNavigation } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { DefaultFocus, SpatialNavigationFocusableView, SpatialNavigationRoot } from 'react-tv-space-navigation';
import { scaledPixels } from '@/hooks/useScale';
import { useMenuContext } from '../../components/MenuContext';
import { DrawerActions, useIsFocused } from '@react-navigation/native';
import { useCallback, useState, useEffect } from 'react';
import { Direction } from '@bam.tech/lrud';
import { lightColors, darkColors } from '@/theme/colors';
import { useColorScheme } from 'react-native';

export default function TVScreen() {
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();
  const isFocused = useIsFocused();
  const isActive = isFocused && !isMenuOpen;
  const navigation = useNavigation();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState(colorScheme);
  console.log(theme);
  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  let THEME_TYPE = theme === 'dark' ? darkColors : lightColors;

  const styles = useTVStyles(THEME_TYPE);

  const onDirectionHandledWithoutMovement = useCallback(
    (movement: Direction) => {
      console.log('Direction ' + movement);
      if (movement === 'left' && focusedIndex === 0) {
        navigation.dispatch(DrawerActions.openDrawer());
        toggleMenu(true);
      }
    },
    [toggleMenu, focusedIndex, navigation],
  );

  return (
    <SpatialNavigationRoot isActive={isActive} onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <DefaultFocus>
          <SpatialNavigationFocusableView>
            <Text style={styles.title}>TV Screen</Text>
          </SpatialNavigationFocusableView>
        </DefaultFocus>
      </View>
    </SpatialNavigationRoot>
  );
}

const useTVStyles = function (THEME_TYPE) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME_TYPE.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: scaledPixels(32),
      fontWeight: 'bold',
      color: THEME_TYPE.text,
      textAlign: 'center',
      marginBottom: scaledPixels(20),
    },
  });
};
