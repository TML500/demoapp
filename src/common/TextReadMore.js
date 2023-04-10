import React, { useState } from 'react';
import { Text, View } from 'react-native';

const TextReadMore = ({ text, numberOfLines, textStyles }) => {
    const [showAll, setShowAll] = useState(false);
    const [numLines, setNumLines] = useState(0);

    const toggleShowAll = () => setShowAll(!showAll);

    const handleTextLayout = (e) => {
        setNumLines(e.nativeEvent.lines.length);
    };

    return (
        <View style={{ flexDirection: showAll ? 'column' : 'row' }}>
            <Text
                onTextLayout={handleTextLayout}
                numberOfLines={showAll ? undefined : numberOfLines}
                style={[{ flex: 1 }, textStyles]}
            >
                {text}
            </Text>
            {numLines > numberOfLines && (
                <Text style={{ textDecorationLine: 'underline' }} onPress={toggleShowAll}>
                    {showAll ? 'View less' : 'View more'}
                </Text>
            )}
        </View>
    );
};

export default TextReadMore;