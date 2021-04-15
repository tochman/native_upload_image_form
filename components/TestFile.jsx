import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import * as testData from '../assets/measurementsFixture.json'
import { globals } from '../styles/globals'

const TestFile = () => {

  return (
    <View style={styles.formContainer}>
      <Text style={globals.h1}>Your Measurements</Text>
      <FlatList
        data={testData.body.result.metrics.surfaceLengths.filter(item => item.length)}

        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.listItem}>{item.label}</Text>
            <Text style={[styles.listItem, styles.length]}>{(item.length * 100).toFixed(1)} cm</Text>
          </View>
        )}
      />
    </View>
  )
}

export default TestFile

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 25
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: '#333',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    marginHorizontal: 15,
    marginVertical: 10,
    flex: 3
  },
  length: {
    fontWeight: 'bold',
    flex: 1,
  }
})
