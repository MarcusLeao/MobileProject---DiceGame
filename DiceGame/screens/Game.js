import React, { useState } from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import useStore from "../store";

// Importe todas as imagens de dados antecipadamente
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

const Game = ({ navigation }) => {
	const [dice1, setDice1] = useState(1);
	const [dice2, setDice2] = useState(1);
	const [result, setResult] = useState("");
	const addToHistory = useStore((state) => state.addToHistory);

	const rollDice = () => {
		const currentTime = new Date();
		const newDice1 = Math.floor(Math.random() * 6) + 1;
		const newDice2 = Math.floor(Math.random() * 6) + 1;
		setDice1(newDice1);
		setDice2(newDice2);

		let newResult;

		if (newDice1 > newDice2) {
			newResult = "Você ganhou!";
		} else if (newDice1 === newDice2) {
			newResult = "Empate!";
		} else {
			newResult = "Você perdeu!";
		}

		setResult(newResult);

		addToHistory({
			dice1: newDice1,
			dice2: newDice2,
			result: newResult,
			timestamp: currentTime,
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.resultText}>{result}</Text>
			<View style={styles.diceContainer}>
				<View style={styles.diceColumn}>
					<Image source={diceImages[dice1]} style={styles.diceImage} />
					<Text>Seu Dado</Text>
				</View>
				<View style={styles.diceColumn}>
					<Image source={diceImages[dice2]} style={styles.diceImage} />
					<Text>Adversário</Text>
				</View>
			</View>

			<Button title="Jogar" onPress={rollDice} style={styles.button} />

			<View style={styles.buttonContainer}>
				<Button title="Histórico" onPress={() => navigation.navigate("Historico")} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	diceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	diceColumn: {
		alignItems: "center",
	},
	diceImage: {
		width: 150,
		height: 150,
		marginRight: 10,
		marginLeft: 10,
	},
	button: {
		marginTop: 20,
	},
	buttonContainer: {
		position: "absolute",
		bottom: 20,
		right: 20,
	},
	resultText: {
		fontSize: 30,
		fontWeight: "bold",
	},
});

export default Game;
