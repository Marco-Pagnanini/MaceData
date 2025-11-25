import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



const Card = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [showThanks, setShowThanks] = useState(false);

    // Database simulato con coordinate
    const places = {
        '1': {
            id: 1,
            name: 'Caffe del Corso',
            category: 'Caffe',
            accessibility: '15+ m',
            distance: '0.5 km',
            rating: 4.8,
            features: ['Rampa', 'Bagno accessibile'],
            address: 'Caffe del Corso, 62100 Macerata MC',
            hours: '07:30–02',
            phone: '0733717011',
            latitude: 43.2991,
            longitude: 13.4530,
        }
    };

    const place: any = places[id as string];


    const openRatingModal = () => {
        setModalVisible(true);
        setRating(0);
        setDescription('');
        setShowThanks(false);
    };

    const closeModal = () => {
        setModalVisible(false);
        setRating(0);
        setDescription('');
        setShowThanks(false);
    };

    const submitRating = () => {
        setShowThanks(true);
        setTimeout(() => {
            closeModal();
        }, 2000);
    };

    if (!place) {
        return (
            <View style={styles.container}>
                <Text>Luogo non trovato</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <View style={styles.logoRow}>
                    <Text style={styles.appName}>Dettagli</Text>
                </View>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.hero}>
                    <View style={styles.heroIcon}>
                        <Text style={styles.heroIconText}>📍</Text>
                    </View>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.accessibility}>♿ {place.accessibility}</Text>

                    <View style={styles.metaInfo}>
                        <View style={styles.metaItem}>
                            <Text style={styles.metaIcon}>⭐</Text>
                            <Text style={styles.metaText}>{place.rating}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Text style={styles.metaIcon}>📏</Text>
                            <Text style={styles.metaText}>{place.distance}</Text>
                        </View>
                    </View>
                </View>

                {/* Accessibility Rates Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tasso di Accessibilità</Text>

                </View>

                {/* Features */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Caratteristiche accessibilità</Text>
                    <View style={styles.featuresContainer}>
                        {place.features.map((feature: any, index: number) => (
                            <View key={index} style={styles.featureTag}>
                                <Text style={styles.featureIcon}>✓</Text>
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informazioni</Text>

                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoIcon}>📍</Text>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Indirizzo</Text>
                                <Text style={styles.infoValue}>{place.address}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoIcon}>🕐</Text>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Orari</Text>
                                <Text style={styles.infoValue}>{place.hours}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoIcon}>📞</Text>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Telefono</Text>
                                <Text style={styles.infoValue}>{place.phone}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>📞 Chiama</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.actionButtonPrimary]}
                        onPress={openRatingModal}
                    >
                        <Text style={styles.actionButtonTextPrimary}>Recensione</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Rating Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {!showThanks ? (
                            <>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Valuta il percorso</Text>
                                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                        <Text style={styles.closeButtonText}>✕</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.modalPlaceName}>Tutti i dati saranno presi in maniera anonima solo per allenare l'AI</Text>

                                <Text style={styles.ratingLabel}>Come è stata la tua esperienza?</Text>

                                <View style={styles.starsContainer}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <TouchableOpacity
                                            key={star}
                                            onPress={() => setRating(star)}
                                            style={styles.starButton}
                                        >
                                            <Text style={[
                                                styles.starButtonText,
                                                rating >= star && styles.starButtonTextActive
                                            ]}>
                                                ⭐
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <Text style={styles.descriptionLabel}>Descrizione (opzionale)</Text>
                                <TextInput
                                    style={styles.descriptionInput}
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Condividi la tua esperienza..."
                                    value={description}
                                    onChangeText={setDescription}
                                    textAlignVertical="top"
                                />

                                <TouchableOpacity
                                    style={[
                                        styles.submitButton,
                                        rating === 0 && styles.submitButtonDisabled
                                    ]}
                                    onPress={submitRating}
                                    disabled={rating === 0}
                                >
                                    <Text style={styles.submitButtonText}>Invia valutazione</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <View style={styles.thanksContainer}>
                                <Text style={styles.thumbsUp}>👍</Text>
                                <Text style={styles.thanksTitle}>Grazie!</Text>
                                <Text style={styles.thanksText}>
                                    La tua valutazione ci aiuta a migliorare l'accessibilità per tutti
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    backIcon: {
        fontSize: 24,
        color: '#1e293b',
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
        marginLeft: 8,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    hero: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    heroIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    heroIconText: {
        fontSize: 40,
    },
    placeName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1e293b',
        textAlign: 'center',
        marginBottom: 8,
    },
    accessibility: {
        fontSize: 16,
        color: '#DC2626',
        fontWeight: '600',
        marginBottom: 16,
    },
    metaInfo: {
        flexDirection: 'row',
        gap: 24,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    metaIcon: {
        fontSize: 18,
    },
    metaText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748b',
    },
    section: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 16,
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#64748b',
    },
    errorText: {
        fontSize: 14,
        color: '#ef4444',
        textAlign: 'center',
        paddingVertical: 20,
    },
    accessibilityRatesContainer: {
        gap: 20,
    },
    accessibilityBarContainer: {
        marginBottom: 4,
    },
    accessibilityBarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    accessibilityBarLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
    },
    accessibilityBarPercentage: {
        fontSize: 16,
        fontWeight: '700',
    },
    accessibilityBarBackground: {
        height: 12,
        backgroundColor: '#f1f5f9',
        borderRadius: 6,
        overflow: 'hidden',
    },
    accessibilityBarFill: {
        height: '100%',
        borderRadius: 6,
    },
    ratesInfo: {
        backgroundColor: '#f8fafc',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginTop: 8,
    },
    ratesInfoText: {
        fontSize: 13,
        color: '#64748b',
        lineHeight: 20,
    },
    featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    featureTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    featureIcon: {
        fontSize: 14,
        color: '#DC2626',
        marginRight: 6,
        fontWeight: '700',
    },
    featureText: {
        fontSize: 14,
        color: '#1e293b',
        fontWeight: '600',
    },
    description: {
        fontSize: 16,
        color: '#64748b',
        lineHeight: 24,
    },
    infoCard: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    infoIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    infoValue: {
        fontSize: 16,
        color: '#1e293b',
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    actionButtonPrimary: {
        backgroundColor: '#DC2626',
        borderColor: '#DC2626',
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
    },
    actionButtonTextPrimary: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 40,
        minHeight: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1e293b',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 20,
        color: '#64748b',
        fontWeight: '600',
    },
    modalPlaceName: {
        fontSize: 16,
        color: '#64748b',
        marginBottom: 24,
    },
    ratingLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 16,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
        gap: 8,
    },
    starButton: {
        padding: 4,
    },
    starButtonText: {
        fontSize: 40,
        opacity: 0.3,
    },
    starButtonTextActive: {
        opacity: 1,
    },
    descriptionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 8,
    },
    descriptionInput: {
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 16,
        fontSize: 15,
        color: '#1e293b',
        borderWidth: 2,
        borderColor: '#e2e8f0',
        minHeight: 120,
        marginBottom: 24,
    },
    submitButton: {
        backgroundColor: '#DC2626',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#94a3b8',
        opacity: 0.5,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    thanksContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    thumbsUp: {
        fontSize: 80,
        marginBottom: 24,
    },
    thanksTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 12,
    },
    thanksText: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
});
