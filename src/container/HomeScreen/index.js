import { View, Text, SafeAreaView, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { HeaderPage, ItemEvent, FormCreate } from './component'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEYSTORAGE } from '../../utils'
import { FlatlistLoadmore } from '../../common'
import { dataCategory } from './storage'
import Icon from 'react-native-vector-icons/AntDesign'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const Component = () => {
  const { width, height } = useWindowDimensions()
  const bottomSheetModalRef = useRef()
  const [state, setState] = useState({
    currentDate: moment().toDate(),
    data: [],
  })

  useEffect(() => {
    getDataStore()
  }, [state.currentDate])

  const getDataStore = async () => { // lấy dữ liệu từ asyncstorege
    const data = await AsyncStorage.getItem(`${KEYSTORAGE.MONTH_DATA}_${moment(state.currentDate).format('MM-YYYY')}`)
    if (data) {
      changeState('data', JSON.parse(data))
    }
  }

  const changeState = (field, value) => { // thay đổi state
    setState(prev => ({ ...prev, [field]: value }))
  }
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <HeaderPage
          currentDate={state.currentDate}
          changeState={changeState}
        />
        <View style={{ flex: 1 }}>
          <FlatlistLoadmore
            data={state.data}
            pageSize={10}
            renderItem={({ item, index }) => {
              return <ItemEvent item={item} index={index} onClick={(item) => {
                setState(prev => ({ ...prev, currentItem: item, }))
                bottomSheetModalRef?.current?.present()
              }} />
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setState(prev => ({ ...prev, currentItem: null }))
            bottomSheetModalRef?.current?.present()
          }}
          style={[styles.btnPosition, { left: (width - 48) / 2 }]}>
          <Icon name='plus' size={30} color='white' />
        </TouchableOpacity>
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        style={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          overflow: 'hidden'
        }}
        handleIndicatorStyle={{ display: 'none', height: 0 }}
        keyboardBehavior='interactive'
        snapPoints={state.currentItem ? ['25%', '85%'] : ['25%', '80%']}
        onDismiss={() => {
          setState(prev => ({ ...prev, currentItem: null }))
        }}
      >
        <FormCreate
          onClose={() => bottomSheetModalRef.current.dismiss()}
          onRefresh={getDataStore}
          currentItem={state.currentItem}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  btnPosition: {
    position: 'absolute',
    bottom: 20,
    height: 48,
    width: 48,
    borderRadius: 48,
    backgroundColor: '#735BF2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }
})

export default Component