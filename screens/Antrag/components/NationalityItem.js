import { StyleSheet, View, Text, Button } from "react-native";
import React from "react";

export default function NationalityItem(props) {

    return (
        <View style={styles.nationalityContainer}>
            <Text style={{color: "#223e4b"}}>{props.text}</Text>
            <Button 
                title="Nachweis hochladen 📑"
                color="#e94832"
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