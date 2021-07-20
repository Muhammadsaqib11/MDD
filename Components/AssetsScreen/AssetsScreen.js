import React, { useState } from 'react'
import {
    Image,
    StyleSheet,
    View,
    Text,
    FlatList, TouchableOpacity
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons//Feather'
import MapView, { PROVIDER_GOOGLE, Geojson, Marker } from "react-native-maps";
import styles from './AssetsStyle'
import { Button } from 'native-base'
import markers from './MapArray'
const region = {
    latitude: 40.7353454,
    longitude: -73.9994384,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
}
const AssetsScreen = ({ navigation }) => {
    const [state, setState] = React.useState(region);
    const renderInner = () => (
        <View style={styles.panel}>
            <View style={styles.item}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text numberOfLines={1} style={{
                        fontSize: 14,
                        marginTop: 15,
                        fontWeight: 'bold'
                    }} >U 2015 Audi S4 Prestige </Text>
                    <Button rounded style={styles.Button_style}>
                        <Ionicons name="close" color='gray' size={15} />
                    </Button>
                </View>
                <Text numberOfLines={1} style={{ fontSize: 10, fontWeight: 'bold' }} >
                    abdjskajakkakakakakakakakakakkakakakakakakakkakakak
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    <Button style={styles.FindTag_button} >
                        <Text style={{ color: "white" }} >Find- Scan for tag</Text>
                    </Button>
                    <Button style={styles.Key_Button}>
                        <Ionicons name="key" size={20} color='gray' style={{ marginLeft: 5 }} />
                        <Text style={styles.Key_text} >KEY</Text>
                    </Button>
                    <Button style={styles.car_button}>
                        <Ionicons name="car" size={20} color='black' style={{ marginLeft: 5 }} />
                        <Text style={{ marginRight: 10, fontWeight: 'bold' }} >CAR</Text>
                    </Button>
                </View>

                <Image source={{ uri: "https://cdn.pixabay.com/photo/2015/05/28/23/12/auto-788747_960_720.jpg" }}
                    style={styles.Image_Style} />

            </View>
        </View>
    )
    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} onPress={() => this.bs.current.snapTo(1)} />
            </View>
        </View>
    )
    const bs = React.createRef();
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bs}
                snapPoints={Platform.OS === "ios" ? [385, 385, 385] : [300, 300, 300]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                enabledInnerScrolling
            />
            <MapView
                initialRegion={region}
                style={styles.MapView}
            >
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
                    <FontAwesome name="key" size={40} color="red" />
                </Marker>
            </MapView>
            <View style={styles.mapIcons} >
                <Ionicons name="ios-information-circle-outline" size={20} color="blue" onPress={() => navigation.navigate('dealership')} />
            </View>
            <View style={styles.mapIcons1}>
                <Feather name="navigation" size={20} color="blue" />
            </View>
        </View>
    )
}
export default AssetsScreen;

