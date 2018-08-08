import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  StatusBar
} from 'react-native';
import Index from './index.js';
import { Action, Actions } from 'react-native-router-flux';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      email: "",
      password: ""
    }
  }
  durum = false
  componentDidMount() {
    AsyncStorage.getItem('isLogin').then(value => this.setState({ isLogin: value }))
    AsyncStorage.getItem('id').then(valueId => this.setState({ id: valueId }))
    if (this.durum) {
      return (
        this.servis());
    }
  }
  session(status) {
    AsyncStorage.setItem('isLogin', status);
    AsyncStorage.getItem('isLogin').then(value => this.setState({ isLogin: value }))
    //alert(status)
  }
  setData(valueId) {
    if (valueId != 0) {
      AsyncStorage.setItem('id', valueId.toString());
    }
  }


  servis() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/users/sign', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          sonuc: responseJson.Result,
          id: responseJson.UserId
        });
        this.snc();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  snc() {
    if (this.state.sonuc == "ok") {
      
      Alert.alert(
        'Hoş Geldiniz :)',
        'Uygulama açılıyor..',
        [
          {
            text: 'Tamam', onPress: () => Actions.MainPage()
          },
        ],
        { cancelable: false }
      )
      this.setData(this.state.id);
      this.session('true');
    } else if (this.state.sonuc == null) { Alert.alert("Lütfen bilgileri eksiksiz girin ") }
    else {
      Alert.alert(this.state.sonuc)
    }
  }
  fonk = () => {
    this.durum = true;
    this.componentDidMount()
  }

  render() {
    if (this.state.isLogin == 'true') {
      return (
        <View>
          {Actions.MainPage()}
        </View>

      );
    }
    else {
      return (
        <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, alignItems: 'center', justifyContent: 'center', width: '100%' }} >
          <StatusBar hidden={true} />
          <View style={{ flex: 0.44, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#380B61' }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
          </View>
          <View style={{ flex: 5, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
            <View style={styles.Main}>

              <View style={styles.ads}>
                <View style={styles.leftText}>
                  <Text style={{ fontSize: 25 }}>E-mail </Text>
                </View>
                <View style={styles.RightView}>
                  <TextInput keyboardType='email-address'
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(email) => this.setState({ email })}
                  />
                </View>
              </View>

              <View style={styles.ads}>
                <View style={styles.leftText}>
                  <Text style={{ fontSize: 25 }}>Şifre </Text>
                </View>
                <View style={styles.RightView}>
                  <TextInput secureTextEntry={true}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(password) => this.setState({ password })}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={this.fonk}
                activeOpacity={0.80} style={styles.btn}>
                <Text style={styles.btnText}>Giriş yap</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row',marginTop:'5%', width: '70%', justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => { Actions.CreateAccount(); }} activeOpacity={0.80}>
                  <Text textDecorationLine='underline' style={{textDecorationLine: 'underline',}}>Kayıt ol</Text>
                </TouchableOpacity>
                <Text style={{}}>  -  </Text>
                <TouchableOpacity onPress={() => { Actions.ForgotPassword(); }} activeOpacity={0.80} >
                  <Text style={{textDecorationLine: 'underline',}}>Şifremi Unuttum</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          <View style={{ flex: 0.4, flexDirection: 'row' }}>



          </View>

        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  Main: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#123',
    width: '100%',
  },
  btn: {
    backgroundColor: '#0B4C5F',
    width: '70%',
    height: 40,
    marginTop: 15,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn1: {
    backgroundColor: '#4E6178',
    width: 150,
    height: 40,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftText: {
    flex: 2
  },
  RightView: { flex: 3 },
  ads: {
    flexDirection: 'row',
    marginTop: '3%'
  }
});
