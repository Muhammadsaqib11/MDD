import React, { useState, useEffect } from 'react'
import {
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  SafeAreaView
} from 'react-native'

import BottomSheet from 'reanimated-bottom-sheet'
import HomeStyle from '../Home/HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FeatureData from '../Home/FeatureData'
import MapView from "react-native-maps";
import Entypo from 'react-native-vector-icons/Entypo'
import { Input, } from 'native-base'
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import customAxios from '../../axios.client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getValue } from '../StorageWraper';
import { markersTest } from '../Map/model/mapArray';




const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 280;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
import Loader from '../Loader';

const region = {
  latitude: 37.785834,
  longitude: -122.406417,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
}

const HomeScreen = ({ navigation }) => {
  const [apiData, setApiData] = useState(null)
  const [token, setToken] = useState(null)
  const [inventory, setInventory] = useState([])
  const [filterData, setFilterData] = useState([])

  const [indexvalue, setIndexValue] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    customAxios.post('/organizations/BOM/inventory')
      .then(response => {
        setInventory(response.data.inventory)
        setFilterData(response.data.inventory)

      })
      .catch(error => console.log("error", error));
  }, [])

  useEffect(() => {
    console.log("filterData", filterData)
  }, [filterData]);
  let mapAnimation = new Animated.Value(0);
  const FetchAssetData = (e) => {
    setIndexValue(e)
    const Assetdata = inventory[e];
    navigation.navigate('Assets', {
      itemId: e,
      otherParam: Assetdata,
    });
  }
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value)
  }
  const searchFilter = (text) => {
    if (text) {
      console.log("text")
      const newData = inventory.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase();
        console.log(textData)
        return itemData.indexOf(textData) > -1;
      })
      setFilterData(newData)
      setSearch(text)
    }
    else {
      setFilterData(inventory);
      setSearch(text)
    }
  }


  // console.log("inventory", inventory)
  const renderInner = () => (
    <View style={HomeStyle.panel}>
      <View style={HomeStyle.ViewTwo}>
        <View style={HomeStyle.Child_View} >
          <Ionicons style={HomeStyle.search_Icon}
            name="search" size={20} color="gray" />
          <View style={HomeStyle.InputView}>
            <Input
              placeholder="Search here"
              placeholderTextColor="gray"
              style={HomeStyle.Input_style}
              autoCapitalize='none'
              defaultValue={search}
              value={search}
              onChangeText={(text) => searchFilter(text)}
            />
          </View>
        </View>
        <View style={HomeStyle.Mic_View}>
          <Ionicons name="mic" size={20} color='gray' />
        </View>
      </View>

      <View style={{ flex: 1, marginTop: 10 }}>

        <FlatList
          data={filterData}
          renderItem={(index) => RenderItem(index)}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={ListEmptyView}

        // index={index}
        />
      </View>

    </View>
  )

  const bs = React.createRef()
  const RenderItem = ({ item, index, backgroundColor, textColor }) => (
    <ScrollView key={index} style={{ flex: 1 }}>
      <TouchableOpacity style={HomeStyle.itemFlat} onPress={() => FetchAssetData(index)}>


        <Image source={{ uri: item.image }} style={{ height: 70, width: 70, resizeMode: 'contain', marginTop: 15 }} />

        {/* <Image source={require("../../Assets/Img/mdd.png")} /> */}
        <View style={{ flexDirection: 'column', marginTop: 10 }}>
          {/* {console.log("title", item.title)} */}
          <Text numberOfLines={1} style={{ color: 'black', width: '120%' }} > {item.title} </Text>
          {
            item && item.subtitles.map((sub, index) => {
              return (

                <Text numberOfLines={1} style={HomeStyle.Des_Text} >
                  {sub.display} : {sub.value}
                </Text>
              )
            })
          }
          {/* <View style={{ flexDirection: 'row', marginTop: 10, }}>
            <Ionicons name="car" size={20} color='gray' style={HomeStyle.Car_style} />
            <Ionicons name="key" size={20} color='gray' style={HomeStyle.Key_style} />
          </View> */}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
  const ListEmptyView = () => {
    return (
      <View >
        <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400' }}> loading...</Text>
      </View>

    );
  }
  const interpolations = inventory && inventory.location && inventory.location.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });


  return (
    <View style={HomeStyle.container}>
      <StatusBar backgroundColor="#8FC54B" hidden={false} barStyle="dark-content" />
      <BottomSheet
        ref={bs}
        snapPoints={Platform.OS === "ios" ? [800, 385, 385] : [650, 300, 300]}
        renderContent={renderInner}
        // renderHeader={renderHeader}
        initialSnap={1}
        enabledContentGestureInteraction={false}
      />

      <MapView
        initialRegion={region}

        style={HomeStyle.MapView}
      // provider={PROVIDER_GOOGLE}

      // customMapStyle={ mapStandardStyle}

      >
        {inventory && inventory.location && inventory.location.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapView.Marker key={index}

              coordinate={{ latitude: marker.coordinates.lat, longitude: marker.coordinates.longitude }}
            // onPress={(e) => onMarkerPress(e)}
            >
              {console.log("marker", marker.coordinates)}
              <Animated.View style={[HomeStyle.markerWrap]}>
                <Animated.Image
                  source={require('../../Assets/Img/marker.png')}
                  style={[HomeStyle.marker]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}

      </MapView>
      <View style={HomeStyle.mapIcons} >
        <Ionicons name="ios-information-circle-outline" size={20} color="blue" onPress={() => navigation.navigate('Profile')} />

      </View>
      <View style={HomeStyle.mapIcons1}>
        <Entypo name="plus" size={30} color="#8AC833" style={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('pairingScreen')} />

      </View>

    </View>
  )
}
export default HomeScreen;
