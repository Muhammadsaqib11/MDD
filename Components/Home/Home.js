import React from 'react'
import {
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar
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
const region = {
  latitude: 37.785834,
  longitude: -122.406417,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
}
const HomeScreen = ({ navigation }) => {
  const renderInner = () => (
    <View style={HomeStyle.panel}>
      <View style={HomeStyle.ViewTwo}>
        <View style={HomeStyle.Child_View} >
          <Ionicons style={HomeStyle.search_Icon}

            name="search" size={20} color="gray" />
          <View style={HomeStyle.InputView}>
            <Input
              placeholder="Search"
              placeholderTextColor="gray"
              style={HomeStyle.Input_style}
              autoCapitalize='none'

            />
          </View>
        </View>
        <View style={HomeStyle.Mic_View}>
          <Ionicons name="mic" size={20} color='gray' />
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          data={FeatureData && FeatureData}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  )
  const renderHeader = () => (
    <View style={HomeStyle.header}>
      <View style={HomeStyle.panelHeader}>
        <View style={HomeStyle.panelHandle} />
      </View>
    </View>
  )
  const bs = React.createRef()

  const RenderItem = ({ item, onPress, backgroundColor, textColor }) => (
    <ScrollView >
      <TouchableOpacity onPress={onPress} style={HomeStyle.itemFlat} onPress={() => navigation.navigate('Assets')}>
        <Image source={{ uri: item.Image }} style={HomeStyle.Image_style} />
        <View style={{ flexDirection: 'column', }}>

          <Text numberOfLines={1} style={HomeStyle.Text_style} > Header Place Holder </Text>
          <Text numberOfLines={3} style={HomeStyle.Des_Text} >
            {item.Des}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 15, }}>
            <Ionicons name="car" size={20} color='gray' style={HomeStyle.Car_style} />
            <Ionicons name="key" size={20} color='gray' style={HomeStyle.Key_style} />
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
  return (
    <View style={HomeStyle.container}>
      <StatusBar backgroundColor="#8FC54B" hidden={false} barStyle="dark-content" />

      <BottomSheet
        ref={bs}
        snapPoints={Platform.OS === "ios" ? [800, 385, 385] : [650, 300, 300]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        enabledContentGestureInteraction={false}
      />

      <MapView
        initialRegion={region}

        style={HomeStyle.MapView}
      // provider={PROVIDER_GOOGLE}

      // customMapStyle={ mapStandardStyle}

      >

      </MapView>
      <View style={HomeStyle.mapIcons} >
        <Ionicons name="ios-information-circle-outline" size={20} color="blue" onPress={() => navigation.navigate('Profile')} />

      </View>
      <View style={HomeStyle.mapIcons1}>
        <Entypo name="plus" size={30} color="#8AC833" style={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('pairingScreen')} />

      </View>

      {/* <View style={HomeStyle.mapPlusIcon} >
             <AntDesign name="pluscircle" size={40} color="#8AC833"  onPress={()=>navigation.navigate('pairingScreen')}/>
              
             </View> */}

    </View>
  )

}
export default HomeScreen;
