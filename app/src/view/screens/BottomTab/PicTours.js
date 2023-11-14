import {
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';

import Fontiso from 'react-native-vector-icons/Fontisto';
import Headers from '../../../assets/Custom/Headers';
import Approved from '../../../assets/svg/Approved';
import Chat from '../../../assets/svg/Chat.svg';

import Add from '../../../assets/svg/AddMainScreen.svg';

import {appImages} from '../../../assets/utilities';

import RBSheet from 'react-native-raw-bottom-sheet';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PicTours({navigation}) {
  const [selectedItemVideoId, setSelectedItemVideoId] = useState(null);

  const [selectedItemDiscId, setSelectedItemDiscId] = useState(null);

  const [selectedItemPicsId, setSelectedItemPicsId] = useState(9);

  const [selectedItemMarketId, setSelectedItemMarketId] = useState(null);

  //pic
  const [selectedItemId, setSelectedItemId] = useState(8);

  const [loading, setLoading] = useState(false);

  const [searchesData, setSearches] = useState('');

  const [selectedItem, setSelectedItem] = useState('');

  const [data, setData] = useState([]);

  const [dataLatestVideos, setDataLatestVideos] = useState([]);

  const [dataMostViewedVideos, setMostViewedVideos] = useState([]);

  const [dataMostCommentedVideos, setMostCommentedVideos] = useState([]);

  const ref_RBSheetCamera = useRef(null);

  useEffect(() => {
    // Make the API request and update the 'data' state
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    // Simulate loading
    setLoading(true);

    // Fetch data one by one
    await fetchCategory();
    await fetchTrendingVideos();
    await fetchLatestVideos();
    await fetchMostViewedVideos();
    await fetchMostCommentedVideos();

    // Once all data is fetched, set loading to false
    setLoading(false);
  };

  const fetchTrendingVideos = async () => {

    console.log("selected id trending videos", selectedItemPicsId)
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODEyMzUxNSwiZXhwIjoxNzAwNzE1NTE1fQ.0JrofPFHubokiOAwlQWsL1rSuKdnadl9ERLrUnLkd_U';

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/picTour/getAllTrendingToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings Pics Tourzs', result.Tours);
      setData(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error Trending:', error);
    }
  };

  const fetchLatestVideos = async () => {
    const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODEyMzUxNSwiZXhwIjoxNzAwNzE1NTE1fQ.0JrofPFHubokiOAwlQWsL1rSuKdnadl9ERLrUnLkd_U';

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/picTour/getAllRecentVideosByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Tours);
      setDataLatestVideos(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMostViewedVideos = async () => {
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODEyMzUxNSwiZXhwIjoxNzAwNzE1NTE1fQ.0JrofPFHubokiOAwlQWsL1rSuKdnadl9ERLrUnLkd_U';

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/picTour/getMostViewedToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings Most Viewed', result.Tours);
      setMostViewedVideos(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMostCommentedVideos = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODEyMzUxNSwiZXhwIjoxNzAwNzE1NTE1fQ.0JrofPFHubokiOAwlQWsL1rSuKdnadl9ERLrUnLkd_U';

    try {
      const response = await fetch(
        `https://watch-gotcha-be.mtechub.com/picTour/getMostCommentedToursByCategory/${selectedItemPicsId}?page=1&limit=5`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Resultings', result.Tours);
      setMostCommentedVideos(result.Tours); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCategory = async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY5ODAzOTAyNywiZXhwIjoxNzAwNjMxMDI3fQ.JSki1amX9VPEP9uCsJ5vPiCl2P4EcBqW6CQyY_YdLsk';

    try {
      const response = await fetch(
        'https://watch-gotcha-be.mtechub.com/picCategory/getAllPicCategories?page=1&limit=5',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log('Search Results', result.AllCategories);
      setSearches(result.AllCategories); // Update the state with the fetched data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const takePhotoFromCamera = value => {
    ref_RBSheetCamera.current.close();
    setSelectedItem(value);
    navigation.navigate('UploadUpdatePic');
  };

  const choosePhotoFromLibrary = value => {
    ref_RBSheetCamera.current.close();
    setSelectedItem(value);
    navigation.navigate('UploadUpdatePic');
  };

  //pics search

  const renderSearchesPic = item => {
    console.log('Items', item);
    const isSelected = selectedItemPicsId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.searchesDetails,
          {
            backgroundColor: isSelected ? '#FACA4E' : '#F2F2F2',
          },
        ]}
        onPress={() => {
          setSelectedItemPicsId(item.id);
          console.log('Selected item:', item.title);
        }}>
        <Text
          style={[
            styles.textSearchDetails,
            {color: isSelected ? '#232323' : '#939393'},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const searchesPics = [
    {id: 1, title: 'Funny'},
    {id: 2, title: 'Sports'},
    {id: 3, title: 'Historic'},
    {id: 4, title: 'Technology'},
    {id: 5, title: 'Celebrities'},
    {id: 6, title: 'Animals'},
    {id: 7, title: 'Beauty & Fashion'},
    {id: 8, title: 'People'},
    {id: 9, title: 'Food'},
    {id: 8, title: 'Science'},
    {id: 9, title: 'Nature'},
    {id: 10, title: 'Travel'},
    {id: 11, title: 'Art'},
  ];

  const renderAvailableAppsVideo = item => {
    console.log('Items of Pics', item);
    return (
      <TouchableOpacity
        onPress={() =>  navigation.navigate('PicDetails', { picData: item })}
        style={{width: wp(27), margin: 5}}>
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
              borderRadius: wp(1),
              resizeMode: 'cover',
            }}
            source={appImages.topSearches1}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(0.5),
            marginTop: hp(12.5),
          }}>
          <Text
            style={{
              fontSize: hp(1.5),
              fontFamily: 'Inter-Regular',
              color: '#000000',
              width: wp(23),
            }}>
            {item.name}
          </Text>

          <Entypo name={'dots-three-vertical'} size={14} color={'#4A4A4A'} />
        </View>
      </TouchableOpacity>
    );
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
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content" // You can set the StatusBar text color to dark or light
      />

      <View style={{marginTop: hp(5)}}>
        <Headers
          onPress={() => navigation.goBack()}
          showSearch={true}
          onPressSearch={() => navigation.navigate('SearchScreenPicTours')}
          showText={true}
          onPressListings={() => navigation.openDrawer()}
          showListings={true}
          text={'Pic Tour'}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: hp(1),
          marginHorizontal: wp(5),
        }}>
        <View
          style={{
            height: hp(18),
            marginTop: hp(-3.8),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: wp(60), resizeMode: 'contain'}}
            source={appImages.bannerAds}
          />
        </View>

        <Text
          style={{
            color: '#FACA4E',
            marginLeft: wp(3),
            fontFamily: 'Inter-Bold',
            fontSize: hp(2.3),
          }}>
          Pic Tours
        </Text>

        <View style={[styles.latestSearchList, {marginLeft: wp(3)}]}>
          <Text
            style={{color: '#232323', fontWeight: 'bold', fontSize: hp(2.1)}}>
            Top
          </Text>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={searchesData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => renderSearchesPic(item)}
          />
        </View>
        <View
          style={{marginTop: hp(1.5), flexDirection: 'row', height: hp(18)}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PicDetails')}
            style={{
              width: wp(35),
              marginLeft: wp(2.5),
              height: '100%',
              borderRadius: wp(5),
            }}>
            <Image
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1, // Ensure it's on top of other elements
                //flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: wp(3),
                resizeMode: 'cover',
              }}
              source={appImages.topSearches1}
            />
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
                name
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{marginTop: hp(0.8), marginLeft: wp(3), width: '35%'}}>
            <Text
              style={{
                fontSize: hp(1.6),
                marginLeft: wp(1),
                lineHeight: 15.5,
                fontFamily: 'Inter-Regular',
                color: '#000000',
                //fontWeight: '700',
              }}>
              Explore the intricate web of global politics in this
              thought-provoking video as we delve into the ever-shifting
              landscape of
            </Text>
          </View>
        </View>

        <View style={{marginTop: hp(1.5), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(2.5),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Trending
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
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={data}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: hp(3), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Latest Video
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
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataLatestVideos}
                horizontal
                // keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: hp(3), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Most Viewed
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
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataMostViewedVideos}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
          </View>
        </View>

        <View style={{marginTop: hp(3), height: hp(23)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              marginLeft: wp(3),
              fontFamily: 'Inter',
              color: '#4A4A4A',
              fontWeight: 'bold',
            }}>
            Most Commented
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
              <FlatList
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                data={dataMostCommentedVideos}
                horizontal
                //keyExtractor={item => item.id.toString()}
                renderItem={({item}) => renderAvailableAppsVideo(item)}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <RBSheet
        ref={ref_RBSheetCamera}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType="fade"
        minClosingHeight={0}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(25),
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(8),
            alignItems: 'center',
          }}>
          <Text style={styles.maintext}>Select an option</Text>
          <TouchableOpacity onPress={() => ref_RBSheetCamera.current.close()}>
            <Ionicons
              name="close"
              size={22}
              color={'#303030'}
              onPress={() => ref_RBSheetCamera.current.close()}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: hp(3),
          }}>
          <TouchableOpacity
            onPress={() => takePhotoFromCamera('camera')}
            style={
              selectedItem === 'camera'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <Ionicons
              color={selectedItem === 'camera' ? '#FACA4E' : '#888888'}
              name="camera"
              size={25}
            />

            <Text style={{color: '#333333'}}>From camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => choosePhotoFromLibrary('gallery')}
            style={
              selectedItem === 'gallery'
                ? styles.selectedItems
                : styles.nonselectedItems
            }>
            <MaterialCommunityIcons
              color={selectedItem === 'gallery' ? '#FACA4E' : '#888888'}
              name="image"
              size={25}
            />

            <Text style={{color: '#333333'}}>From gallery</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <TouchableOpacity
        onPress={() => ref_RBSheetCamera.current.open()}
        style={{position: 'absolute', bottom: 1, right: 25}}>
        <Add />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  latestSearchList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.1),
    height: hp(7),
    marginLeft: wp(5),
    //borderWidth: 3,
  },
  searchesDetails: {
    flexDirection: 'row',
    marginLeft: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(23),
    backgroundColor: '#F2F2F2',
    borderRadius: wp(5),
    height: hp(5),
  },
  textSearchDetails: {
    fontFamily: 'Inter',
    fontWeight: '700',
    textAlign:'center',
    fontSize: hp(1.8),
  },

  maintext: {
    fontSize: hp(2.3),
    color: '#303030',
    fontWeight: 'bold',
  },
  nonselectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#E7EAF2',
  },
  selectedItems: {
    width: wp(35),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp(14),
    borderRadius: wp(1.8),
    borderWidth: 1,
    borderColor: '#FACA4E',
  },
});
