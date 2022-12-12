import { StyleSheet, View, Text, Button } from "react-native";

export default function NationalityItem(props) {

    return (
        <View style={styles.nationalityContainer}>
            <Text>{props.text}</Text>
            <Button 
                title="Upload your file 📑"
                color="black"
                onPress={pickDocument}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    nationalityContainer: {
        fontSize: 30,
        backgroundColor: "#FFFFFF",
        marginTop: 20,
    }
});