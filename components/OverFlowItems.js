import {View, Text, Animated, StyleSheet} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;

function OverflowItems ({ data, scrollXAnimated }) {
        const inputRange = [-1, 0, 1];
        const translateY = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
        });
        return (
          <View style={styles.root}>
          <View style={styles.overflowContainer}>
            <Animated.View style={{ transform: [{ translateY }] }}>
              {data.map((item, index) => {
                return (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={[styles.title]} numberOfLines={1}>
                      {item.title}
                    </Text>
                   {/* <View style={styles.itemContainerRow}>
                      <Text style={[styles.location]}>
                        <EvilIcons
                          name='check'
                          size={16}
                          color='black'
                          style={{ marginRight: 5 }}
                        />
                        {item.location}
                      </Text>
                      <Text style={[styles.date]}>{item.date}</Text>
                    </View> */}
                  </View>
                );
              })}
            </Animated.View>
          </View>
          </View>
        );

}

export default OverflowItems;

const styles = StyleSheet.create({
    root: {
       // flex: 1,
       paddingLeft: 10,
       paddingTop: 10,
       height: 10,
    },
    itemContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    overflowContainer: {
        height: OVERFLOW_HEIGHT,
        overflow: 'hidden',
    },
    itemContainer: {
        height: OVERFLOW_HEIGHT,
        padding: SPACING * 2,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: -1,
    },
    location: {
        fontSize: 16,
    },
    date: {
        fontSize: 12,
    }
});