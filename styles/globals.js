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
    color: 'crimson',
    marginVertical: 5,
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  }
})