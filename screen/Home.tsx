import { View, Text, FlatList, StyleSheet, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import fetchPollingData from '../api/fetchData';
import Paginations from '../components/Paginations';

export const Home = () => {
    const [data, setData] = useState<object[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageLimit, setPageLimit] = useState<number>(20);

    const onPageChanged = useCallback(
        (event, page) => {
            event.preventDefault();
            setCurrentPage(page);
        },
        [setCurrentPage]
    );
    const currentData = data.slice(
        (currentPage - 1) * pageLimit,
        (currentPage - 1) * pageLimit + pageLimit
    );

    useEffect(() => {
        fetchPollingData(0)
            .then(res => {
                setIsLoading(true);
                return res.hits;
            })
            .then(body => {
                setData(prevState => [...prevState, ...body])
                setIsLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    const createShortString = (str: string) => {
        if (str != undefined) {
            return str.length < 5 ? str : str.substring(0, 20) + '...'
        }
    }

    const parseDateStamp = (created_at: string) => {
        const dateOptions: any = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };
        const myDate = new Date(created_at);

        return myDate.toLocaleDateString('en-US', dateOptions);
    }

    const renderItem = ({ item }) => {
        const { title, url, created_at, author } = item

        const newShortTitle = createShortString(title)
        const urlDomain = url?.split('/')[2];
        const newShorAuther = createShortString(author)

        const newCreatedAt = parseDateStamp(created_at);

        return (
            <View style={styles.tableContent}>
                <View style={[styles.tableCol, styles.tableFirstCol]}>
                    <Text>{newShortTitle}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text
                        style={styles.tableContentLink}
                        onPress={() => Linking.openURL(url)}>
                        {urlDomain ? urlDomain : 'unavailable'}
                    </Text>
                </View>
                <View style={[styles.tableCol, { alignItems: 'center' }]}>
                    <Text>{newCreatedAt}</Text>
                </View>
                <View style={[styles.tableCol, styles.tableLastCol]}>
                    <Text>{newShorAuther}</Text>
                </View>
            </View>
        )
    }
    const RenderData = ({ data }) => {
        return (
            <FlatList
                data={currentData}
                renderItem={renderItem}
                ListFooterComponent={
                    <Paginations
                    totalRecords={data.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    onPageChanged={onPageChanged}
                    currentPage={currentPage}
                />
                }
                keyExtractor={(item, index) => index.toString()} />
        )
    }

    const idxOfLastData = currentPage * pageLimit
    const idxOfFirstData = idxOfLastData - pageLimit;
    // const currentData = data.slice(idxOfFirstData, idxOfLastData)    

    return (
        <View style={styles.tableContainer}>

            <View style={styles.tableHeading}>
                <View style={[styles.tableCol, styles.tableFirstCol]}>
                    <Text>Title</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableContentLink}>
                        Url
                    </Text>
                </View>
                <View style={[styles.tableCol, { alignItems: 'center' }]}>
                    <Text>Created At</Text>
                </View>
                <View style={[styles.tableCol, styles.tableLastCol]}>
                    <Text>Author</Text>
                </View>
            </View>

            <RenderData data={data} />

            <StatusBar style="auto" hidden />
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
    tableContent: {
        flexDirection: 'row',
        backgroundColor: '#f3f3f3'
    },
    loadingStyle: {
        marginTop: 300,
        fontSize: 30
    },
    tableContentLink: {
        color: 'blue',
        fontSize: 10,
        textAlign: 'center'
    },
    tableCol: {
        width: 100,
        paddingVertical: 10,
        paddingHorizontal: 2,
        borderRightColor: '#55555585',
        borderRightWidth: .5
    },
    tableFirstCol: {
        paddingLeft: 0,
        paddingRight: 5,
    },
    tableLastCol: {
        paddingRight: 0,
        paddingLeft: 5,
        borderRightColor: undefined,
        borderRightWidth: 0
    }
})