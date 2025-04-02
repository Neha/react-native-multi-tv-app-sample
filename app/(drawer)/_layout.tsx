import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { SpatialNavigationRoot } from 'react-tv-space-navigation';
import { Direction } from '@bam.tech/lrud';
import { DrawerActions } from '@react-navigation/native';
import { useMenuContext } from '../../components/MenuContext';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import { scaledPixels } from '@/hooks/useScale';
import { lightColors, darkColors } from '@/theme/colors';
import { useColorScheme } from 'react-native';

export default function DrawerLayout() {
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  console.log(theme);
  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  let THEME_TYPE = theme === 'dark' ? darkColors : lightColors;

  const styles = useDrawerStyles(THEME_TYPE);

  console.log('isMenuOpen:', isMenuOpen);

  const onDirectionHandledWithoutMovement = useCallback(
    (movement: Direction) => {
      console.log('Direction ' + movement);
      if (movement === 'right') {
        navigation.dispatch(DrawerActions.closeDrawer());
        toggleMenu(false);
      }
    },
    [toggleMenu, navigation],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SpatialNavigationRoot
        isActive={isMenuOpen}
        onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
      >
        <Drawer
          drawerContent={CustomDrawerContent}
          defaultStatus="open"
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: THEME_TYPE.background,
            drawerActiveTintColor: '#ffffff',
            drawerInactiveTintColor: '#bdc3c7',
            drawerStyle: styles.drawerStyle,
            drawerLabelStyle: styles.drawerLabelStyle,
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Home',
              title: 'index',
            }}
          />
          <Drawer.Screen
            name="explore"
            options={{
              drawerLabel: 'Explore',
              title: 'explore',
            }}
          />
          <Drawer.Screen
            name="tv"
            options={{
              drawerLabel: 'TV',
              title: 'tv',
            }}
          />
        </Drawer>
      </SpatialNavigationRoot>
    </GestureHandlerRootView>
  );
}

const useDrawerStyles = function (THEME_TYPE) {
  return StyleSheet.create({
    drawerStyle: {
      width: scaledPixels(300),
      backgroundColor: THEME_TYPE.background,
      paddingTop: scaledPixels(0), // Add some top padding
    },
    drawerLabelStyle: {
      fontSize: scaledPixels(18),
      fontWeight: 'bold',
      marginLeft: scaledPixels(10), // Add some left margin
    },
  });
};
