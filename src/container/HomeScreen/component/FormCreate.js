import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InputAutoHeight, DatePickerInput } from '.././../../common'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { dataCategory } from '../storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEYSTORAGE } from '../../../utils'
import moment from 'moment'

const FormCreate = ({ onClose, onRefresh, currentItem }) => {
    const [state, setState] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (currentItem) {
            setState({
                ...currentItem,
                date: moment(currentItem.date).toDate(),
                start_time: moment(currentItem.start_time).toDate(),
                end_time: moment(currentItem.end_time).toDate()
            })
        }
    }, [currentItem])

    const changeState = (field, value) => {
        setState(prev => ({ ...prev, [field]: value }))
    }
    const onSaveForm = async () => {
        const errors = validateForm()
        if (!errors.length) {
            if (currentItem) {
                onUpdateData()
            } else {
                onCreateData()
            }
        } else {
            setError(true)
            Alert.alert('Error', 'Please enter enough information')
        }
    }

    const onUpdateData = async () => {
        setLoading(true)
        let dataLocal = await AsyncStorage.getItem(`${KEYSTORAGE.MONTH_DATA}_${moment(state.date).format('MM-YYYY')}`)
        if (dataLocal) {
            dataLocal = JSON.parse(dataLocal)
        } else {
            dataLocal = []
        }
        const day = moment(state.date).get('day')
        const month = moment(state.date).get('month')
        const year = moment(state.date).get('year')
        const dataForm = {
            ...state,
            id: Math.random().toString(36) + moment(state.date).format('MM-YYYY'),
            start_time: moment(state.start_time).day(day).month(month).year(year),
            end_time: moment(state.end_time).day(day).month(month).year(year),
        }
        const newData = dataLocal.map(i => {
            if (i.id === currentItem.id) {
                return dataForm
            }
            return i
        })
        await AsyncStorage.setItem(
            `${KEYSTORAGE.MONTH_DATA}_${moment(state.date).format('MM-YYYY')}`,
            JSON.stringify(newData)
        )
        setLoading(false)
        onClose(false)
        onRefresh()
    }

    const onCreateData = async () => {
        setLoading(true)
        let dataLocal = await AsyncStorage.getItem(`${KEYSTORAGE.MONTH_DATA}_${moment(state.date).format('MM-YYYY')}`)
        if (dataLocal) {
            dataLocal = JSON.parse(dataLocal)
        } else {
            dataLocal = []
        }
        const day = moment(state.date).get('day')
        const month = moment(state.date).get('month')
        const year = moment(state.date).get('year')
        const dataForm = {
            ...state,
            id: Math.random().toString(36) + moment(state.date).format('MM-YYYY'),
            start_time: moment(state.start_time).day(day).month(month).year(year),
            end_time: moment(state.end_time).day(day).month(month).year(year),
        }
        const newData = [...dataLocal, dataForm].sort((a, b) => moment(a.date).isBefore(b.date) ? -1 : 1)
        await AsyncStorage.setItem(
            `${KEYSTORAGE.MONTH_DATA}_${moment(state.date).format('MM-YYYY')}`,
            JSON.stringify(newData)
        )
        setLoading(false)
        onClose(false)
        onRefresh()
    }

    const onDeleteEvent = () => {
        Alert.alert('Warning', 'Are you sure you want to delete this event?', [
            { text: 'No' },
            {
                text: 'Yes', onPress: async () => {
                    let dataLocal = await AsyncStorage.getItem(`${KEYSTORAGE.MONTH_DATA}_${moment(state.date).format('MM-YYYY')}`)
                    if (dataLocal) {
                        dataLocal = JSON.parse(dataLocal)
                    } else {
                        dataLocal = []
                    }
                    const newData = dataLocal.filter(i => i.id !== currentItem.id)
                    await AsyncStorage.setItem(
                        `${KEYSTORAGE.MONTH_DATA}_${moment(state.date).format('MM-YYYY')}`,
                        JSON.stringify(newData)
                    )
                    onClose(false)
                    onRefresh()
                }
            }
        ])
    }

    const validateForm = () => {
        const arrayError = [
            { key: 'name', message: 'Please enter name' },
            { key: 'date', message: 'Please select a date' },
            { key: 'start_time', message: 'Please choose a start time' },
            { key: 'end_time', message: 'Please choose a end time' },
        ]
        let error = []
        arrayError.forEach(i => {
            if (!state[i.key]) {
                error.push(i)
            }
        })
        return error
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{}}>
                    <Text style={styles.title}>Add New Event</Text>
                </View>
                <View style={styles.formGroup}>
                    <TextInput
                        style={[styles.formControl, error && !state?.name ? { borderWidth: 1, borderColor: 'red' } : {}]}
                        placeholder='Event name*'
                        value={state?.name || ''}
                        onChangeText={e => {
                            changeState('name', e)
                        }}
                    />
                </View>
                <View style={styles.formGroup}>
                    <InputAutoHeight
                        textInputStyle={styles.formControl}
                        placeholder='Type the note here...'
                        value={state.note}
                        onChangeText={e => {
                            changeState('note', e)
                        }}
                    />
                </View>
                <View style={styles.formGroup}>
                    <DatePickerInput
                        value={state.date}
                        onSelect={e => {
                            changeState('date', e)
                        }}
                        inputClass={error && !state?.date ? { borderWidth: 1, borderColor: 'red' } : {}}
                    />
                </View>
                <View style={[{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 16,
                    marginTop: 16,
                }]}>
                    <DatePickerInput
                        value={state.start_time}
                        onSelect={e => {
                            changeState('start_time', e)
                        }}
                        placeholder='Start time'
                        inputClass={[{ marginRight: 6 }, error && !state?.start_time ? { borderWidth: 1, borderColor: 'red' } : {}]}
                        icon={<AntDesign name='clockcircleo' size={20} />}
                        mode='time'
                    />
                    <DatePickerInput
                        value={state.end_time}
                        onSelect={e => {
                            changeState('end_time', e)
                        }}
                        placeholder='End time'
                        inputClass={[{ marginRight: 6 }, error && !state?.end_time ? { borderWidth: 1, borderColor: 'red' } : {}]}
                        icon={<AntDesign name='clockcircleo' size={20} />}
                        mode='time'
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 16,
                    marginTop: 16,
                }}>
                    <Text style={{ color: '#222B45' }}>Reminds me</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={state.is_reminds ? '#ffffff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(e) => {
                            changeState('is_reminds', state.is_reminds ? false : true)
                        }}
                        value={state.is_reminds}
                    />
                </View>
                <View style={{
                    marginHorizontal: 16,
                    marginTop: 16,
                    flex: 1
                }}>
                    <Text style={{ fontSize: 17, fontWeight: 500 }}>Select Catgeory</Text>
                    <View style={{ flex: 1, marginTop: 8 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {dataCategory.map((item, index) => {
                                const isActive = item.key === state?.category?.key
                                return (
                                    <TouchableOpacity
                                        key={`item-category=${index}`}
                                        style={[styles.btnCategory, {
                                            backgroundColor: `${item.bgColor}`,
                                            borderWidth: isActive ? 2 : 0,
                                            borderColor: '#735BF2'
                                        }]}
                                        onPress={() => {
                                            if (isActive) {
                                                changeState('category', null)
                                            } else {
                                                changeState('category', item)
                                            }
                                        }}
                                    >
                                        <View style={[styles.badge, { borderColor: item.color }]} />
                                        <Text style={{ fontWeight: '500', marginLeft: 6 }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={onSaveForm}
                        style={styles.btnSubmit}>
                        {loading ? <ActivityIndicator /> :
                            <Text style={styles.textSubmit}>Create Event</Text>
                        }
                    </TouchableOpacity>
                    {currentItem?.id &&
                        <TouchableOpacity
                            onPress={onDeleteEvent}
                            style={[styles.btnSubmit, { backgroundColor: '#f66' }]}>
                            {loading ? <ActivityIndicator /> :
                                <Text style={styles.textSubmit}>Delete Event</Text>
                            }
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontWeight: '500',
        fontSize: 20,
        textAlign: 'center'
    },
    formGroup: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    formControl: {
        borderWidth: 1,
        borderColor: '#EDF1F7',
        borderRadius: 8,
        paddingHorizontal: 8
    },
    btnCategory: {
        marginRight: 16,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    badge: {
        width: 10,
        height: 10,
        borderRadius: 10,
        borderWidth: 2,
    },
    btnSubmit: {
        flex: 1,
        backgroundColor: '#735BF2',
        marginHorizontal: 16,
        marginTop: 18,
        paddingVertical: 14,
        borderRadius: 8
    },
    textSubmit: {
        textAlign: 'center',
        fontWeight: '600',
        color: 'white',
    }
})
export default FormCreate