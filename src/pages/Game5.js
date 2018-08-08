import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Alert, Image, Button, ImageBackground, TouchableOpacity,
  StatusBar, FlatList, ActivityIndicator, AsyncStorage
} from 'react-native';
import Index from './index.js';
import { Action, Actions } from 'react-native-router-flux';
export default class App extends Component {
  s = 0; i = 0; SoruSirasi = 0; dogruSayisi = 0; uzunluk = 0;
  kelimemm = ""
  bittimi = true;
  cgr = false;
  cevap = 0;
  userıdCgr = false
  liste = []
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      snt: "",
      wordsarraya: [],
      wordsarrayb: [],
      wordsarrayc: [],
      wordsarrayd: [],
      wordsarraye: [],
      wordsarrayf: [],
      randomnumber: [],
      SoruId: [],
      JsonParse: false

    }
  }
  componentDidMount() {
    if (this.userıdCgr == false) this.getUserIdd()
    if (this.userıdCgr) {
      if (this.cgr) {
        return (
          this.game5servis(),
          this.StatisticService()
        );
      }
      return (
        this.game5servis()
      );
    }
  }
  game5servis() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/game5/Show')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          words: responseJson.words,
        });
      })
      .catch((error) => {
        this.hataMesaaji();
      });
  }
  hataMesaaji() {
    Alert.alert(
      'Dikkat',
      'Bir hata oluştu.',
      [
        { text: 'Oyunu bitir', onPress: () => Actions.MainPage(), style: 'cancel' },
        { text: 'Yeni oyuna başla', onPress: () => Actions.Game4() },
      ],
      { cancelable: false }
    )
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
  StatisticService() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/statistic/store ', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usersId: this.state.id,
        game: 5,
        questionId: this.state.SoruId[this.SoruSirasi],
        answer: this.cevap,
      }),

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
        });
      })
      .catch((error) => {
        this.hataMesaaji();
      });
  }
  render() {
    try {
      if (this.state.JsonParse == false) {
        return (
          <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} >
            <ActivityIndicator size="large" />
            <FlatList
              data={this.state.words}
              renderItem={({ item }) => {
                this.setState({ JsonParse: true });
                this.state.SoruId[this.i] = (item.id);
                this.state.wordsarraya[this.i] = (item.a);
                this.state.wordsarrayb[this.i] = (item.b);
                this.state.wordsarrayc[this.i] = (item.c);
                this.state.wordsarrayd[this.i] = (item.d);
                this.state.wordsarraye[this.i] = (item.e);
                this.state.wordsarrayf[this.i] = (item.f);
                this.i++
              }}
              keyExtractor={(item, index) => index}
            />
          </ImageBackground>
        );
      }
      else {
        return (
          <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }} >
            <StatusBar hidden={true} />
            <View style={{ flex: 0.50, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#380B61' }}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
            </View>
            <View style={{ flex: 5, alignItems: 'center' }}>
              {this.sirala()}
            </View>
            <View style={{ flex: 4, flexDirection: 'row', width: '80%', /*backgroundColor: '#CED8F6',*/ justifyContent: 'center' }}>

              <Text style={{ justifyContent: 'center', color: '#0B243B', fontSize: 25, }}>
                {this.state.snt}
              </Text>


            </View>

          </ImageBackground>
        );
      }
    } catch (aa) {
      this.hataMesaaji();
    }
  }

  sirala() {
    if (this.bittimi) {
      this.liste = []
      this.uzunluk = 0;
      this.state.randomnumber = []
      this.state.randomnumber[0] = Math.round(0 + (Math.random() * (5 - 0)));

      do {
        this.state.randomnumber[1] = Math.round(0 + (Math.random() * (5 - 0)));
      } while (this.state.randomnumber[1] == this.state.randomnumber[0])
      do {
        this.state.randomnumber[2] = Math.round(0 + (Math.random() * (5 - 0)));
      } while (this.state.randomnumber[2] == this.state.randomnumber[0] || this.state.randomnumber[2] == this.state.randomnumber[1])
      do {
        this.state.randomnumber[3] = Math.round(0 + (Math.random() * (5 - 0)));
      } while (this.state.randomnumber[3] == this.state.randomnumber[0] || this.state.randomnumber[3] == this.state.randomnumber[1] || this.state.randomnumber[3] == this.state.randomnumber[2])
      do {
        this.state.randomnumber[4] = Math.round(0 + (Math.random() * (5 - 0)));
      } while (this.state.randomnumber[4] == this.state.randomnumber[0] || this.state.randomnumber[4] == this.state.randomnumber[1] || this.state.randomnumber[4] == this.state.randomnumber[2] || this.state.randomnumber[4] == this.state.randomnumber[3])
      do {
        this.state.randomnumber[5] = Math.round(0 + (Math.random() * (5 - 0)));
      } while (this.state.randomnumber[5] == this.state.randomnumber[0] || this.state.randomnumber[5] == this.state.randomnumber[1] || this.state.randomnumber[5] == this.state.randomnumber[2] || this.state.randomnumber[5] == this.state.randomnumber[3] || this.state.randomnumber[5] == this.state.randomnumber[4])

      ask = <TouchableOpacity onPress={() => this.onpa(this.state.wordsarraya[this.SoruSirasi])} style={styles.btn}><Text style={styles.btnText}>{this.state.wordsarraya[this.SoruSirasi]}  </Text></TouchableOpacity>
      bsk = <TouchableOpacity onPress={() => this.onpa(this.state.wordsarrayb[this.SoruSirasi])} style={styles.btn}><Text style={styles.btnText}>{this.state.wordsarrayb[this.SoruSirasi]}  </Text></TouchableOpacity>
      csk = <TouchableOpacity onPress={() => this.onpa(this.state.wordsarrayc[this.SoruSirasi])} style={styles.btn}><Text style={styles.btnText}>{this.state.wordsarrayc[this.SoruSirasi]}  </Text></TouchableOpacity>
      dsk = <TouchableOpacity onPress={() => this.onpa(this.state.wordsarrayd[this.SoruSirasi])} style={styles.btn}><Text style={styles.btnText}>{this.state.wordsarrayd[this.SoruSirasi]}  </Text></TouchableOpacity>
      esk = <TouchableOpacity onPress={() => this.onpa(this.state.wordsarraye[this.SoruSirasi])} style={styles.btn}><Text style={styles.btnText}>{this.state.wordsarraye[this.SoruSirasi]}  </Text></TouchableOpacity>
      fsk = <TouchableOpacity onPress={() => this.onpa(this.state.wordsarrayf[this.SoruSirasi])} style={styles.btn}><Text style={styles.btnText}>{this.state.wordsarrayf[this.SoruSirasi]}  </Text></TouchableOpacity>

      for (i = 0; i <= 6; i++) {
        if (this.state.randomnumber[i] == 0 && this.state.wordsarraya[this.SoruSirasi] != "") { this.liste.push(ask); this.uzunluk++; }
        if (this.state.randomnumber[i] == 1 && this.state.wordsarrayb[this.SoruSirasi] != "") { this.liste.push(bsk); this.uzunluk++; }
        if (this.state.randomnumber[i] == 2 && this.state.wordsarrayc[this.SoruSirasi] != "") { this.liste.push(csk); this.uzunluk++; }
        if (this.state.randomnumber[i] == 3 && this.state.wordsarrayd[this.SoruSirasi] != "") { this.liste.push(dsk); this.uzunluk++; }
        if (this.state.randomnumber[i] == 4 && this.state.wordsarraye[this.SoruSirasi] != "") { this.liste.push(esk); this.uzunluk++; }
        if (this.state.randomnumber[i] == 5 && this.state.wordsarrayf[this.SoruSirasi] != "") { this.liste.push(fsk); this.uzunluk++; }
      }
      this.bittimi = false
    }
    return (
      <View style={{
        flex: 1,
        top: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: 10,
      }}>
        {this.liste}
      </View>

    );
  }

  onpa(word) {
    {
      this.setState({ snt: (this.state.snt) + (word) + " " });
      this.kelimemm = this.kelimemm + word + " "
      this.s++;
      this.ccc()
    }
  }
  dogruSonuc() {
    Alert.alert('Tebrikler', 'Doğru cevapladınız.', [{
      text: 'Devam et',
      onPress: () => this.sonraki(),
      style: 'cancel'
    }],
      { cancelable: false, }
    );
    this.cevap = 1
    this.dogruSayisi++;
  }
  yanlisSonuc() {
    Alert.alert("Yanlış")
    this.cevap = 0
    this.sonraki()
  }
  ccc() {
    if (this.uzunluk == 3 && ((this.kelimemm) == (this.state.wordsarraya[this.SoruSirasi] + " " + this.state.wordsarrayb[this.SoruSirasi] + " " +
      wordsarrayc[this.SoruSirasi] + " "))) {
      this.dogruSonuc()
    } else if (this.uzunluk == 3 && this.s == 3) { this.yanlisSonuc() }
    if (this.uzunluk == 4 && (this.kelimemm == this.state.wordsarraya[this.SoruSirasi] + " " + this.state.wordsarrayb[this.SoruSirasi] + " " + this.state.wordsarrayc[this.SoruSirasi] + " " + this.state.wordsarrayd[this.SoruSirasi] + " ")) {
      this.dogruSonuc()
    } else if (this.uzunluk == 4 && this.s == 4) { this.yanlisSonuc() }
    if (this.uzunluk == 5 && ((this.kelimemm) == (this.state.wordsarraya[this.SoruSirasi] + " " + this.state.wordsarrayb[this.SoruSirasi] + " " +
      this.state.wordsarrayc[this.SoruSirasi] + " " + this.state.wordsarrayd[this.SoruSirasi] + " " + this.state.wordsarraye[this.SoruSirasi] + " "))) {
      this.dogruSonuc()
    } else if (this.uzunluk == 5 && this.s == 5) { this.yanlisSonuc() }
    if (this.uzunluk == 6 && ((this.kelimemm) == (this.state.wordsarraya[this.SoruSirasi] + " " + this.state.wordsarrayb[this.SoruSirasi] + " " +
      this.state.wordsarrayc[this.SoruSirasi] + " " + this.state.wordsarrayd[this.SoruSirasi] + " " + this.state.wordsarraye[this.SoruSirasi] + " " + this.state.wordsarrayf[this.SoruSirasi] + " "))) {
      this.dogruSonuc()
    } else if (this.uzunluk == 6 && this.s == 6) { this.yanlisSonuc() }


  }
  sonraki() {
    this.bittimi = true;
    this.cgr = true;
    this.componentDidMount();
    uzunluk = 0;
    this.kelimemm = ""
    this.s = 0;
    this.SoruSirasi++;
    this.setState({ snt: "" })
    if (this.SoruSirasi >= this.state.wordsarraya.length) this.OyunBitti()
  }
  OyunBitti() {

    Alert.alert(
      'Oyun Bitti',
      this.dogruSayisi + ' tane doğrunuz var.',
      [
        { text: 'Oyunu bitir', onPress: () => Actions.MainPage(), style: 'cancel' },
        { text: 'Yeni oyuna başla', onPress: () => Actions.GamePage() },
      ],
      { cancelable: false }
    )
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

