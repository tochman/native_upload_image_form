import { StyleSheet } from 'react-native'

export const globals = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: 10,
    borderColor: '#333',
    borderWidth: 1,
    marginVertical: 10
  },
  body: {
    fontSize: 15,
  },
  errorMessage: {
    color: 'crimson'
  },
  h1: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})