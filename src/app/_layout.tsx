import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';

const App = () => {
	NavigationBar.setVisibilityAsync('hidden');
	NavigationBar.setBehaviorAsync('overlay-swipe');
	return (
		<SafeAreaProvider>
			<RootNavigation />

			<StatusBar style="auto" />
		</SafeAreaProvider>
	);
};

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
};

export default App;
