import {View, Text, StyleSheet, Animated, useWindowDimensions} from 'react-native';

function Paginator({data, scrollX}) {
    const {width} = useWindowDimensions();

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', height: 64}}>
            {data.map((_,i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10,20,10],
                    extrapolate: 'clamp',
                });


                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3,1,0.3],
                    extrapolate: 'clamp',
                });

                return <Animated.View style={[styles.dot, {width: dotWidth, opacity,}]} key={i.toString()}/>;
            })}
        </View>
      </View>
    );
};

export default Paginator;

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: 'gray',
        marginHorizontal: 8,
    },
})