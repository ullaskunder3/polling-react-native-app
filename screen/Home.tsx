import { View, Text, FlatList, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import fetchPollingData from '../api/fetchData';
import Paginations from '../components/Paginations';

export const Home = ({ navigation }) => {
    const [data, setData] = useState<object[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const PAGELIMIT = 20
    let counter = 0 

    useEffect(() => {

        // will run once on mount
        apiCall(counter);

        // after 10 seconds 
        const interval = setInterval(() => {
            apiCall(counter);
        }, 10000);

        return () => clearInterval(interval);
    }, [])

    const apiCall = (page: number) => {
        
        fetchPollingData(page)
        .then(res => {
            console.log("fetched with", page, counter);
            
            setIsLoading(true);
            counter++;
            return res.hits;
        })
        .then(body => {
            setData(prevState => [...prevState, ...body])
            setIsLoading(false)
        })
        .catch(error => console.log(error))
    }

    const onPageChanged = useCallback((e, page) => {
        e.preventDefault();
        setCurrentPage(page);
    }, [currentPage]);

    const currentData = data.slice(
        (currentPage - 1) * PAGELIMIT,
        (currentPage - 1) * PAGELIMIT + PAGELIMIT
    );

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
    const OnRowClickHandler = (item) => {
        navigation.navigate('Detail', { item })
    }

    const renderItem = ({ item }) => {
        const { title, url, created_at, author } = item

        const newShortTitle = createShortString(title)
        const urlDomain = url?.split('/')[2];
        const newShorAuther = createShortString(author)

        const newCreatedAt = parseDateStamp(created_at);

        return (
            <TouchableOpacity style={styles.tableContent} onPress={() => OnRowClickHandler(item)}>
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
            </TouchableOpacity>
        )
    }
    const RenderData = ({ data }) => {
        if (isLoading) {
            return (
                <Text style={{ marginTop: 300 }}>Loading...</Text>
            )
        } else {
            return (
                <FlatList
                    nestedScrollEnabled
                    data={currentData}
                    renderItem={renderItem}
                    ListFooterComponent={
                        <Paginations
                            totalRecords={data.length}
                            pageLimit={PAGELIMIT}
                            pageNeighbours={2}
                            onPageChanged={onPageChanged}
                            currentPage={currentPage} />
                    }
                    keyExtractor={(item, index) => index.toString()} />
            )
        }
    }
    const TableDataLabel = ({ tabelHeadings }: { tabelHeadings: { title: string, url: string, createdAt: string, author: string } }) => {

        const { title, url, createdAt, author } = tabelHeadings

        return (
            <View style={styles.tableHeading}>
                <View style={[styles.tableCol, styles.tableFirstCol]}>
                    <Text>{title}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableContentLink}>
                        {url}
                    </Text>
                </View>
                <View style={[styles.tableCol, { alignItems: 'center' }]}>
                    <Text>{createdAt}</Text>
                </View>
                <View style={[styles.tableCol, styles.tableLastCol]}>
                    <Text>{author}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.tableContainer}>

            <TableDataLabel tabelHeadings={{ title: "Title", url: "Url", createdAt: "Created At", author: "Author" }} />
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