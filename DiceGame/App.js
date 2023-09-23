import React, { useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useStore from "./store";
import Game from "./screens/Game";
import History from "./screens/History";

export default function App() {
	useEffect(() => {
		useStore.getState().loadHistory();
	}, []);
	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Jogo de Dados" component={Game} />
				<Stack.Screen name="Historico" component={History} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
