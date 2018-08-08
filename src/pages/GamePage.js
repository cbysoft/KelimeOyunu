
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Action, Actions } from 'react-native-router-flux';
import Index from './index.js';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  render() {
    return (
      <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5,alignItems: 'center' }} >
        <StatusBar hidden={true} />
       
        <View style={{ flex: 0.44,width:'100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#610B5E' }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
        </View>

        <View style={{ flex: 5,width:'80%' }}>
          <View style={{ flex: 15, justifyContent: 'space-between'}}>

            <View style={{ flex: 2.2 }}>


            </View>
            <View style={{ flex: 5 }}>
              <TouchableOpacity onPress={() => Actions.Game1()} style={styles.btn}> 
                <Text style={{ backgroundColor: '#9b30ff', padding: 15, borderRadius: 15, fontWeight: 'bold', color: 'white', fontSize: 15, textAlign: 'center', }}>
                Game 1</Text>
              </TouchableOpacity>

            </View>

            <View style={{ flex: 5 }}>
              <TouchableOpacity onPress={() => Actions.Game2()} style={styles.btn}>
                <Text style={{ backgroundColor: '#cd3333', padding: 15, borderRadius: 15, fontWeight: 'bold', color: 'white', fontSize: 15, textAlign: 'center', }}>Game 2</Text>
              </TouchableOpacity>

            </View>

            <View style={{ flex: 5 }}>
              <TouchableOpacity onPress={() => Actions.Game3()} style={styles.btn}>
                <Text style={{ backgroundColor: '#6b8e23', padding: 15, borderRadius: 15, fontWeight: 'bold', color: 'white', fontSize: 15, textAlign: 'center', }}>Game 3</Text>
              </TouchableOpacity>

            </View>

            <View style={{ flex: 5 }}>
              <TouchableOpacity onPress={() => Actions.Game4()} style={styles.btn}>
                <Text style={{ backgroundColor: '#1b8bb4', padding: 15, borderRadius: 15, fontWeight: 'bold', color: 'white', fontSize: 15, textAlign: 'center', }}>Game 4</Text>
              </TouchableOpacity>

            </View>

            <View style={{ flex: 5 }}>
              <TouchableOpacity onPress={() => Actions.Game5()} style={styles.btn}>
                <Text style={{ backgroundColor: '#8b658b', padding: 15, borderRadius: 15, fontWeight: 'bold', color: 'white', fontSize: 15, textAlign: 'center', }}>Game 5</Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

        <View style={{ flex: 0.4, flexDirection: 'row' }}>


          <TouchableOpacity onPress={() => Actions.MainPage()} activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#380B61', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Image source={require('./app/img/home_icon.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 15, justifyContent: 'center', }}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.80} style={{ flex: 1, backgroundColor: '#610B5E', borderRightColor: "white", alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Image source={require('./app/img/game_icon_s.fw.png')} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}></Image>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: 'blue', fontSize: 15, justifyContent: 'center', }}>Game</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabbar: {
    backgroundColor: '#00ffff',
    padding: 20
  },
  menubar: {
    backgroundColor: 'red',
    padding: 20,


  },

  btn: {
    width: '100%',
    height: '100%'
  },
});
