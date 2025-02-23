import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  LogBox,
  Animated,
  ImageBackground,
  Pressable,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {appImages} from '../../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Back from '../../../assets/svg/back.svg';

import CustomButton from '../../../assets/Custom/Custom_Button';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from 'react-native-switch-selector';
import User from '../../../assets/svg/User.svg'
import styles from './styles';
LogBox.ignoreAllLogs();

const App = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused]);

  const [signin_email, setsignin_email] = useState();

  const [openModel, setOpenModel] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [userName, setUserName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const ref_RBSheet = useRef(null);
  const ref_RBSheetCamera = useRef(null);

  return (
    <ScrollView style={styles.bg} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FACA4E'} />
      <View style={styles.mainv}>
        <Back
          width={20}
          height={20}
          style={{marginTop: '9%', marginLeft: '8%'}}
        />

        <Text style={styles.txt}>Profile Image</Text>
        <Text style={styles.txt1}>Add your profile image below</Text>

        <View style={{alignItems: 'center', marginTop:hp(15) }}>
            <TouchableOpacity  style={styles.circleBox}>
              {
                imageUri==null?
                <User width={30} height={30} />
                :
                <Image
                style={{flex: 1, width: '100%', height: '100%',borderRadius: wp(25) / 2, // Half of the width (25/2)
                resizeMode: 'contain'}}
                source={{uri: imageUri}}
              />
              }
              
            </TouchableOpacity>
           
          </View>
        

        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.button}
          contentStyle={{
            padding: '1%',
          }}
          labelStyle={{
            fontSize: widthPercentageToDP(3.7),
            fontFamily: 'Inter-Bold',
            color: '#232323',
          }}>
          Add Image
        </Button>
        <View style={{marginTop: '25%', alignSelf: 'center'}}>
          <CustomButton
            title="Complete Profile"
            load={false}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              navigation.navigate('');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};



export default App;
