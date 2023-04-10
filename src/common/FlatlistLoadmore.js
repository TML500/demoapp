import { FlatList } from 'react-native'
import React, { useState } from 'react'

const FlatlistLoadmore = ({ data = [], pageSize = 20, renderItem, ...props }) => {
    const [skip, setSkip] = useState(pageSize)
    const onLoadMore = () => {
        if (skip > data?.length) {
            setSkip(prev => prev + pageSize)
        }
    }
    return (
        <FlatList
            data={data.slice(0, skip)}
            renderItem={renderItem}
            keyExtractor={(item, index) => `renderItem${index}`}
            onEndThreshold={16}
            onEndReached={onLoadMore}
            {...props}
        />
    )
}

export default FlatlistLoadmore