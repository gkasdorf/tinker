import {Pressable, StyleSheet, Text, View} from "react-native";
import {FlashList} from "@shopify/flash-list";
import FastImage from "react-native-fast-image";
import ImageItem from "./ImageViewer/ImageItem";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const images = [
	{uri: "https://lemmy.ml/pictrs/image/d6a33106-80c7-4ae9-b51b-0fef9ecc284c.jpeg?format=webp"},
	{uri: "https://lemmy.ml/pictrs/image/4b137aa4-f043-4439-b50d-56bdfaea6342.jpeg"},
	{uri: "https://lemmy.ml/pictrs/image/4823c512-e7eb-4510-a891-11ab9799673e.jpeg?format=webp"}
]

export default function AppTwo() {
	const renderItem = ({item}) => {
		return <ImageItem source={item} />;
	}

	return (
			<GestureHandlerRootView style={styles.container}>
				<FlashList renderItem={renderItem} data={images} />
			</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30,
	}
});
