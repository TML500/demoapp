import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import AntDesign from 'react-native-vector-icons/AntDesign'

const HeaderPage = ({ currentDate, changeState }) => {
    const month = moment(currentDate).format('MMMM');
    const year = moment(currentDate).format('YYYY')
    const nextMonth = () => {
        const newDate = moment(currentDate).add(1, 'month').toDate()
        changeState('currentDate', newDate)
    }
    const previousMonth = () => {
        const newDate = moment(currentDate).subtract(1, 'month').toDate()
        changeState('currentDate', newDate)
    }
    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={previousMonth}
                style={styles.btn}>
                <AntDesign name="left" size={18} color="#222B45" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerContent}>
                <Text style={styles.nameMonth}>{month}</Text>
                <Text style={styles.nameYear}>{year}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={nextMonth}
                style={styles.btn}>
                <AntDesign name="right" size={18} color="#222B45" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    btn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CED3DE',
        borderRadius: 10
    },
    headerContent: {
        alignItems: 'center'
    },
    nameMonth: {
        fontSize: 20,
        color: '#222B45',
    },
    nameYear: {
        fontSize: 12,
        color: '#8F9BB3'
    }
})

export default HeaderPage