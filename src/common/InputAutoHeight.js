import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const initHeightDefault = 90
const maxHeightDefault = 120
const InputAutoHeight = ({ value, onChangeText, initHeight = initHeightDefault, maxHeight = maxHeightDefault, ...props }) => {
    const [height, setHeight] = useState(initHeight)
    return (
        <TextInput
            multiline={true}
            numberOfLines={props?.numberOfLines || 6}
            onContentSizeChange={(event) =>
                setHeight(event.nativeEvent.contentSize.height)
            }
            style={[props.textInputStyle, {
                height: Math.min(maxHeight, Math.max(initHeight, height)),
                textAlignVertical: 'top'
            }]}
            placeholder={props.placeholder}
            value={value || ''}
            onChangeText={onChangeText}
        />
    )
}

export default InputAutoHeight