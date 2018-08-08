
import React, { Component } from 'react';
import Index from './index.js';
import { Action, Actions } from 'react-native-router-flux';
import {
  Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity,
  FlatList, ListView, StatusBar, ActivityIndicator, AsyncStorage, ScrollView, Alert
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';//npm i --save react-native-progress-circle
export default class App extends Component {
  userıd = 0
  g1 = 0
  cgr = false
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      g1: 0,
      g2: 0,
      g3: 0,
      g4: 0,
      g5: 0,
      userId: 0
    }
  }
  async getUserIdd() {
    var valueId = await AsyncStorage.getItem('id')
    if (valueId == null || valueId == 0) {
      //alert("boşşş")
    } else {
      this.setState({ id: valueId })
      this.cgr = true
      this.componentDidMount()
    }
  }

  componentDidMount() {
    if (this.cgr == false) this.getUserIdd()
    if (this.cgr) {
      try {
        return (
          this.RandomWordS(),
          this.StatisticServiceG1(),
          this.StatisticServiceG2(),
          this.StatisticServiceG3(),
          this.StatisticServiceG4(),
          this.StatisticServiceG5()
        );
      } catch (e) {
        this.hataMesajı()
      }
    }
  }

  RandomWordS() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/RandomWord')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          rndTr: responseJson.tr,
          rndEng: responseJson.eng
        }, function () {
        });
      })
      .catch((error) => {
        // this.hataMesajı()
      });
  }
  StatisticServiceG1() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/statistic/SumShow', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        game: 1,
      }),

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          g1: (100 / responseJson.Sum * responseJson.TrueSum) > 0 ? (100 / responseJson.Sum * responseJson.TrueSum) : 0
        });
      })
      .catch((error) => {
        // this.hataMesajı()
      });
  }
  StatisticServiceG2() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/statistic23/SumShow', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        game: 2,
      }),

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          g2: (100 * (responseJson.SumT / responseJson.SumQ)) > 0 ? (100 * (responseJson.SumT / responseJson.SumQ)) : 0
        })
      })
      .catch((error) => {
        // this.hataMesajı()
      });
  }
  StatisticServiceG3() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/statistic23/SumShow', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        game: 3,
      }),

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          g3: (100 * (responseJson.SumT / responseJson.SumQ)) > 0 ? (100 * (responseJson.SumT / responseJson.SumQ)) : 0

        });
      })
      .catch((error) => {
        //this.hataMesajı()
      });
  }
  StatisticServiceG4() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/statistic/SumShow', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        game: 4,
      }),

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          g4: (100 / responseJson.Sum * responseJson.TrueSum) > 0 ? (100 / responseJson.Sum * responseJson.TrueSum) : 0

        });
      })
      .catch((error) => {
        //  this.hataMesajı()
      });
  }
  StatisticServiceG5() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/statistic/SumShow', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        game: 5,
      }),

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          g5: (100 / responseJson.Sum * responseJson.TrueSum) > 0 ? (100 / responseJson.Sum * responseJson.TrueSum) : 0
        });
      })
      .catch((error) => {
        //this.hataMesajı()
      });
  }

  hataMesajı() {
    Alert.alert(
      'HATA!',
      'Bir hata oluştu.',
      [
        {
          text: 'Tekrar yükle', onPress: () => Actions.Loading()
        },
      ],
      { cancelable: false }
    )
  }
  render() {

    if (this.state.isLoading) {
      return (<ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
        <StatusBar hidden={true} />

        <View style={{ flex: 0.44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8A084B' }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
        </View>

        <View style={{ flex: 5, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />

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

      </ImageBackground>);
    }
    return (

      <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
        <View style={{ flex: 1 }}>
          <StatusBar hidden={true} />
          <View style={{ flex: 0.44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#380B61' }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
          </View>
          <View style={{ flex: 5 }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.container}>
                <View style={styles.Up}>
                  <Text style={{
                    fontSize: 22, color: '#0489B1', textDecorationLine: "underline",
                    textDecorationStyle: "solid", marginBottom: 10,
                  }}>Günün Kelimesi</Text>
                  <Text style={{ fontSize: 15, color: '#8A0808', marginBottom: 10 }}> {this.state.rndEng}
                    <Text style={{ color: '#070719', }}> -> </Text>
                    <Text style={{ color: '#0489B1', }}> {this.state.rndTr}</Text>
                  </Text>

                </View>
                <View style={styles.Statistic}>

                  <Text style={{ fontSize: 22, color: '#0489B1', marginTop: 15, marginBottom: 20, textDecorationLine: "underline", textDecorationStyle: "solid", }}>
                    Başarı İstatistiği
              </Text>
                  <View style={{ flexDirection: 'row', }}>
                    <View style={styles.percentCont}>
                      <Text style={styles.gameText}>Game 1</Text>
                      <ProgressCircle percent={this.state.g1} radius={35} borderWidth={4} shadowColor="#123" color="#3399FF" bgColor="#fff">
                        <Text style={{ fontSize: 18 }}>{parseInt(this.state.g1)}%</Text>
                      </ProgressCircle>
                    </View>
                    <View style={styles.percentCont}>
                      <Text style={styles.gameText}>Game 2</Text>
                      <ProgressCircle percent={this.state.g2} radius={35} borderWidth={4} shadowColor="#123" color="#3399FF" bgColor="#fff">
                        <Text style={{ fontSize: 18 }}>{parseInt(this.state.g2)}%</Text>
                      </ProgressCircle>
                    </View>
                    <View style={styles.percentCont}>
                      <Text style={styles.gameText}>Game 3</Text>
                      <ProgressCircle percent={this.state.g3} radius={35} borderWidth={4} shadowColor="#123" color="#3399FF" bgColor="#fff">
                        <Text style={{ fontSize: 18 }}>{parseInt(this.state.g3)}%</Text>
                      </ProgressCircle>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.percentCont}>
                      <Text style={styles.gameText}>Game 4</Text>
                      <ProgressCircle percent={this.state.g4} radius={35} borderWidth={4} shadowColor="#123" color="#3399FF" bgColor="#fff">
                        <Text style={{ fontSize: 18 }}>{parseInt(this.state.g4)}%</Text>
                      </ProgressCircle>
                    </View>
                    <View style={styles.percentCont}>
                      <Text style={styles.gameText}>Game 5</Text>
                      <ProgressCircle percent={this.state.g5} radius={35} borderWidth={4} shadowColor="#123" color="#3399FF" bgColor="#fff">
                        <Text style={{ fontSize: 18 }}>{parseInt(this.state.g5)}%</Text>
                      </ProgressCircle>
                    </View>
                  </View>

                </View>

              </View>
            </ScrollView>
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
        </View>

      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  Up: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    width: '90%',
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 10,
    marginTop: 10

  },
  Statistic: {
    padding: 0,
    alignItems: 'center',
    flex: 4,
    width: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  percentCont: { margin: 5, alignItems: 'center', },
  gameText: {
    fontSize: 15,
    marginBottom: 5,
    color: '#6E6E6E'
  },
  gameText: {
    fontSize: 15,
    marginBottom: 5,
    color: '#6E6E6E'
  }
});