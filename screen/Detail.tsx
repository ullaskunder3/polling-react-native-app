import {View, Text } from 'react-native';

export const Detail = ({route})=>{
    const { item } = route.params
    return(
        <View>
            <Text>
                {JSON.stringify(item, null, 2)}
            </Text>
        </View>
    )
}