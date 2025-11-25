import { Colors } from '@/constants/theme';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Region } from 'react-native-maps';



export default function Index() {
    const [activeCategory, setActiveCategory] = useState('tutti');
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [myCoords, setMyCoords] = useState<Region>()
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const macerata = {
        latitude: 43.2991,
        longitude: 13.4530,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    const categories = [
        { id: 'tutti', icon: '🗺️', label: 'Tutti' },
        { id: 'coding', icon: '⌨️', label: 'Coding' },
        { id: 'ai', icon: '🧠', label: 'Ai' },
        { id: 'business', icon: '💸', label: 'Business' },
    ];


    const handleCategoryPress = (categoryId: string) => {
        setActiveCategory(categoryId);
        console.log('Categoria selezionata:', categoryId);
        // Qui puoi filtrare i marker sulla mappa
    };

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setMyCoords({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                longitudeDelta: 0,
                latitudeDelta: 0
            })
        }

        getCurrentLocation();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.logoRow}>
                        {/*<MacerataCrestSmall />*/}
                        <Text style={styles.appName}>Bentornato, Marco,</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton} onPress={() => { router.push("/profile") }}>
                        <Text style={styles.profileIcon}>👤</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Map */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={myCoords}
                >

                </MapView>
            </View>

            {/* Categories Chips - Posizionate sopra la mappa */}
            <View style={styles.chipsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.chipsContent}
                >
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.chip,
                                activeCategory === category.id && styles.chipActive
                            ]}
                            onPress={() => handleCategoryPress(category.id)}
                        >
                            <Text style={styles.chipIcon}>{category.icon}</Text>
                            <Text style={[
                                styles.chipText,
                                activeCategory === category.id && styles.chipTextActive
                            ]}>
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: '#ffffff',
        paddingTop: 60,
        paddingHorizontal: 24,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1e293b',
        marginLeft: 8,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    profileIcon: {
        fontSize: 20,
    },
    welcomeText: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1e293b',
    },
    chipsContainer: {
        position: 'absolute',
        top: 130,
        left: 0,
        right: 0,
        zIndex: 5,
    },
    chipsContent: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 2,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    chipActive: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    chipIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    chipTextActive: {
        color: '#ffffff',
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
