import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Image, Text } from 'react-native';
import { SpatialNavigationRoot } from 'react-tv-space-navigation';
import { scaledPixels } from '@/hooks/useScale';
import { useCallback, useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import FocusablePressable from '@/components/FocusablePressable';
import { lightColors, darkColors } from '@/theme/colors';
import { useColorScheme } from 'react-native';

interface LocalParams extends Record<string, any> {
  title: string;
  description: string;
  movie: string;
  headerImage: string;
}

export default function DetailsScreen() {
  const { title, description, movie, headerImage } = useLocalSearchParams<LocalParams>();

  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState(colorScheme);
  console.log(theme);
  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  let THEME_TYPE = theme === 'dark' ? darkColors : lightColors;

  const styles = useDetailsStyles(THEME_TYPE);
  const router = useRouter();
  const isFocused = useIsFocused();

  const navigate = useCallback(() => {
    router.push({
      pathname: '/player',
      params: {
        movie: movie,
        headerImage: headerImage,
      },
    });
  }, [router, movie, headerImage]);

  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Image source={{ uri: headerImage }} style={styles.backgroundImage} />
        <View style={styles.contentContainer}>
          <View style={styles.topContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{theme}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.bottomContent}>
            <View style={styles.crewContainer}>
              <View style={styles.crewMember}>
                <Text style={styles.crewRole}>Director</Text>
                <Text style={styles.crewName}>Chris Traganos</Text>
              </View>
              <View style={styles.crewMember}>
                <Text style={styles.crewRole}>Executive Producer</Text>
                <Text style={styles.crewName}>Gio Laquidara</Text>
              </View>
              <View style={styles.crewMember}>
                <Text style={styles.crewRole}>Star</Text>
                <Text style={styles.crewName}>Eric Fahsl</Text>
              </View>
            </View>
            <FocusablePressable
              text={'Watch now'}
              onSelect={navigate}
              style={{ paddingHorizontal: scaledPixels(30) }}
            />
          </View>
        </View>
      </View>
    </SpatialNavigationRoot>
  );
}

const useDetailsStyles = function (THEME_TYPE) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME_TYPE.background,
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.3,
    },
    contentContainer: {
      flex: 1,
      padding: scaledPixels(40),
      justifyContent: 'space-between',
    },
    topContent: {
      marginTop: scaledPixels(600),
    },
    bottomContent: {
      marginBottom: scaledPixels(40),
    },
    title: {
      fontSize: scaledPixels(48),
      fontWeight: 'bold',
      color: THEME_TYPE.text,
      marginBottom: scaledPixels(20),
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    description: {
      fontSize: scaledPixels(24),
      color: THEME_TYPE.text,
      marginBottom: scaledPixels(20),
      width: '60%',
      lineHeight: scaledPixels(32),
    },
    crewContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: scaledPixels(30),
    },
    crewMember: {
      marginRight: scaledPixels(40),
      marginBottom: scaledPixels(15),
    },
    crewRole: {
      fontSize: scaledPixels(16),
      color: '#aaa',
      fontWeight: '600',
    },
    crewName: {
      fontSize: scaledPixels(24),
      color: THEME_TYPE.text,
      fontWeight: 'bold',
    },
    watchButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      paddingVertical: scaledPixels(15),
      paddingHorizontal: scaledPixels(30),
      borderRadius: scaledPixels(5),
      alignSelf: 'flex-start',
    },
    watchButtonFocused: {
      backgroundColor: THEME_TYPE.background,
    },
    watchButtonText: {
      color: THEME_TYPE.text,
      fontSize: scaledPixels(18),
      fontWeight: 'bold',
    },
    watchButtonTextFocused: {
      color: THEME_TYPE.text,
      fontSize: scaledPixels(18),
      fontWeight: 'bold',
    },
  });
};
