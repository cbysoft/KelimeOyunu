import React, { Component } from 'react';
import {
  Platform, StyleSheet, TextInput, FlatList, Text, Alert, View,
  ActivityIndicator, Image, ImageBackground, TouchableOpacity, StatusBar, AsyncStorage, ScrollView
} from 'react-native';
import Index from './index.js';
import { Action, Actions } from 'react-native-router-flux';

export default class App extends Component {
  i = 0;
  sorusirasi = 0;
  cevap = 0;
  cgr = false;
  userıdCgr = false
  constructor(props) {
    super(props);
    this.state = {
      english: [],
      img1: [],
      img2: [],
      SoruId: [],
      JsonParse: false,
    }
  }
  async getUserIdd() {
    var valueId = await AsyncStorage.getItem('id')
    if (valueId == null || valueId == 0) {
      //hata
    } else {
      this.setState({ id: valueId })
      this.userıdCgr = true
      this.componentDidMount()
    }
  }
  componentDidMount() {
    if (this.userıdCgr == false) this.getUserIdd()
    if (this.userıdCgr) {
      if (this.cgr) {
        return (
          this.gameeee4(),
          this.StatisticService()
        );
      }
      return (
        this.gameeee4()
      );
    }
  }
  gameeee4() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/game4/Show')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.words,
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  StatisticService() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/statistic/store ', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usersId: this.state.id,
        game: 4,
        questionId: this.state.SoruId[this.sorusirasi - 1],
        answer: this.cevap,
      }),

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
        });
      })
      .catch((error) => {
        Alert.alert(
          'Dikkat',
          'Bir hata oluştu.',
          [
            { text: 'Oyunu bitir', onPress: () => Actions.MainPage(), style: 'cancel' },
            { text: 'Yeni oyuna başla', onPress: () => Actions.Game4() },
          ],
          { cancelable: false }
        )
      });
  }
  float2int(value) {
    return value | 0;
  }
  sirala() {
    if (this.sorusirasi < this.state.english.length) {
      bskki = (this.sorusirasi + 6) % this.state.english.length
      cskki = (this.sorusirasi + 13) % this.state.english.length
      dskki = (this.sorusirasi + 11) % this.state.english.length
      a = <TouchableOpacity onPress={this.Asecenek} style={styles.btn}><Text style={styles.btnText}>{this.state.english[this.sorusirasi]}  </Text></TouchableOpacity>
      b = <TouchableOpacity onPress={this.yanlisFonk} style={styles.btn}><Text style={styles.btnText}>{this.state.english[bskki]} </Text></TouchableOpacity>
      c = <TouchableOpacity onPress={this.yanlisFonk} style={styles.btn}><Text style={styles.btnText}>{this.state.english[cskki]}  </Text></TouchableOpacity>
      d = <TouchableOpacity onPress={this.yanlisFonk} style={styles.btn}><Text style={styles.btnText}>{this.state.english[dskki]}  </Text></TouchableOpacity>
      uretilen = [];
      liste = []
      var min = 1;
      var max = this.state.english.length + 1;
      /*  for (i = 1; i <= 4; i++) {
          var rand = this.float2int(min + (Math.random() * (max - min)));
          for (j = 1; j <= i; j++) {
            if (uretilen[j] == rand) {
              rand = this.float2int(min + (Math.random() * (max - min)));
              j = 1;
            }
          }
          uretilen[i] = rand
        }*/
      uretilen[1] = this.float2int(min + (Math.random() * (max - min)));
      do {
        uretilen[2] = rand = this.float2int(min + (Math.random() * (max - min)));
      } while (uretilen[1] == uretilen[2])
      do {
        uretilen[3] = this.float2int(min + (Math.random() * (max - min)));
      } while (uretilen[3] == uretilen[1] || uretilen[3] == uretilen[2])
      do {
        uretilen[4] = this.float2int(min + (Math.random() * (max - min)));
      } while (uretilen[4] == uretilen[1] || uretilen[4] == uretilen[2] || uretilen[4] == uretilen[3])

      for (i = 1; i <= 4; i++) {
        if (uretilen[i] == 1) liste.push(a)
        if (uretilen[i] == 2) liste.push(b)
        if (uretilen[i] == 3) liste.push(c)
        if (uretilen[i] == 4) liste.push(d)
      }

      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
          {liste}
        </View>
      );
    }
  }
  dogru = 0;
  Asecenek = () => {
    Alert.alert(
      'Tebrikler',
      'Doğru cevapladınız.',
      [
        { text: 'Devam et', onPress: () => this.dogruFonk(), style: 'cancel' },
      ],
      { cancelable: false }
    );
  }
  dogruFonk = () => { this.dogru++; this.cevap = 1; this.next() }
  ynlsFonk = () => { this.cevap = 0; this.next() }
  yanlisFonk = () => {
    Alert.alert(
      'Üzgünüm :(',
      'Yanlış cevapladınız.',
      [
        { text: 'Devam et', onPress: () => this.ynlsFonk(), style: 'cancel' },
      ],
      { cancelable: false }
    );
  }

  next = () => {
    if (this.sorusirasi == 3) {
      this.sorusirasi++;
      this.cgr = true;
      this.componentDidMount();
      Alert.alert(
        'Oyun Bitti',
        this.dogru + ' tane doğrunuz var.',
        [
          { text: 'Oyunu bitir', onPress: () => Actions.MainPage(), style: 'cancel' },
          { text: 'Yeni oyuna başla', onPress: () => Actions.GamePage() },
        ],
        { cancelable: false }
      )

    } else {
      this.sorusirasi++;
      this.cgr = true;
      this.componentDidMount();
      this.sirala();
    }
  }
  render() {
    if (this.state.JsonParse == false) {
      return (
        <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} >
          <ActivityIndicator size="large" />
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => {
              this.setState({ JsonParse: true });
              this.state.SoruId[this.i] = (item.id);
              this.state.english[this.i] = (item.eng);
              this.state.img1[this.i] = (item.image1);
              this.state.img2[this.i] = (item.image2);
              this.i++

            }}
            keyExtractor={(item, index) => index}
          />
        </ImageBackground>
      );
    }
    else {
      return (

        <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
          <ScrollView>
            <StatusBar hidden={true} />
            <View style={{ flex: 0.44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#380B61' }}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
            </View>
            <View style={styles.Main}>
              <View style={{ flex: 0.5, width: '100%', paddingRight: '5%', marginTop: '5%' }}>
                <Text style={{ alignSelf: 'flex-end', fontSize: 20 }}>Doğru Sayısı : {this.dogru}
                </Text>
              </View>
              <View style={{ flex: 7 }}>
                <View style={{ flexDirection: 'row',height:170, flex: 3, justifyContent: 'center', backgroundColor: '#CED8F6' }}>
                  <Image resizeMode="contain" style={styles.imagess} source={{ uri: this.state.img1[this.sorusirasi] }} />
                  <Image resizeMode="contain" style={styles.imagess2} source={{ uri: this.state.img2[this.sorusirasi] }} />
                </View>
                <View style={{ flexDirection: 'column', flex: 4 }}>
                  <View>
                    {this.sirala()}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>

      );
    }
  }
}

const styles = StyleSheet.create({
  Main: {
    flex: 5,
    alignItems: 'center',
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#123',
    width: '70%',
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
  imagess: {
    width: '40%',
    height: '100%',
  },
  imagess2: {
    width: '40%',
    height: '100%',
    marginTop: 20,
    marginLeft: 20,
  }
});
