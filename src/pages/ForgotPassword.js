import React, { Component } from 'react';
import { Platform, StyleSheet, Button, Text, TouchableOpacityi, Alert, TextInput, View, Image, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import Index from './index.js';
import { Action, Actions } from 'react-native-router-flux';
export default class App extends Component {
  eml = ""
  kodgonder = 0
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      kodgonder: 0,
      eml: ""
    }
  }
  gonderdi=0
  componentDidMount() {
    if (this.state.kodgonder == 1) {
      this.ForgotService(),
        Alert.alert(
          'Dikkat',
          'Doğrulama kodu e-mailinize gönderildi.',
          [
            { text: 'Şifreyi yenile', onPress: () => Actions.ResetPassword(), style: 'cancel' },
          ],
          { cancelable: false }
        ),
        this.gonderdi=1
    }
  }

  ForgotService() {
    return fetch('http://192.168.43.217:80/KelimeOyunu/public/api/users/forgot', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.eml
      }),

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          sonuc: responseJson.result
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fonk = () => {
    this.setState({
      kodgonder: 1
    });
    this.componentDidMount()
  }
  fonkS = () => {
    if(this.gonderdi==0)  this.componentDidMount()
    else Alert.alert(
      'Dikkat',
      'Kod zaten gönderildi.',
      [
        { text: 'Şifreyi yenile', onPress: () => Actions.ResetPassword(), style: 'cancel' },
      ],
      { cancelable: false }
    )
  }


  render() {
    return (
      <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
        <StatusBar hidden={true} />
        <View style={{ flex: 0.44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#380B61' }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
        </View>
        <View style={styles.Main}>
          <Text style={{ fontSize: 25 }}>Email </Text>
          <TextInput keyboardType='email-address' onChangeText={(eml) => this.setState({ eml, kodgonder: 1 })} style={styles.textinput} />
          <TouchableOpacity style={styles.btn} onPress={this.fonkS}>
            <Text style={styles.btnText}>Kodu gönder</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  Main: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#123',
    width: '70%',
  },
  btn: {
    backgroundColor: '#4E6178',
    width: '50%',
    height: '8%',
    marginTop: '2%',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  }

});
