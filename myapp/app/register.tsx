import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);

    const handleRegister = () => {
        console.log('Registrazione con:', nome, email, password);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header con logo e tagline */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    {/* <MacerataCrest />*/}
                    <Text style={styles.appName}>MaceData</Text>
                </View>
                <Text style={styles.tagline}>Crea il tuo account</Text>
            </View>

            {/* Form di registrazione */}
            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome completo</Text>
                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === 'nome' && styles.inputFocused
                        ]}
                        placeholder="Il tuo nome"
                        placeholderTextColor="#94a3b8"
                        value={nome}
                        onChangeText={setNome}
                        onFocus={() => setFocusedInput(null)}
                        onBlur={() => setFocusedInput(null)}
                    />
                </View>

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
                        placeholder="Crea una password"
                        placeholderTextColor="#94a3b8"
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        secureTextEntry
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Conferma password</Text>
                    <TextInput
                        style={[
                            styles.input,
                            focusedInput === 'confirmPassword' && styles.inputFocused
                        ]}
                        placeholder="Ripeti la password"
                        placeholderTextColor="#94a3b8"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onFocus={() => setFocusedInput(null)}
                        onBlur={() => setFocusedInput(null)}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegister}
                    activeOpacity={0.8}
                >
                    <Text style={styles.registerButtonText}>Registrati</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>oppure</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                    style={styles.loginButton}
                    activeOpacity={0.8}
                    onPress={() => { router.back() }}
                >
                    <Text style={styles.loginButtonText}>Ho già un account</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Registrandoti accetti i nostri{'\n'}
                    Termini di Servizio e Privacy Policy
                </Text>
            </View>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 60,
        marginBottom: 40,
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
        marginBottom: 16,
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
    registerButton: {
        backgroundColor: Colors.light.primary,
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: Colors.light.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    registerButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
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
    loginButton: {
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e2e8f0',
    },
    loginButtonText: {
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
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
});
