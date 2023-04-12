import React from 'react';
import LottieView from "lottie-react-native";
import { View } from "react-native";

function Loader() {
    return (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
<LottieView
autoPlay
style={{
 width: 100,
 height: 100,
 backgroundColor: '#eee1',
}}
// Find more Lottie files at https://lottiefiles.com/featured
source={require('../assets/loader2.json')}
/>
</View>
    );
}

export default Loader;
