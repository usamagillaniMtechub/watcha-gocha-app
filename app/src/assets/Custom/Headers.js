import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { appImages } from '../utilities';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontiso from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feater from 'react-native-vector-icons/Feather';

const Headers = ({
  showBackIcon,
  showText,
  showSearch,
  onPressSearch,
  onPressListings,
  
  onPressGridView,
  onPressSettings,
  onPressfavourite,
  onPressAdd,
  text,
  showLogo,
  showProfileImage,
  showHeart,
  showSettings,
  showAdd,
  showListings,
  showGridView,
  style,
  onPress,
  isFavorite,
  navigation,
}) => {
  return (
    <View style={styles.header}>
      {showBackIcon && (
        <TouchableOpacity style={styles.backArrow} onPress={onPress}>
          <Ionicons name="chevron-back-sharp" size={25} color="#282828" />
        </TouchableOpacity>
      )}

      {showListings && (
        <TouchableOpacity style={styles.backArrow} onPress={onPressListings}>
          <Ionicons name="menu" size={25} color="#282828" />
        </TouchableOpacity>
      )}

      {showText && <Text style={[styles.headerText, style]}>{text}</Text>}

      {showLogo &&<Image source={appImages.logo} style={styles.logoImage} resizeMode='contain' />}
       
      {showProfileImage && <Image source={appImages.profileImg} style={styles.profileImgs} resizeMode='contain' />}

      {showHeart && (
        <TouchableOpacity onPress={onPressfavourite} style={styles.heartIcon}>
          {isFavorite ? (
            <Fontiso name="heart" size={20} color={Colors.secondary} />
          ) : (
            <Fontiso name="heart-alt" size={20} color="#2B2B2B" />
          )}
        </TouchableOpacity>
      )}

      {showSearch && (
        <TouchableOpacity onPress={onPressSearch} style={styles.heartIcon}>
          <Feater name="search" size={20} color="#FACA4E" />
        </TouchableOpacity>
      )}

      {showSettings && (
        <TouchableOpacity onPress={onPressSettings} style={styles.heartIcon}>
          <AntDesign name="setting" size={20} color="#2B2B2B" />
        </TouchableOpacity>
      )}

      {/*  {showAdd && (
        <TouchableOpacity onPress={onPressAdd} style={styles.heartIcon}>
          <Image style={styles.imgAdd} source={Images.add} />
        </TouchableOpacity>
      )} */}

      {/* {showListings && (
        <TouchableOpacity onPress={onPressListings} style={styles.heartIcon}>
          <Image style={styles.imgAdd} source={Images.listView} />
        </TouchableOpacity>
      )} */}

      {/* {showGridView && (
        <TouchableOpacity onPress={onPressGridView} style={styles.heartIcon}>
          <Image style={styles.imgAdd} source={Images.gridView} />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    //justifyContent:'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal:wp(5),
    height: hp(5),
    marginTop: StatusBar.currentHeight - 20,
  },
  headerText: {
    color: '#333333',
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: hp(2.8),
    alignSelf: 'center',
  },
  logoImage:{
      alignSelf: 'center',
      resizeMode:'contain',
      marginTop:hp(-1),
      width: wp(50), height: 40, 
  },
  backArrow: {
    position: 'absolute',
    left: 20,
    justifyContent: 'center', // Vertically align the arrow within the touchable area
    paddingVertical: 10, // Add padding to increase the touchable area
    paddingRight: 10, // Add some space on the right side if needed
  },
  heartIcon: {
    position: 'absolute',
    right: 15,
  },
  profileImgs:{
    resizeMode:'contain',
    marginTop:hp(-1),
    position: 'absolute',
    right: -18,
    width: wp(30), height: 30, 
  },
  imgAdd: {
    resizeMode: 'contain',
    height: hp(3),
  },
});
