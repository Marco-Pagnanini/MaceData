import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

export default function Explore() {
    const [activeCategory, setActiveCategory] = useState('tutti');

    const categories = [
        { id: 'tutti', label: 'Tutti', icon: '🗺️' },
        { id: 'parcheggi', label: 'Parcheggi', icon: '♿' },
        { id: 'cultura', label: 'Cultura', icon: '🏛️' },
        { id: 'ristorazione', label: 'Ristorazione', icon: '🍽️' },
        { id: 'servizi', label: 'Servizi', icon: '🏥' },
    ];

    const places = [
        {
            id: 1,
            name: 'Caffe del Corso',
            category: 'Caffe',
            accessibility: '15+ m',
            distance: '0.5 km',
            rating: 4.8,
            features: ['Rampa', 'Bagno accessibile'],
        },
    ];

    const filteredPlaces = activeCategory === 'tutti'
        ? places
        : places.filter(place => place.category === activeCategory);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.logoRow}>
                        <MacerataCrestSmall />
                        <Text style={styles.appName}>Esplora</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton} onPress={() => { router.push("/profile") }}>
                        <Text style={styles.profileIcon}>👤</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitle}>Scopri luoghi accessibili a Macerata</Text>
            </View>

            {/* Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
                contentContainerStyle={styles.categoriesContent}
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            activeCategory === category.id && styles.categoryButtonActive
                        ]}
                        onPress={() => setActiveCategory(category.id)}
                    >
                        <Text style={styles.categoryIcon}>{category.icon}</Text>
                        <Text style={[
                            styles.categoryText,
                            activeCategory === category.id && styles.categoryTextActive
                        ]}>
                            {category.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Places List */}
            <ScrollView style={styles.placesList} showsVerticalScrollIndicator={false}>
                <Text style={styles.resultsText}>
                    {filteredPlaces.length} luoghi trovati
                </Text>

                {filteredPlaces.map((place) => (
                    <TouchableOpacity key={place.id} style={styles.placeCard}>
                        <View style={styles.placeHeader}>
                            <View style={styles.placeInfo}>
                                <Text style={styles.placeName}>{place.name}</Text>
                                <Text style={styles.placeAccessibility}>
                                    ♿ {place.accessibility}
                                </Text>
                            </View>
                            <View style={styles.placeDistance}>
                                <Text style={styles.distanceText}>{place.distance}</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.starIcon}>⭐</Text>
                                    <Text style={styles.ratingText}>{place.rating}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.featuresContainer}>
                            {place.features.map((feature, index) => (
                                <View key={index} style={styles.featureTag}>
                                    <Text style={styles.featureText}>{feature}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.viewButton}
                            onPress={() => router.push(`/card/${place.id}`)}
                        >
                            <Text style={styles.viewButtonText}>Vedi dettagli</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
        marginBottom: 8,
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
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    filterIcon: {
        fontSize: 20,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
    },
    categoriesContainer: {
        maxHeight: 80,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    categoriesContent: {
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#e2e8f0',
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
    categoryButtonActive: {
        backgroundColor: '#DC2626',
        borderColor: '#DC2626',
    },
    categoryIcon: {
        fontSize: 18,
        marginRight: 6,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    categoryTextActive: {
        color: '#ffffff',
    },
    placesList: {
        flex: 1,
        paddingHorizontal: 24,
    },
    resultsText: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 20,
        marginBottom: 16,
        fontWeight: '600',
    },
    placeCard: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    placeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    placeInfo: {
        flex: 1,
    },
    placeName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 4,
    },
    placeAccessibility: {
        fontSize: 14,
        color: '#DC2626',
        fontWeight: '600',
    },
    placeDistance: {
        alignItems: 'flex-end',
    },
    distanceText: {
        fontSize: 12,
        color: '#64748b',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1e293b',
    },
    featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    featureTag: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    featureText: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '600',
    },
    viewButton: {
        backgroundColor: '#DC2626',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    viewButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
    },
});
