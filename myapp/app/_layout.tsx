import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function RootLayout() {


    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{
                    headerShown: false
                }} />
                <Stack.Screen name="register" options={{
                    headerShown: false
                }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                <Stack.Screen name="card/[id]" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
