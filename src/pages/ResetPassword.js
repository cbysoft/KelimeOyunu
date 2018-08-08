import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Alert, Image, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import Index from './index.js'; import { Action, Actions } from 'react-native-router-flux';

export default class App extends Component {
  eml = ""; fkey = 0; password = ""
  kodgonder = 0
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      eml: "",
      fkey: 0,
      password: ""
    }
  }
  componentDidMount() {
    if (this.kodgonder == 1) {
      this.ForgotService();
    }
  }
  ForgotService() {
    return fetch('http://192.168.43.217:80/KelimeOyunu/public/api/users/reset', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.eml,
        forgotKey: this.state.fkey,
        password: this.state.newPas
      }),

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          sonuc: responseJson.Result
        });
        this.snc();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  fonkS = () => {
    this.kodgonder = 1
    this.componentDidMount()

  }
  snc() {
    if (this.state.sonuc == "ok") {
      Alert.alert(
        'Dikkat',
        'Şifreniz başarıyla değişti',
        [
          { text: 'Giriş Yap', onPress: () => Actions.Login(), style: 'cancel' },
        ],
        { cancelable: false }
      )
    } else if (this.state.sonuc == null) { Alert.alert("Lütfen bilgileri eksiksiz girin.  ") }
    else {
      Alert.alert(this.state.sonuc)
    }
  }
  render() {
    return (
      <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, alignItems: 'center', justifyContent: 'center', }} >
        <StatusBar hidden={true} />
        <View style={{ flex: 0.6, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#380B61' }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
        </View>
        <View style={styles.Main}>

          <View style={styles.ads}>
            <View style={styles.leftText}>
              <Text style={{ fontSize: 25 }}>Email </Text>
            </View>
            <View style={styles.RightView}>
              <TextInput keyboardType='email-address' onChangeText={(eml) => this.setState({ eml })} style={styles.textinput} />
            </View>
          </View>
          <View style={styles.ads}>
            <View style={styles.leftText}>
              <Text style={{ fontSize: 25 }}>Kod </Text>
            </View>
            <View style={styles.RightView}>
              <TextInput keyboardType='numeric' maxLength={6} onChangeText={(fkey) => this.setState({ fkey })} style={styles.textinput} />
            </View>
          </View>
          <View style={styles.ads}>
            <View style={styles.leftText}>
              <Text style={{ fontSize: 25 }}>Şifre</Text>
            </View>
            <View style={styles.RightView}>
              <TextInput secureTextEntry={true} maxLength={8} onChangeText={(newPas) => this.setState({ newPas, kodgonder: 1 })} style={styles.textinput} />
            </View>
          </View>

          <TouchableOpacity style={styles.btn} onPress={this.fonkS}>
            <Text style={styles.btnText}>Şifreyi değiştir</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground >
    );
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
    backgroundColor: '#4E6178',
    width: 150,
    height: 40,
    marginTop: 15,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
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
