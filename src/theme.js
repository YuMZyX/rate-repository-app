import { Platform } from "react-native";

const theme = {
  roundness: 3,
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: 'white',
    grey: 'grey',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  backgroundColors: {
    bgWhite: 'white',
    bgPrimary: '#0366d6',
    bgMain: '#e1e4e8',
    bgAppBar: '#24292e',
    bgDefault: '#efefef',
  },
  textAlignment: {
    textCenter: 'center'
  }
};

export default theme;