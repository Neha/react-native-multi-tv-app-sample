import React, { useState, useEffect, useMemo } from 'react';
import { Pressable, Text, StyleSheet, PressableProps, ViewStyle } from 'react-native';
import { scaledPixels } from '@/hooks/useScale';
import { SpatialNavigationFocusableView } from 'react-tv-space-navigation';
import { lightColors, darkColors } from '@/theme/colors';
import { useColorScheme } from 'react-native';

interface CustomPressableProps extends PressableProps {
  text: string;
  onSelect: () => void;
  style?: ViewStyle;
}

const FocusablePressable = ({ text, onSelect, style, ...props }: CustomPressableProps) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);

  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  const THEME_TYPE = theme === 'dark' ? darkColors : lightColors;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        watchButton: {
          backgroundColor: THEME_TYPE.background,
          paddingVertical: scaledPixels(15),
          borderRadius: scaledPixels(5),
          alignItems: 'center',
          alignSelf: 'flex-start',
        },
        watchButtonFocused: {
          backgroundColor: THEME_TYPE.focusedBg,
        },
        watchButtonText: {
          color: THEME_TYPE.text,
          fontSize: scaledPixels(18),
          fontWeight: 'bold',
        },
        watchButtonTextFocused: {
          color: THEME_TYPE.focusedText,
          fontSize: scaledPixels(18),
          fontWeight: 'bold',
        },
      }),
    [THEME_TYPE],
  );

  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused }) => (
        <Pressable
          {...props}
          style={[styles.watchButton, isFocused && styles.watchButtonFocused, style]}
          onPress={onSelect}
        >
          <Text style={isFocused ? styles.watchButtonTextFocused : styles.watchButtonText}>{text}</Text>
        </Pressable>
      )}
    </SpatialNavigationFocusableView>
  );
};

export default FocusablePressable;
