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

import ForgetPasswordImg from '../../../assets/images/forget.png';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';


import {appImages} from '../../../assets/utilities/index';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Back from '../../../assets/svg/back.svg';

import CustomButton from '../../../assets/Custom/Custom_Button';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from 'react-native-switch-selector';
import User from '../../../assets/svg/User.svg';
import CustomSnackbar from '../../../assets/Custom/CustomSnackBar';
LogBox.ignoreAllLogs();

const ResetPassword = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused]);

  const [newPassword, setNewPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState();

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isConfirmActive, setIsConfirmPasswordActive] = useState(false);

  const [loading, setIsLoading] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [userName, setUserName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const ref_RBSheet = useRef(null);
  const ref_RBSheetCamera = useRef(null);

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };

  const handleFocusConfirmPassword = () => {
    setIsConfirmPasswordActive(true);
  };


  const dismissSnackbar = () => {
    setSnackbarVisible(true);
  };

  const handleBlurConfirmPassword = () => {
    setIsConfirmPasswordActive(false);
  };

  return (
    <ScrollView style={styles.bg} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FACA4E'} />
      <View style={styles.mainv}>
        <TouchableOpacity
          style={{marginTop: '9%', marginLeft: '8%', alignSelf: 'flex-start'}}
          onPress={() => navigation.goBack()}>
          <Back width={20} height={20} />
        </TouchableOpacity>

        <View style={styles.passwordImg}>
          <Image
            source={require('../../../assets/images/forget.png')}
            resizeMode="contain"
            style={{
              width: wp(45),
              height: hp(45),
            }}
          />
        </View>

        <Text style={styles.resetPasswordHeadingTxt}>Reset Password</Text>

        <Text style={styles.resetPasswordTxt}>Create a strong password</Text>

        <TextInput
          mode="outlined"
          label="New Password"
          onChangeText={text => setNewPassword(text)}
          style={styles.ti}
          outlineColor="#0000001F"
          placeholderTextColor={'#646464'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          left={
            <TextInput.Icon
              icon={() => (
                <SimpleLineIcon
                  name={'lock'}
                  size={23}
                  color={isTextInputActive == true ? '#FACA4E' : '#64646485'}
                />
              )}
            />
          }
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        <TextInput
          mode="outlined"
          label="Confirm Password"
          onChangeText={text => setIsConfirmPasswordActive(text)}
          style={styles.ti}
          outlineColor="#0000001F"
          placeholderTextColor={'#646464'}
          activeOutlineColor="#FACA4E"
          autoCapitalize="none"
          onFocus={handleFocusConfirmPassword}
          onBlur={handleBlurConfirmPassword}
          left={
            <TextInput.Icon
              icon={() => (
                <SimpleLineIcon
                  name={'lock'}
                  size={23}
                  color={isTextInputActive == true ? '#FACA4E' : '#64646485'}
                />
              )}
            />
          }
          // left={isTextInputActive ? <Oemail /> : <Gemail />}
        />

        <View style={{marginTop: '25%', alignSelf: 'center'}}>
          <CustomButton
            title="Send Code"
            load={loading}
            // checkdisable={inn == '' && cm == '' ? true : false}
            customClick={() => {
              //navigation.navigate('Profile_image');
            }}
          />
        </View>
      </View>

      <CustomSnackbar
        message={'success'}
        messageDescription={'Password Reset Successfully'}
        onDismiss={dismissSnackbar} // Make sure this function is defined
        visible={snackbarVisible}
      />
    </ScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  mainv: {
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: 'center',
    marginTop: '15%',
    backgroundColor: 'white',
  },
  bg: {
    // height:800,
    backgroundColor: '#FACA4E',
  },
  passwordImg: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
    height: hp(25),
  },
  resetPasswordHeadingTxt: {
    marginTop: hp(3),
    fontFamily: 'Inter',
    color: '#333333',
    fontSize: wp(7),
    fontWeight: 'bold',
  },
  resetPasswordTxt: {
    marginTop: hp(1.5),
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#9597A6',
    fontSize: wp(3.5),
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '10%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
});
