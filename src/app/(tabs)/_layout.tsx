import { Tabs } from 'expo-router';

const TabsNavigation = () => {
	return (
		<Tabs>
			<Tabs.Screen name="favorites" />
			<Tabs.Screen name="playlists" />
			<Tabs.Screen name="(songs)" />
		</Tabs>
	);
};

export default TabsNavigation;
