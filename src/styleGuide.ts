import { Dimensions } from 'react-native';

const styleGuide = {
  spacing: 8,
  seperatorHeight: 1,
  dimensionWidth: Dimensions.get('screen').width,
  dimensionHeight: Dimensions.get('screen').height,
  palette: {
    primary: '#0072ff',
    secondary: '#e2e2e2',
    common: {
      white: '#fff',
      black: '#000',
    },
  },
  typography: {
    body: {
      fontFamily: 'Roboto-Regular',
      fontSize: 17,
      lineHeight: 20,
    },
    callout: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      lineHeight: 20,
    },
    callout2: {
      fontFamily: 'Roboto-Regular',
      fontSize: 14,
      lineHeight: 18,
    },
  },
};

export default styleGuide;
