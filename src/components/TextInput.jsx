import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.grey,
  },
  colorSecondary: {
    borderColor: theme.colors.error,
  }
});

const TextInput = ({ style, error, ...props }) => { //eslint-disable-line
  const textInputStyle = [
    styles.textInput,
    error && styles.colorSecondary,
    style
  ]

  return <NativeTextInput style={textInputStyle} {...props} />
};

export default TextInput