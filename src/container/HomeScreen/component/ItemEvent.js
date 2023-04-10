import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import { TextReadMore } from '../../../common'


const ItemEvent = ({ item, index, onClick }) => {
  return (
    <TouchableOpacity
      onPress={() => onClick(item)}
      style={styles.item}>
      <View style={styles.row}>
        <View style={[styles.badge, { borderColor: item.category.color }]} />
        <Text style={styles.dateText}>{moment(item.date).format('DD/MM')} {moment(item.start_time).format('HH:mm')}-{moment(item.end_time).format('HH:mm')}</Text>
      </View>
      <Text numberOfLines={1} style={styles.nameText}>{item.name}</Text>
      <TextReadMore
        text={item.note}
        numberOfLines={1}
        textStyles={styles.noteText}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 18,
    marginVertical: 8,
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 16,
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  dateText: {
    fontSize: 12,
    flex: 1,
    marginLeft: 12,
    color: '#8F9BB3'
  },
  nameText: {
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
    lineHeight: 19,
    marginTop: 4
  },
  noteText: {
    fontSize: 12,
    color: '#8F9BB3',
    marginTop: 2
  },
})

export default ItemEvent