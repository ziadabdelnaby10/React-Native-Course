import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput, Pressable,
} from 'react-native';

export default function App() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        alt="App Logo"
                        resizeMode="contain"
                        style={styles.headerImg}
                        source={{ uri: 'https://assets.withfra.me/SignIn.2.png' }} />

                    <Text style={styles.title}>
                        Sign in to <Text style={{ color: '#075eec' }}>MyApp</Text>
                    </Text>

                    <Text style={styles.subtitle}>
                        Get access to your portfolio and more
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Email address</Text>

                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                            keyboardType="email-address"
                            onChangeText={email => setForm({ ...form, email })}
                            placeholder="john@example.com"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={form.email} />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Password</Text>

                        <TextInput
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                            onChangeText={password => setForm({ ...form, password })}
                            placeholder="********"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            secureTextEntry={showPassword}
                            value={form.password} />
                        <Pressable onPress={togglePasswordVisibility} style={styles.toggleButton}>
                            <Text>{showPassword ? 'Hide' : 'Show'}</Text>
                        </Pressable>
                    </View>

                    <View style={styles.formAction}>
                        <TouchableOpacity
                            onPress={() => {
                                // handle onPress
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Sign in</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            // handle link
                        }}>
                        <Text style={styles.formLink}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => {
                    // handle link
                }}>
                <Text style={styles.formFooter}>
                    Don't have an account?{' '}
                    <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        padding: 24,
    },
    title: {
        fontSize: 31,
        fontWeight: '700',
        color: '#1D2A32',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
    },
    /** Header */
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 36,
    },
    headerImg: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 36,
    },
    /** Form */
    form: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    formAction: {
        marginTop: 4,
        marginBottom: 16,
    },
    formLink: {
        fontSize: 16,
        fontWeight: '600',
        color: '#075eec',
        textAlign: 'center',
    },
    formFooter: {
        paddingVertical: 24,
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        letterSpacing: 0.15,
    },
    /** Input */
    input: {
        marginBottom: 16,
    },
    toggleButton: {
        padding: 8,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
        borderWidth: 1,
        borderColor: '#C9D3DB',
        borderStyle: 'solid',
    },
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#075eec',
        borderColor: '#075eec',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
});