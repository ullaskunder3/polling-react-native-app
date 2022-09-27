import { View, Text, FlatList, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Paginations from '../components/Paginations';
import { useNavigation } from '@react-navigation/native';

export const TableDataLabel = ({ tabelHeadings }: { tabelHeadings: { title: string, url: string, createdAt: string, author: string } }) => {

    const { title, url, createdAt, author } = tabelHeadings

    return (
        <View style={styles.tableHeading}>
            <View style={[styles.tableCol, styles.tableFirstCol]}>
                <Text style={[styles.tableHeadingText, styles.tableHeadingText]}>{title}</Text>
            </View>
            <View style={styles.tableCol}>
                <Text style={[styles.tableContentLink, styles.tableHeadingText]}>
                    {url}
                </Text>
            </View>
            <View style={[styles.tableCol, { alignItems: 'center' }]}>
                <Text style={[styles.tableHeadingText, styles.tableHeadingText]}>{createdAt}</Text>
            </View>
            <View style={[styles.tableCol, styles.tableLastCol]}>
                <Text style={[styles.tableHeadingText, styles.tableHeadingText]}>{author}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tableContainer: {
        flex: 1,
        alignItems: 'center',
    },
    tableHeading: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#021847',
    },
    tableHeadingText:{
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
        textTransform: 'uppercase'
    },
    tableContent: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: '#f3f3f3',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    loadingStyle: {
        marginTop: 300,
        fontSize: 30
    },
    tableContentLink: {
        fontSize: 15,
        textAlign: 'center'
    },
    tableCol: {
        width: 100,
        paddingVertical: 10,
        paddingHorizontal: 2,
    },
    tableFirstCol: {
        paddingLeft: 0,
        paddingRight: 5,
    },
    tableLastCol: {
        paddingRight: 0,
        paddingLeft: 5,
    }
})