import React, { Component } from 'react';
import {
  Platform, StyleSheet, View, Text, Image, Alert, ActivityIndicator, ImageBackground, TouchableOpacity, NetInfo, StatusBar, AsyncStorage
} from 'react-native';
import Index from './index.js';
import { Action, Actions } from 'react-native-router-flux';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      id: 0,
      networkT: ""
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('isLogin').then(value => this.setState({ isLogin: value }))
    AsyncStorage.getItem('id').then(valueId => this.setState({ id: valueId }))
    NetInfo.fetch().done(
      (networkType) => {
        this.setState({ networkT: networkType })
      }
    )

  }
  async getNetworkType() {
    try{
    var snc = await NetInfo.fetch().done(
      (networkType) => {
        this.setState({ networkT: networkType })
      }
    )}catch(e){
      Alert.alert("Lütfen internet bağlantınızı kontrol edin")
    }
    if (snc == null || snc == 0) {
      //hata
    } else {
      this.componentDidMount()
    }
  }

  render() {
    if (this.state.networkT == "NONE") {
      return (
        <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
          <StatusBar hidden={true} />
          <View style={{ flex: 0.44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8A084B' }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
          </View>

          <View style={{ flex: 5, justifyContent: 'center' }}>
            <ActivityIndicator size='large' />
            {Alert.alert("Lütfen internet bağlantınızı kontrol edin")}
          </View>

          <View style={{ flex: 0.4, flexDirection: 'row' }}>
            <TouchableOpacity activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#380B61', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Image source={require('./app/img/home_icon_s.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 15, justifyContent: 'center', }}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.GamePage()} activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#610B5E', borderRightColor: "white", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Image source={require('./app/img/game_icon.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, justifyContent: 'center', }}>Game</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.ProfilPage()} activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#8A084B', borderRightColor: "white", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Image source={require('./app/img/user_icon.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, justifyContent: 'center', }}>Profile</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ImageBackground>


      );
    }
    else {
      if (this.state.isLogin == false || this.state.id == 0) {
        return (
          <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
            <StatusBar hidden={true} />
            <View style={{ flex: 0.44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8A084B' }}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
            </View>

            <View style={{ flex: 5, justifyContent: 'center' }}>
              <ActivityIndicator size='large' />
              <View style={{ flex: 1, justifyContent: 'center' }}>
                {Actions.Login()}
              </View>
            </View>

            <View style={{ flex: 0.4, flexDirection: 'row' }}>
              <TouchableOpacity activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#380B61', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={require('./app/img/home_icon_s.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 15, justifyContent: 'center', }}>Home</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.GamePage()} activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#610B5E', borderRightColor: "white", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={require('./app/img/game_icon.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, justifyContent: 'center', }}>Game</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.ProfilPage()} activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#8A084B', borderRightColor: "white", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Image source={require('./app/img/user_icon.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, justifyContent: 'center', }}>Profile</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>

        );
      }
    else return (
        <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
          <StatusBar hidden={true} />
          <View style={{ flex: 0.44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8A084B' }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
          </View>

          <View style={{ flex: 5, justifyContent: 'center' }}>
            <ActivityIndicator size='large' />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {Actions.MainPage()}
            </View>
          </View>

          <View style={{ flex: 0.4, flexDirection: 'row' }}>
            <TouchableOpacity activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#380B61', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Image source={require('./app/img/home_icon_s.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 15, justifyContent: 'center', }}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.GamePage()} activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#610B5E', borderRightColor: "white", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Image source={require('./app/img/game_icon.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, justifyContent: 'center', }}>Game</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.ProfilPage()} activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#8A084B', borderRightColor: "white", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Image source={require('./app/img/user_icon.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, justifyContent: 'center', }}>Profile</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ImageBackground>

      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
