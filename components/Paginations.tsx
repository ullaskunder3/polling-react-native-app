import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useState, useEffect } from "react";

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

export const Paginations = (props) => {
    const {
        totalRecords,
        pageLimit,
        pageNeighbours,
        onPageChanged,
        currentPage
    } = props;

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setTotalPages(Math.ceil(totalRecords / pageLimit));
    }, [setTotalPages]);

    const fetchPageNumbers = () => {
        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

            let pages = range(startPage, endPage);

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = totalPages - endPage > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                case hasLeftSpill && !hasRightSpill: {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [...extraPages];
                    break;
                }
                case hasLeftSpill && hasRightSpill:
                default: {
                    pages = [...pages];
                    break;
                }
            }
            return [1, ...pages, totalPages];
        }
        return range(1, totalPages);
    };

    const pages = fetchPageNumbers() || [];

    return (
        <View style={styles.scrollViewContainer}>
            <ScrollView
                horizontal
                contentContainerStyle={styles.scrollViewStyle}>
                {pages.map((page, index) => {
                    return (
                        <View
                            style={[styles.paginationPages, { backgroundColor: currentPage === page ? "#a1d1f150" : undefined }]}
                            key={index}>
                            <TouchableOpacity
                                onPress={(e) => {
                                    console.log('got clicked', page);
                                    onPageChanged(e, page)
                                }}>
                                <Text style={styles.paginationPagesText} >{page}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        flexDirection: 'row',
        paddingVertical: 20,
        marginHorizontal: 20
    },
    scrollViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
    },
    paginationPages: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 10,
        borderRadius: 50,
    },
    paginationPagesText: {
        fontSize: 15,
        color: '#1b2a69',
        fontWeight: 'bold'
    }
})

export default Paginations;
