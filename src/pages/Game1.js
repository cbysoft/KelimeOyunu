import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View, AppRegistry,
  Image, FlatList, ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  StatusBar
} from 'react-native';
import Index from './index.js';
import { Action, Actions } from 'react-native-router-flux';
export default class App extends Component {

  i = 0;
  cgr = false;
  userıdCgr = false;
  constructor(props) {
    super(props);
    this.state = {
      JsonParse: false,
      soru: [],
      asikki: [],
      bsikki: [],
      csikki: [],
      dsikki: [],
      truesikki: [],
      SoruId: [],
      sorusirasi: 0,
      dogru: 0
    }

  }

  componentDidMount() {
    if (this.userıdCgr == false) this.getUserIdd()
    if (this.userıdCgr) {
      if (this.cgr) {
        return (
          this.game1servis(),
          this.StatisticService()
        );
      }
      return (
        this.game1servis()
      );
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
  StatisticService() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/statistic/store ', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usersId: this.state.id,
        game: 1,
        questionId: this.state.SoruId[this.state.sorusirasi],
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
  game1servis() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/game1/showgame1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.soru,
          baglan: responseJson.soru
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }




  degistir(secenek) {
    this.cgr = true
    this.componentDidMount();


    if (secenek == this.state.truesikki[this.state.sorusirasi]) {
      this.cevap = true;
 
      this.state.dogru++
      Alert.alert(
        'Tebrikler',
        'Doğru cevapladınız.',
        [
          { text: 'Devam et', onPress: () => this.soruArttir(), style: 'cancel' },
        ],
        { cancelable: false }
      );
    }
    else {
      Alert.alert(
        'Üzgünüm :(',
        'Yanlış cevapladınız.',
        [
          { text: 'Devam et', onPress: () => this.soruArttir(), style: 'cancel' },
        ],
        { cancelable: false }
      );
      this.cevap = false;
     
    }

    this.componentDidMount();
  }
  soruArttir() {
    if (this.state.sorusirasi == this.state.soru.length - 1) {
      Alert.alert(
        'Oyun Bitti',
        this.state.dogru + ' tane doğrunuz var.',
        [
          { text: 'Oyunu bitir', onPress: () => Actions.MainPage(), style: 'cancel' },
          { text: 'Yeni oyuna başla', onPress: () => Actions.GamePage() },
        ],
        { cancelable: false }
      )

    }
    this.setState({ sorusirasi: this.state.sorusirasi + 1 });
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
              this.state.soru[this.i] = (item.question);
              this.state.asikki[this.i] = (item.a);
              this.state.bsikki[this.i] = (item.b);
              this.state.csikki[this.i] = (item.c);
              this.state.dsikki[this.i] = (item.d);
              this.state.truesikki[this.i] = (item.TrueAnswer);
              this.i++
            }}
            keyExtractor={(item, index) => index}
          />
        </ImageBackground>
      );
    }

    return (

      <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
        <ScrollView>
          <StatusBar hidden={true} />
          <View style={{ flex: 0.44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#380B61' }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
          </View>
          <View style={styles.Main}>
            <View style={{ flex: 0.5, width: '100%', paddingRight: '5%', marginTop: '5%' }}>
              <Text style={{ alignSelf: 'flex-end', fontSize: 20 }}>Doğru Sayısı : {this.state.dogru}


              </Text>
            </View>
            <View style={{ flex: 7, marginTop: '10%' }}>
              <View style={{ alignItems: 'center', justifyContent: 'center', width:'90%', flexDirection: 'row', height: 80, flex: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#CED8F6' }}>
                <Text style={styles.txtt}>{this.state.soru[this.state.sorusirasi]}  </Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 4,alignItems: 'center', justifyContent: 'center',  }}>
                <View>
                  <TouchableOpacity onPress={() => this.degistir("a")} style={styles.btn}>
                    <Text style={styles.btnText}>{this.state.asikki[this.state.sorusirasi]}  </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.degistir("b")} style={styles.btn}>
                    <Text style={styles.btnText}>{this.state.bsikki[this.state.sorusirasi]}  </Text>
                  </TouchableOpacity><TouchableOpacity onPress={() => this.degistir("c")} style={styles.btn}>
                    <Text style={styles.btnText}>{this.state.csikki[this.state.sorusirasi]}  </Text>
                  </TouchableOpacity><TouchableOpacity onPress={() => this.degistir("d")} style={styles.btn}>
                    <Text style={styles.btnText}>{this.state.dsikki[this.state.sorusirasi]}  </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
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
    width: '70%',alignItems: 'center'
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
    alignItems: 'center',
    textAlign: 'center'

  },
  txtt: {
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

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

