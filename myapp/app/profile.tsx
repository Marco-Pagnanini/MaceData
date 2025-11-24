import React, { useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const Profile = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcribedText, setTranscribedText] = useState('');
    const [recognitionAvailable, setRecognitionAvailable] = useState(false);

    // Verifica disponibilità Speech Recognition
    React.useEffect(() => {
        // @ts-ignore
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setRecognitionAvailable(true);
        }
    }, []);

    const user = {
        name: 'Mario Rossi',
        email: 'mario.rossi@email.it',
        phone: '+39 333 1234567',
        memberSince: 'Gennaio 2024',
        placesVisited: 23,
        reviewsWritten: 12,
    };

    const startRecording = () => {
        try {
            Alert.alert(
                "Privacy",
                "Tutti i dati inseriti verranno salvati nel tuo telefono, ma non saranno in nessun modo usati ai fini della privacy",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Registrazione annullata"),
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: () => {
                            console.log("Registrazione avviata");
                            // Qui puoi aggiungere la logica per avviare la registrazione
                            setIsRecording(true);
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Errore nell\'avvio della registrazione:', error);
            Alert.alert('Errore', 'Impossibile avviare la registrazione vocale');
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.logoRow}>
                        <MacerataCrestSmall />
                        <Text style={styles.appName}>Profilo</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* User Info Card */}
                <View style={styles.userCard}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedIcon}>✓</Text>
                        </View>
                    </View>

                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{user.placesVisited}</Text>
                            <Text style={styles.statLabel}>Luoghi</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{user.reviewsWritten}</Text>
                            <Text style={styles.statLabel}>Recensioni</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>4.8</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                    </View>

                    <Text style={styles.memberSince}>
                        Membro da {user.memberSince}
                    </Text>
                </View>

                {/* Speech to Text Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🎤 Assistente Vocale</Text>

                    <View style={styles.speechCard}>
                        <Text style={styles.speechDescription}>
                            Premi il pulsante e parla. Il tuo messaggio verrà trascritto automaticamente.
                        </Text>

                        <TouchableOpacity
                            style={[styles.recordButton]}
                            onPress={startRecording}
                        >
                            <View style={[styles.recordButtonInner, isRecording && styles.recordButtonInnerActive]}>
                                <Text style={styles.recordIcon}>
                                    {'🎤'}
                                </Text>
                            </View>
                            <Text style={[styles.recordButtonText, isRecording && styles.recordButtonTextActive]}>
                                {'Tocca per parlare'}
                            </Text>
                        </TouchableOpacity>

                        {transcribedText ? (
                            <>
                                <View style={styles.transcriptionContainer}>
                                    <Text style={styles.transcriptionLabel}>Trascrizione:</Text>
                                    <View style={styles.transcriptionBox}>
                                        <Text style={styles.transcriptionText}>{transcribedText}</Text>
                                    </View>
                                </View>

                                <View style={styles.transcriptionActions}>
                                    <TouchableOpacity
                                        style={styles.copyButton}
                                        onPress={() => {
                                            // Copia negli appunti (per web)
                                            if (navigator.clipboard) {
                                                navigator.clipboard.writeText(transcribedText);
                                                Alert.alert('Successo', 'Testo copiato negli appunti!');
                                            }
                                        }}
                                    >
                                        <Text style={styles.copyButtonText}>📋 Copia</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.clearButton}
                                        onPress={clearText}
                                    >
                                        <Text style={styles.clearButtonText}>🗑️ Cancella</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : null}

                    </View>
                </View>

                {/* Settings Section */}


                {/* Logout Button */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.logoutIcon}>🚪</Text>
                        <Text style={styles.logoutText}>Esci dall'Account</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        MaceData - Navigazione Accessibile{'\n'}
                        © 2024 Tutti i diritti riservati
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;

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
    editButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    editIcon: {
        fontSize: 18,
    },
    content: {
        flex: 1,
    },
    userCard: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 24,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#DC2626',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#ffffff',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#22c55e',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#ffffff',
    },
    verifiedIcon: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '700',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#DC2626',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '600',
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#e2e8f0',
    },
    memberSince: {
        fontSize: 13,
        color: '#64748b',
    },
    section: {
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 16,
    },
    speechCard: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 24,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    speechDescription: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20,
    },
    recordButton: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    recordButtonInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#DC2626',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#DC2626',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    recordButtonInnerActive: {
        backgroundColor: '#ef4444',
        transform: [{ scale: 1.1 }],
    },
    recordIcon: {
        fontSize: 36,
    },
    recordButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
    },
    recordButtonTextActive: {
        color: '#DC2626',
    },
    transcriptionContainer: {
        marginTop: 20,
    },
    transcriptionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 8,
    },
    transcriptionBox: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: '#e2e8f0',
        minHeight: 100,
    },
    transcriptionText: {
        fontSize: 15,
        color: '#1e293b',
        lineHeight: 22,
    },
    transcriptionActions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    copyButton: {
        flex: 1,
        backgroundColor: '#DC2626',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    copyButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#ffffff',
    },
    clearButton: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    clearButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#64748b',
    },
    notAvailableContainer: {
        backgroundColor: '#fef2f2',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        borderWidth: 2,
        borderColor: '#fecaca',
    },
    notAvailableText: {
        fontSize: 13,
        color: '#991b1b',
        textAlign: 'center',
        lineHeight: 20,
    },
    settingsCard: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    settingInfo: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 13,
        color: '#64748b',
    },
    settingDivider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 16,
    },
    menuCard: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 4,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    menuIcon: {
        fontSize: 24,
    },
    menuInfo: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#64748b',
    },
    menuArrow: {
        fontSize: 32,
        color: '#94a3b8',
        fontWeight: '300',
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginLeft: 80,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 18,
        borderWidth: 2,
        borderColor: '#ef4444',
    },
    logoutIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ef4444',
    },
    footer: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 18,
    },
});
