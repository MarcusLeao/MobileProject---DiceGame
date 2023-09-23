import React, { useEffect } from "react";
import { View, Text, SectionList, Image, StyleSheet, Button } from "react-native";
import useStore from "../store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importe as imagens aqui
import dice1Image from "../assets/dice1.png";
import dice2Image from "../assets/dice2.png";
import dice3Image from "../assets/dice3.png";
import dice4Image from "../assets/dice4.png";
import dice5Image from "../assets/dice5.png";
import dice6Image from "../assets/dice6.png";

const diceImages = {
	1: dice1Image,
	2: dice2Image,
	3: dice3Image,
	4: dice4Image,
	5: dice5Image,
	6: dice6Image,
};

const History = () => {
	const history = useStore((state) => state.history);
	const clearHistory = useStore((state) => state.clearHistory);

	// Função para formatar a data no formato "Mês Ano"
	const formatMonthYear = (date) => {
		const options = { year: "numeric", month: "long" };
		return date.toLocaleDateString(undefined, options);
	};

	// Organizar o histórico por mês
	const organizedHistory = history.reduce((acc, item) => {
		const timestamp = new Date(item.timestamp);
		const monthYear = formatMonthYear(timestamp);

		if (!acc[monthYear]) {
			acc[monthYear] = [];
		}

		acc[monthYear].push(item);
		return acc;
	}, {});

	const sections = Object.keys(organizedHistory).map((key) => ({
		title: key,
		data: organizedHistory[key],
	}));

	const handleClearHistory = () => {
		// Chame a função para limpar o histórico
		clearHistory();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Histórico de Jogadas:</Text>
			<SectionList
				sections={sections}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<View>
						<Text style={styles.timestamp}>
							{item.timestamp ? item.timestamp.toLocaleString() : "Data/Hora Indisponível"}
						</Text>
						<View style={styles.diceContainer}>
							<Image source={diceImages[item.dice1]} style={styles.diceImage} />
							<Image source={diceImages[item.dice2]} style={styles.diceImage} />
							<Text style={styles.result}>{item.result}</Text>
						</View>
					</View>
				)}
				renderSectionHeader={({ section: { title } }) => <Text style={styles.month}>{title}</Text>}
				style={styles.sectionList} // Estilo para a SectionList
			/>
			<View style={styles.clearButtonContainer}>
				<Button title="Limpar Histórico" onPress={handleClearHistory} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	month: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
		marginTop: 10,
	},
	timestamp: {
		fontSize: 16,
		marginBottom: 5,
	},
	diceImage: {
		width: 60,
		height: 60,
	},
	diceContainer: {
		flexDirection: "row",
		justifyContent: "space-between", // Espaçamento igual entre as colunas
		marginBottom: 20, // Espaçamento inferior para separar os dados do botão
	},
	result: {
		fontSize: 20,
		fontWeight: "bold",
	},
	clearButtonContainer: {
		position: "absolute",
		bottom: 20, // Posição no canto inferior
		right: 20, // Posição no canto direito
	},
	sectionList: {
		flex: 1, // A SectionList ocupa todo o espaço disponível
		width: "100%", // Largura total
	},
});

export default History;
