import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



const Index = () => {
    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);

    const handleLogin = () => {
        router.replace("/(tabs)")
        console.log('Login con:', email, password);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header con logo e tagline */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    {/*<MacerataCrest />*/}
                    <Text style={styles.appName}>HackHub</Text>
                </View>
                <Text style={styles.tagline}>Cerca il tuo Hackathon e Iscriviti</Text>
            </View>

            {/* Form di login */}
            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === 'email' && styles.inputFocused
                        ]}
                        placeholder="tuaemail@esempio.it"
                        placeholderTextColor="#94a3b8"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setFocusedInput(null)}
                        onBlur={() => setFocusedInput(null)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === 'password' && styles.inputFocused
                        ]}
                        placeholder="La tua password"
                        placeholderTextColor="#94a3b8"
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Password dimenticata?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    activeOpacity={0.8}
                >
                    <Text style={styles.loginButtonText}>Accedi</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>oppure</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                    style={styles.registerButton}
                    activeOpacity={0.8}
                    onPress={() => { router.push("/register") }}
                >
                    <Text style={styles.registerButtonText}>Crea un account</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Aiutiamo le persone con disabilità a muoversi{'\n'}
                    con maggiore sicurezza e libertà
                </Text>
            </View>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 80,
        marginBottom: 60,
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    appName: {
        fontSize: 36,
        fontWeight: '700',
        color: '#1e293b',
        letterSpacing: -0.5,
        marginTop: 16,
    },
    tagline: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1e293b',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    inputFocused: {
        borderColor: Colors.light.primary,
        backgroundColor: '#ffffff',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: 'Colors.light.primary',
        fontSize: 14,
        fontWeight: '600',
    },
    loginButton: {
        backgroundColor: Colors.light.primary,
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        shadowColor: Colors.light.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e2e8f0',
    },
    dividerText: {
        color: '#94a3b8',
        paddingHorizontal: 16,
        fontSize: 14,
    },
    registerButton: {
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    registerButtonText: {
        color: '#334155',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        paddingBottom: 40,
        alignItems: 'center',
    },
    footerText: {
        color: '#94a3b8',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
    },
});
