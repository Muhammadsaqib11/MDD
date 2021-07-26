import React, { useState } from 'react';
import { Container, Content, Button, Text, Header, Left, Right, Icon, Body, Title, View, Picker } from 'native-base';
import { StatusBar } from 'react-native'
import styles from './ProfileStyle'
import BottomSheet from 'reanimated-bottom-sheet'
import HomeStyle from '../Home/HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Input, } from 'native-base'
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FeatureData from '../Home/FeatureData';
const ProfileScreen = ({ navigation }) => {
  const [selecttedvValue, setSelectedValue] = useState('1')
  const onValueChange = (e) => {
    e.preventDefault();
    const value = e.targer.value;
    setSelectedValue(value)
    console.log("selected value", selecttedvValue)
  }
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={styles.BotomSheetHeaderView}>
        <Text style={styles.BotomSheetHeader}>Select Organization</Text>
        <Picker
          mode="dropdown"
          iosIcon={<Ionicons name="arrow-down" size={20} color='gray' style={HomeStyle.Car_style} />}
          selectedValue={selecttedvValue}
          onValueChange={onValueChange}
        >
          <Picker.Item label="Wallet" value="key0" />
          <Picker.Item label="ATM Card" value="key1" />
          <Picker.Item label="Debit Card" value="key2" />
          <Picker.Item label="Credit Card" value="key3" />
          <Picker.Item label="Net Banking" value="key4" />
        </Picker>
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
  // const bs = React.createRef()
  const sheetRef = React.useRef(null);

  const RenderItem = ({ item, onPress, backgroundColor, textColor }) => (
    <ScrollView style={{ backgroundColor: "blue" }}>
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
    <Container>
      <BottomSheet
        ref={sheetRef}
        snapPoints={Platform.OS === "ios" ? [500, 0, 0] : [650, 300, 300]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        enabledContentGestureInteraction={false}
      />
      <Header style={{ backgroundColor: 'white' }}>
        <StatusBar backgroundColor="#8FC54B" hidden={false} barStyle="light-content" />
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' style={{ color: 'black', fontSize: 20 }} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.Header_TITLE}>BMW of Minettonka</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Button full style={styles.Buttonchangeorg} onPress={() => sheetRef.current.snapTo(0)}>
          <Text style={{ color: 'black', fontWeight: 'bold' }} >Change Org</Text>
        </Button>
        <Button full style={styles.ButtonChangePas}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Change Password</Text>
        </Button>
        <Button full style={styles.LogoutButton} onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Logout</Text>
        </Button>
      </Content>
    </Container>
  );
}
export default ProfileScreen;