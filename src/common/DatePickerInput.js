import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import Fontisto from 'react-native-vector-icons/Fontisto'
const DatePickerInput = ({ value, onSelect, ...props }) => {
    const [openPicker, setOpenPicker] = useState(false)
    const renderFormat = () => {
        switch (props.mode) {
            case 'date': return 'DD/MM/YYYY'
            case 'datetime': return 'DD/MM/YYYY HH:mm:ss'
            case 'time': return 'HH:mm'
            default: return 'DD/MM/YYYY'
        }
    }
    return (
        <>
            <Pressable
                style={[{
                    borderWidth: 1,
                    borderColor: '#EDF1F7',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 8,
                    flex: 1,

                }, props.inputClass]}
                onPress={() => setOpenPicker(true)}>
                <Text style={{ color: !value ? '#8F9BB3' : null }}>{value ? moment().format(renderFormat()) : props.placeholder || 'Date'}</Text>
                {props?.icon || <Fontisto name='date' size={20} />}
            </Pressable>
            <DatePicker
                modal
                open={openPicker}
                date={value || new Date()}
                mode={props.mode || 'date'}
                onConfirm={(date) => {
                    setOpenPicker(false)
                    onSelect(date)
                }}
                onCancel={() => {
                    setOpenPicker(false)
                }}
            />
        </>
    )
}

export default DatePickerInput