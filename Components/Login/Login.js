import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Content, Form, Item, Input, Button, Text, ActivityIndicator } from 'native-base';
import Loginstyles from './LoginStyle';
// import {LoginSuccess} from '../../Redux/Actions/LoginAction'
import { fetchUsers } from '../../Store/actions/LoginAction'
import { useSelector, useDispatch } from 'react-redux'
import Auth from '@aws-amplify/auth';
function loginScreen({ navigation }) {
  const [username, setUserName] = useState('');
  const [userNameError, setUsernameError] = useState('')
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch()
  const reduxData = useSelector((state) => state)
  // const handleSubmit = () => {

  //   if (username === '') {
  //     console.log("if")
  //     setUsernameError("Please Enter User Name")
  //   }
  //   else if (password === '') {
  //     console.log("else")
  //     setPasswordError("Please Enter password")
  //   }
  //   else {
  //     console.log("else", username, password)
  //     setTimeout(() => {
  //       console.log("dealer")
  //       dispatch(fetchUsers({ username, password }))
  //       navigation.navigate('Home')
  //     }, 1000);
  //   }
  // }
  const SignIn = () => {
    Auth.signIn({
      username: 'hamid@mdd.io',
      password: 'Changeme123',
    })
      .then(res => {
        console.log('succes for login', res);
      })
      .catch(err => {
        console.log('error for signIn', err);
      });
  };
  return (
    <View style={Loginstyles.mainViewContainer}>
      <View style={Loginstyles.mainView}>
        <Image source={require('../../Assets/Img/mdd.png')} />
      </View>
      <Content>
        <Form style={Loginstyles.formContainer}>
          <Item regular style={{ borderRadius: 5 }}>
            <Input placeholder='Username' style={Loginstyles.inputfield}
              onChangeText={username => setUserName(username)}
              defaultValue={username} />
            {console.log(username)}
          </Item>
          <Text style={{ color: 'red' }}>{userNameError}</Text>
          <Item regular style={{ marginTop: 10, borderRadius: 5 }}>

            <Input placeholder='Password'
              style={Loginstyles.inputfield}
              secureTextEntry={true}
              defaultValue={password}

              onChangeText={password => setPassword(password)}
            />
          </Item>
          <Text style={{ color: 'red' }}>{passwordError}</Text>
          <Button style={Loginstyles.loginButton} onPress={SignIn}>
            <Text>SIGN IN</Text>
          </Button>
        </Form>
        <View style={Loginstyles.forgotContainer}>
          <Button transparent
            style={Loginstyles.forgotText}
            onPress={() => navigation.navigate('forgot')}
          >
            <Text  >Forgot Password ?</Text>
          </Button>
        </View>

        <View style={Loginstyles.lastContainer}>
          <Text style={Loginstyles.textLast}>By Proceeding you also agree to the term of Service</Text>
          <Text style={Loginstyles.textLastTwo}>and Privacy Policy</Text>
        </View>
      </Content>
    </View>
  );
}


export default loginScreen;