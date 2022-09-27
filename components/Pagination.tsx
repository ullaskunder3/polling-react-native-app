import {View, Text, StyleSheet} from 'react-native'
export const Pagination = ({dataPerPage, tableData})=>{
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(tableData / dataPerPage); i++) {
        pageNumber.push(i);
    }
    return(
        <View style={style.paginationContainer}>
            {
                pageNumber.map((number, idx)=>{
                    return(
                        <View key={idx} style={style.paginationItem}>
                            <Text style={style.paginationItemText}>{number}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}
const style = StyleSheet.create({
    paginationContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    paginationItem:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#d6d6d66c',
        borderRadius: 50,
        marginHorizontal: 10
    },
    paginationItemText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3f5bd6'
    }
    
})