import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';

import {Button, Divider, TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlusPost from '../../../assets/svg/PlusPost.svg';
import Approved from '../../../assets/svg/Approved.svg';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Back from '../../../assets/svg/back.svg';
import {appImages} from '../../../assets/utilities/index';
import Slider from '@react-native-community/slider';
import VolumeUp from '../../../assets/svg/VolumeUp.svg';
import Like from '../../../assets/svg/Like.svg';
import UnLike from '../../../assets/svg/Unlike.svg';
import Comment from '../../../assets/svg/Comment.svg';
import Send from '../../../assets/svg/Send.svg';
import Download from '../../../assets/svg/Download.svg';
import CustomButton from '../../../assets/Custom/Custom_Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Fontiso from 'react-native-vector-icons/Fontisto';

import IonIcons from 'react-native-vector-icons/Ionicons';

import {SelectCountry, Dropdown} from 'react-native-element-dropdown';
import CPaperInput from '../../../assets/Custom/CPaperInput';
import Headers from '../../../assets/Custom/Headers';

export default function ViewProfile({navigation}) {
  const [authToken, setAuthToken] = useState('');

  const [userId, setUserId] = useState('');

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);

  const [videos, setVideos] = useState([]);
  const [pics, setPics] = useState([]);

  const [totalVideos, setTotalVideos] = useState(null);

  const [totalPics, setTotalPics] = useState(null);

  const [marketZone, setMarketZone] = useState([]);

  const [totalMarketZone, setTotalMarketZone] = useState(null);

  const [news, setNews] = useState([]);

  const [totalNews, setTotalNews] = useState(null);

  const [QAFI, setQAFI] = useState([]);

  const [totalQAFI, setTotalQAFI] = useState(null);

  const [GEBC, setGEBC] = useState([]);

  const [totalGEBC, setTotalGEBC] = useState(null);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    // Fetch data one by one
    await getUserID();
    //await fetchUser();
    setLoading(false);
    // Once all data is fetched, set loading to false
  };

  const getUserID = async () => {
    console.log('AT User Id');
    try {
      const result = await AsyncStorage.getItem('authToken ');
      if (result !== null) {
        setAuthToken(result);
        console.log('user token retrieved:', result);

        fetchUserId(result);
      }

      /* console.log("User Id", userId);
      console.log("authToken", authToken); */
    } catch (error) {
      // Handle errors here
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchUserId = async tokens => {
    console.log('Token', tokens);
    const result3 = await AsyncStorage.getItem('userId ');
    if (result3 !== null) {
      setUserId(result3);

      console.log('user id retrieved:', result3);
      fetchUser(tokens, result3);
    } else {
      console.log('result is null', result3);
    }
  };

  const fetchUser = async (tokens, user) => {
    console.log('Came to fetch Id');
    const token = tokens;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/user/getUser/${user}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.user);
      setName(result.user.username);
      setEmail(result.user.email);
      fetchMyVideos(tokens, user);
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  //---------------- VIDEOS OF MY PROFILE----------------\\

  const fetchMyVideos = async (tokens, user) => {
    /*  console.log("Came to my videos");
    console.log("UserId", ids);
    console.log("AuthToken", authToken); */

    const token = tokens;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/xpi/getAllVideosByUser/${user}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Videos);
      setVideos(result.Videos); // Update the state with the fetched data
      setTotalVideos(result.totalVideos);
      fetchMyPicTour(tokens, user);
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchMyPicTour = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/picTour/getAllPicToursByUser/${user}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Videos);
      setPics(result.Tours); // Update the state with the fetched data
      setTotalPics(result.totalTours);
      fetchMyMarketZoneTour(tokens, user);
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchMyMarketZoneTour = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/item/getAllItemByUser/${user}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.AllItems);
      setMarketZone(result.AllItems); // Update the state with the fetched data
      setTotalMarketZone(result.totalItems);
      fetchMyNews(tokens, user);
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchMyNews = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/news/getAllNewsByUse/${user}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.News);
      setNews(result.News); // Update the state with the fetched data
      setTotalNews(result.totalNews);
      fetchMyQAFI(tokens, user);
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchMyQAFI = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/qafi/getAllQafisByUser/${user}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.QAFIs);
      setQAFI(result.QAFIs); // Update the state with the fetched data
      setTotalQAFI(result.totalQAFIs);
      fetchMyGEBC(tokens, user);
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchMyGEBC = async (tokens, user) => {
    const token = tokens;

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/gebc/getAllGEBCByUser/${user}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.GEBCs);
      setGEBC(result.GEBCs); // Update the state with the fetched data
      setTotalGEBC(result.totalGEBCs);
      setLoading(false);
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const availableAppsVideo = [
    {
      id: 1,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Explore the intricate web of global pol.....',
      image: appImages.topSearches2,
    },
  ];

  const availableApps = [
    {
      id: 1,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 2,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
    {
      id: 3,
      title: 'Item Name',
      image: appImages.topSearches3,
    },
    {
      id: 4,
      title: 'Item Name',
      image: appImages.topSearches4,
    },
    {
      id: 5,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 6,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
    {
      id: 7,
      title: 'Item Name',
      image: appImages.topSearches3,
    },
    {
      id: 8,
      title: 'Item Name',
      image: appImages.topSearches4,
    },
    {
      id: 9,
      title: 'Item Name',
      image: appImages.topSearches1,
    },
    {
      id: 10,
      title: 'Item Name',
      image: appImages.topSearches2,
    },
  ];

  const renderAvailableApps = item => {
    console.log('Items Of Market', item.images[0].image);
    const imageUri = item.images[0]?.image;
    console.log(imageUri);
    return (
      <TouchableOpacity
        //onPress={() => navigation.navigate('ProductDetailsProfile')}
        style={{width: wp(35), margin: 5}}>
        <View>
          {imageUri === null ? (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,

                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: hp(18),
                borderRadius: wp(3),
                resizeMode: 'cover',
              }}
              source={appImages.galleryPlaceHolder}
            />
          ) : (
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,

                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: hp(18),
                borderRadius: wp(3),
                resizeMode: 'cover',
              }}
              source={{uri: imageUri}}
            />
          )}
        </View>

        <View
          style={{
            position: 'absolute',
            top: hp(14),
            left: 7,
            //height: hp(3),
            //width: wp(21),
            //borderRadius: wp(3),
            //backgroundColor: '#FACA4E',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2, // Ensure it's on top
          }}>
          <Text
            style={{
              fontSize: hp(1.6),
              fontFamily: 'Inter',
              color: '#FFFFFF',
              fontWeight: '700',
            }}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsPic = item => {
    console.log('Items Pics', item);
    return (
      <TouchableOpacity
        //onPress={() => navigation.navigate('ViewVideoPicProfile')}
        style={{width: wp(28), margin: 5}}>
        <View>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: 'cover',
            }}
            source={appImages.galleryPlaceHolder}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(2),
            marginTop: hp(12.5),
          }}>
          <Text
            style={{
              fontSize: hp(1.5),
              color: '#000000',
              fontFamily: 'Inter-Regular',
              width: wp(23),
            }}>
            {item?.description}
          </Text>
          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderAvailableAppsVideo = item => {
    console.log('Video Items', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ViewVideoProfile')}
        style={{width: wp(28), margin: 5}}>
        <View>
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              zIndex: 1, // Ensure it's on top of other elements
              //flex: 1,
              width: '100%',
              height: hp(12),
              borderRadius: wp(2.1),
              resizeMode: 'cover',
            }}
            source={{uri: item.thumbnail}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(2),
            marginTop: hp(12.5),
          }}>
          <Text
            style={{
              fontSize: hp(1.5),
              color: '#000000',
              fontFamily: 'Inter-Regular',
              width: wp(23),
            }}>
            {item.description}
          </Text>

          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />
      <View style={{marginTop: hp(5), marginRight: wp(5)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showBackIcon={true}
          showSettings={true}
          onPressSettings={() => navigation.navigate('ProfileSettings')}
          showText={true}
          text={'Profile'}
        />
      </View>

      <ScrollView style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(3),
            height: hp(21),
          }}>
          <View
            style={{
              width: wp(20),
              marginLeft: wp(0.5),
              height: wp(20),
              borderRadius: wp(20) / 2,
            }}>
            <Image
              source={appImages.profileImg}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>

          <Text
            style={{
              fontSize: hp(2.3),
              //marginLeft: wp(2),
              marginTop: hp(1.3),
              color: '#FACA4E',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Medium',
            }}>
            {name}
          </Text>

          <Text
            style={{
              fontSize: hp(2),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: '#77838F',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Regular',
            }}>
            {email}
          </Text>
        </View>
        <View
          style={{
            height: hp(6.5),
            marginTop: hp(1.5),
            marginHorizontal: wp(6),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: wp(30),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              {totalVideos}
            </Text>

            <Text
              style={{
                fontSize: hp(1.8),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              Xpi/3.14 Videos
            </Text>
          </View>

          <View
            style={{
              width: wp(18),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              {totalPics}
            </Text>

            <Text
              style={{
                fontSize: hp(1.8),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              Pic Tour
            </Text>
          </View>

          <View
            style={{
              width: wp(18),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              {totalNews + totalGEBC + totalQAFI}
            </Text>

            <Text
              style={{
                fontSize: hp(1.8),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              DISC
            </Text>
          </View>

          <View
            style={{
              width: wp(21),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: hp(2.5),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#1E2022',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Bold',
              }}>
              {totalMarketZone}
            </Text>

            <Text
              style={{
                fontSize: hp(1.7),
                //marginLeft: wp(2),
                //   /marginTop:hp(0.1),
                color: '#77838F',
                //fontWeight: 'bold',
                fontFamily: 'Inter-Regular',
              }}>
              Marketpark
            </Text>
          </View>
        </View>

        <View style={{height: hp(23), marginLeft: wp(8), marginTop: hp(5)}}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: '#77838F',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Bold',
            }}>
            My Pi/3.14 Videos
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {videos?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1, marginLeft: wp(-1.5)}}
                    showsVerticalScrollIndicator={false}
                    data={videos}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsVideo(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View style={{height: hp(23), marginLeft: wp(8), marginTop: hp(1)}}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: '#77838F',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Bold',
            }}>
            My Pic Tour
          </Text>

          <View style={{marginTop: hp(1), height: '100%'}}>
            {loading === true ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#FACA4E" />
              </View>
            ) : (
              <>
                {pics?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                      No data available
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    style={{flex: 1, marginLeft: wp(-1.5)}}
                    showsVerticalScrollIndicator={false}
                    data={pics}
                    horizontal
                    //keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => renderAvailableAppsPic(item)}
                  />
                )}
              </>
            )}
          </View>
        </View>

        <View
          style={{height: hp(23), marginHorizontal: wp(8), marginTop: hp(1)}}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: '#77838F',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Bold',
            }}>
            My Disc
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LetterDetails')}>
              <Image
                source={appImages.OpenLetter}
                style={{resizeMode: 'contain', width: wp(39)}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('LetterDetails')}>
              <Image
                source={appImages.OpenLetter}
                style={{resizeMode: 'contain', width: wp(39)}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{height: hp(23), marginHorizontal: wp(8), marginTop: hp(1)}}>
          <Text
            style={{
              fontSize: hp(2.1),
              //marginLeft: wp(2),
              //   /marginTop:hp(0.1),
              color: '#77838F',
              //fontWeight: 'bold',
              fontFamily: 'Inter-Bold',
            }}>
            My Market Zone
          </Text>

          {loading === true ? (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#FACA4E" />
            </View>
          ) : (
            <>
              {marketZone?.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: hp(2.1)}}>
                    No data available
                  </Text>
                </View>
              ) : (
                <FlatList
                  style={{flex: 1, marginTop: hp(1), marginLeft: wp(-2)}}
                  showsVerticalScrollIndicator={false}
                  data={marketZone}
                  horizontal
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => renderAvailableApps(item)}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
