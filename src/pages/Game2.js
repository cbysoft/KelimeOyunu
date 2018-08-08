
import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Image, FlatList, Alert, ImageBackground,
  TouchableOpacity, StatusBar,AsyncStorage
} from 'react-native';
import Index from './index.js';
import { Action, Actions } from 'react-native-router-flux';
export default class App extends Component {
  i = 0; a = 0; b = 0; userıdCgr = false;

  constructor(props) {
    super(props);
    this.state = {
      JsonParse: false,
      bittimi : false,
      tr: [],
      eng: [],
      SoruId: [],
      randomnumber: [],
      sorusirasi: 0,
      colora: "#BDBDBD",
      colorb: "#0489B1",
      colorc: "#00ee00",
      colord: "#ffff00",
      colore: "#cd5555",
      colorf: "#ffa500",
      colore: "#ff69b4",
      colorg: "#a020f0",
      colorh: "#00f5ff",

      disa: 'black',
      disb: 'black',
      disc: 'black',
      disd: 'black',
      dise: 'black',
      disf: 'black',
      disg: 'black',
      dish: 'black',
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
    this.randomm();
    if (this.userıdCgr) {
      if (this.state.bittimi) {
        return (
          this.StatisticService()
        );
      }
      return (
        this.game2Servis()
      );
    }
  }
  game2Servis() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/game2/showgame2')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.es,
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  StatisticService() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/statistic23/store', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usersId: this.state.id,
        game: 2,
        SumQuestion: this.b,
        SumTrueAnswer: 8,
      }),

    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
        });
      })
      .catch((error) => {
        console.log(error)
      });
  }


  randomm() {

    this.state.randomnumber[0] = Math.round(0 + (Math.random() * (7 - 0)));
    do {
      this.state.randomnumber[1] = Math.round(0 + (Math.random() * (7 - 0)));
    } while (this.state.randomnumber[1] == this.state.randomnumber[0])
    do {
      this.state.randomnumber[2] = Math.round(0 + (Math.random() * (7 - 0)));
    } while (this.state.randomnumber[2] == this.state.randomnumber[0] || this.state.randomnumber[2] == this.state.randomnumber[1])
    do {
      this.state.randomnumber[3] = Math.round(0 + (Math.random() * (7 - 0)));
    } while (this.state.randomnumber[3] == this.state.randomnumber[0] || this.state.randomnumber[3] == this.state.randomnumber[1] || this.state.randomnumber[3] == this.state.randomnumber[2])
    do {
      this.state.randomnumber[4] = Math.round(0 + (Math.random() * (7 - 0)));
    } while (this.state.randomnumber[4] == this.state.randomnumber[0] || this.state.randomnumber[4] == this.state.randomnumber[1] || this.state.randomnumber[4] == this.state.randomnumber[2] || this.state.randomnumber[4] == this.state.randomnumber[3])
    do {
      this.state.randomnumber[5] = Math.round(0 + (Math.random() * (7 - 0)));
    } while (this.state.randomnumber[5] == this.state.randomnumber[0] || this.state.randomnumber[5] == this.state.randomnumber[1] || this.state.randomnumber[5] == this.state.randomnumber[2] || this.state.randomnumber[5] == this.state.randomnumber[3] || this.state.randomnumber[5] == this.state.randomnumber[4])
    do {
      this.state.randomnumber[6] = Math.round(0 + (Math.random() * (7 - 0)));
    } while (this.state.randomnumber[6] == this.state.randomnumber[0] || this.state.randomnumber[6] == this.state.randomnumber[1] || this.state.randomnumber[6] == this.state.randomnumber[2] || this.state.randomnumber[6] == this.state.randomnumber[3] || this.state.randomnumber[6] == this.state.randomnumber[4] || this.state.randomnumber[6] == this.state.randomnumber[5])
    do {
      this.state.randomnumber[7] = Math.round(0 + (Math.random() * (7 - 0)));
    } while (this.state.randomnumber[7] == this.state.randomnumber[0] || this.state.randomnumber[7] == this.state.randomnumber[1] || this.state.randomnumber[7] == this.state.randomnumber[2] || this.state.randomnumber[7] == this.state.randomnumber[3] || this.state.randomnumber[7] == this.state.randomnumber[4] || this.state.randomnumber[7] == this.state.randomnumber[5] || this.state.randomnumber[7] == this.state.randomnumber[6])

  }



  dogru(gelen, dx) {
    this.b++;
    if (gelen == this.state.SoruId[this.state.sorusirasi]) {
      this.a++;
      this.setState({ sorusirasi: this.state.sorusirasi + 1 })
      if (dx == "a") { this.setState({ colora: "transparent" }) }
      if (dx == "b") { this.setState({ colorb: "transparent" }) }
      if (dx == "c") { this.setState({ colorc: "transparent" }) }
      if (dx == "d") { this.setState({ colord: "transparent" }) }
      if (dx == "e") { this.setState({ colore: "transparent" }) }
      if (dx == "f") { this.setState({ colorf: "transparent" }) }
      if (dx == "g") { this.setState({ colorg: "transparent" }) }
      if (dx == "h") { this.setState({ colorh: "transparent" }) }

      if (dx == "a") { this.setState({ disa: "transparent" }) }
      if (dx == "b") { this.setState({ disb: "transparent" }) }
      if (dx == "c") { this.setState({ disc: "transparent" }) }
      if (dx == "d") { this.setState({ disd: "transparent" }) }
      if (dx == "e") { this.setState({ dise: "transparent" }) }
      if (dx == "f") { this.setState({ disf: "transparent" }) }
      if (dx == "g") { this.setState({ disg: "transparent" }) }
      if (dx == "h") { this.setState({ dish: "transparent" }) }

      if (this.a == 8) {
        this.state.bittimi = true;
        this.componentDidMount();
        Alert.alert(
          'Tebrikler',
          'Doğru cevapladınız.',
          [
            { text: 'Tekrar Oyna', onPress: () => Actions.GamePage(), style: 'cancel' },
            { text: 'Oyunu Bitir', onPress: () => Actions.MainPage() },
          ],
          { cancelable: false }
        );

      }
    }
  
    
  }


  render() {
    if (this.state.JsonParse == false) {
      return (
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => {
            this.setState({ JsonParse: true });
            this.state.SoruId[this.i] = (item.id);
            this.state.tr[this.i] = (item.tr);
            this.state.eng[this.i] = (item.eng);
            this.i++
          }}
          keyExtractor={(item, index) => index}
        />
      )
    }

    return (
      <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
        <StatusBar hidden={true} />
        <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center', backgroundColor: '#380B61' }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Kelime Ezberleme Oyunu</Text>
        </View>
        <View style={{ flex: 10 }}>
          <View style={{ flex: 1.5, backgroundColor: '#DF013A', alignItems: 'center', justifyContent: 'center', }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 35, color: '#fff' }}> {this.state.eng[this.state.sorusirasi]} </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 7.5 }}>

            <View style={{ flex: 3, flexDirection: 'row' }} >
              <TouchableOpacity onPress={() => this.dogru(this.state.SoruId[this.state.randomnumber[0]], 'a')} style={{ alignItems: 'center', justifyContent: 'center', flex: 1, justifyContent: 'center', backgroundColor: this.state.colora }} >
                <Text style={{ color: this.state.disa, fontSize: 30 }} > {this.state.tr[this.state.randomnumber[0]]} </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.dogru(this.state.SoruId[this.state.randomnumber[1]], 'b')} style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: this.state.colorb }}>
                <Text style={{ color: this.state.disb, fontSize: 30 }}> {this.state.tr[this.state.randomnumber[1]]}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 3, flexDirection: 'row' }} >
              <TouchableOpacity onPress={() => this.dogru(this.state.SoruId[this.state.randomnumber[2]], 'c')} style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: this.state.colorc }} >
                <Text style={{ color: this.state.disc, fontSize: 30 }}> {this.state.tr[this.state.randomnumber[2]]}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.dogru(this.state.SoruId[this.state.randomnumber[3]], 'd')} style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: this.state.colord }}>
                <Text style={{ color: this.state.disd, fontSize: 30 }}> {this.state.tr[this.state.randomnumber[3]]}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 3, flexDirection: 'row' }} >
              <TouchableOpacity onPress={() => this.dogru(this.state.SoruId[this.state.randomnumber[4]], 'e')} style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: this.state.colore }} >
                <Text style={{ color: this.state.dise, fontSize: 30 }}> {this.state.tr[this.state.randomnumber[4]]}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.dogru(this.state.SoruId[this.state.randomnumber[5]], 'f')} style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: this.state.colorf }}>
                <Text style={{ color: this.state.disf, fontSize: 30 }}> {this.state.tr[this.state.randomnumber[5]]}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 3, flexDirection: 'row' }} >
              <TouchableOpacity onPress={() => this.dogru(this.state.SoruId[this.state.randomnumber[6]], 'g')} style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: this.state.colorg }} >
                <Text style={{ color: this.state.disg, fontSize: 30 }}> {this.state.tr[this.state.randomnumber[6]]}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.dogru(this.state.SoruId[this.state.randomnumber[7]], 'h')} style={{ alignItems: 'center', flex: 1, justifyContent: 'center', backgroundColor: this.state.colorh }}>
                <Text style={{ color: this.state.dish, fontSize: 30 }}> {this.state.tr[this.state.randomnumber[7]]}</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>
      </ImageBackground>
    );
  }
}
