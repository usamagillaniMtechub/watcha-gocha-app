import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CustomSnackbar = ({visible, message, messageDescription, onDismiss}) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false, // Ensure you have this set to false for Android
      }).start();
      const timeout = setTimeout(() => {
        onDismiss();
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0], // Slide in from the top
              }),
            },
          ],
        },
      ]}>
      <View style={{marginTop:hp(1), marginLeft:wp(3)}}>
        <FontAwesome5
          name={'check-circle'}
          size={23}
          //backgroundColor={'#FACA4E'}
          color={'#FACA4E'}
        />
      </View>

      <View>

      <View style={{marginLeft:wp(3), marginTop:hp(0.5)}}>

      <Text style={styles.message}>{message}</Text>

      </View>

      <View style={{marginLeft:wp(3)}}>

      <Text style={styles.messageDescription}>{messageDescription}</Text>

      </View>
      </View>
     {/*  <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
        <Text style={styles.dismissButtonText}>Dismiss</Text>
      </TouchableOpacity> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 1, // Display at the top of the screen
    left: 15,
    right: 15,
    height:hp(7),
    borderRadius: 10,
    backgroundColor: 'white',
    //padding: 14,
    flexDirection: 'row',
    //alignItems: 'center',
  },
  message: {
    color: '#FACA4E',
    fontSize:wp(4.5),
    fontWeight:'500'
    
  },messageDescription: {
    color: '#2E2E2E',
    fontSize:wp(3.5),
    fontWeight:'200'
    
  },
  dismissButton: {
    marginLeft: 16,
  },
  dismissButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomSnackbar;
