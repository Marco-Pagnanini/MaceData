import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const MacerataCrestSmall = () => (
    <Svg width="32" height="32" viewBox="0 0 100 100">
        <Path
            d="M50 10 L20 20 L20 60 Q20 80 50 95 Q80 80 80 60 L80 20 Z"
            fill="#DC2626"
            stroke="#7C2D12"
            strokeWidth="2"
        />
        <Rect x="20" y="20" width="60" height="1.5" fill="#7C2D12" />
        <Rect x="49.25" y="20" width="1.5" height="75" fill="#7C2D12" />
        <Rect x="20" y="57.5" width="60" height="1.5" fill="#7C2D12" />
        <Path
            d="M35 25 L35 35 L30 35 L30 40 L35 40 L35 50 L40 50 L40 40 L45 40 L45 35 L40 35 L40 25 Z"
            fill="#F8FAFC"
        />
        <Circle cx="65" cy="37.5" r="10" fill="#F8FAFC" stroke="#DC2626" strokeWidth="3" />
        <Rect x="58" y="36.25" width="14" height="2.5" fill="#DC2626" />
        <Circle cx="35" cy="70" r="10" fill="#F8FAFC" stroke="#DC2626" strokeWidth="3" />
        <Rect x="28" y="68.75" width="14" height="2.5" fill="#DC2626" />
        <Path
            d="M65 60 L65 70 L60 70 L60 75 L65 75 L65 85 L70 85 L70 75 L75 75 L75 70 L70 70 L70 60 Z"
            fill="#F8FAFC"
        />
    </Svg>
);

export default function Index() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('tutti');

    const macerata = {
        latitude: 43.2991,
        longitude: 13.4530,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    const categories = [
        { id: 'tutti', icon: '🗺️', label: 'Tutti' },
        { id: 'parcheggi', icon: '♿', label: 'Parcheggi' },
        { id: 'ospedali', icon: '🏥', label: 'Ospedali' },
        { id: 'monumenti', icon: '🏛️', label: 'Monumenti' },
        { id: 'ristoranti', icon: '🍽️', label: 'Ristoranti' },
        { id: 'farmacie', icon: '💊', label: 'Farmacie' },
        { id: 'negozi', icon: '🏪', label: 'Negozi' },
    ];

    const accessiblePlaces = [
        {
            id: 1,
            coordinate: { latitude: 43.2991, longitude: 13.4530 },
            title: "Piazza della Libertà",
            description: "Accessibile ♿",
        },
        {
            id: 2,
            coordinate: { latitude: 43.3001, longitude: 13.4540 },
            title: "Museo",
            description: "Rampa disponibile ♿",
        },
        {
            id: 3,
            coordinate: { latitude: 43.2981, longitude: 13.4520 },
            title: "Parco pubblico",
            description: "Percorsi accessibili ♿",
        },
    ];

    const handleCategoryPress = (categoryId: string) => {
        setActiveCategory(categoryId);
        console.log('Categoria selezionata:', categoryId);
        // Qui puoi filtrare i marker sulla mappa
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.logoRow}>
                        <MacerataCrestSmall />
                        <Text style={styles.appName}>MaceData</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton} onPress={() => { router.push("/profile") }}>
                        <Text style={styles.profileIcon}>👤</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.welcomeText}>Trova luoghi accessibili</Text>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cerca un luogo..."
                        placeholderTextColor="#94a3b8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Categories Chips */}
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

            {/* Map */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={macerata}
                >
                    {accessiblePlaces.map((place) => (
                        <Marker
                            key={place.id}
                            coordinate={place.coordinate}
                            title={place.title}
                            description={place.description}
                            pinColor="#DC2626"
                        />
                    ))}
                </MapView>
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
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
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
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
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
    },
    chipActive: {
        backgroundColor: '#DC2626',
        borderColor: '#DC2626',
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
