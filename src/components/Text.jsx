import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.white,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  colorBackground: {
    backgroundColor: theme.backgroundColors.bgPrimary,
    borderRadius: 45 / 10,
    alignSelf: 'flex-start',
    padding: 5,
    marginTop: 10,
    marginBottom: 8,
  },
  textAlignment: {
    textAlign: theme.textAlignment.textCenter
  }
});

const Text = ({ color, fontSize, fontWeight, backgroundColor, textAlign, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'white' && styles.colorWhite,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    backgroundColor === 'primary' && styles.colorBackground,
    textAlign === 'center' && styles.textAlignment,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;