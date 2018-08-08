import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity, Alert,
  StatusBar, FlatList, ActivityIndicator,AsyncStorage
} from 'react-native';

import Index from './index.js';
import { Action, Actions } from 'react-native-router-flux';

export default class App extends Component {
  rnd = [];
  t = 0;
  ks = 0;
  ts = 0;
  kk = 44;
  bittimi = true;
  go = 0;
  xx = "";
  toplam = 0;
  userıdCgr = false;
  statisCagir = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      TrKelime: [],
      EngKelime: [],
      randomnumber: [],
      JsonParse: false,
      asd: 0,
      disa: false,
      disb: false,
      disc: false,
      disd: false,
      dise: false,
      disf: false,
      disg: false,
      dish: false,


      tisa: "transparent",
      tisb: "transparent",
      tisc: "transparent",
      tisd: "transparent",
      tise: "transparent",
      tisf: "transparent",
      tisg: "transparent",
      tish: "transparent",

      colora: "#2f4f4f",
      colorb: "#191970",
      colorc: "#00ee00",
      colord: "#ffff00",
      colore: "#cd5555",
      colorf: "#ffa500",
      colore: "#ff69b4",
      colorg: "#a020f0",
      colorh: "#00f5ff",
    }
  }

  componentDidMount() {
    if (this.userıdCgr == false) this.getUserIdd()
    if (this.userıdCgr) {
      if (this.statisCagir) {
        return (
          this.StatisticService()
        );
      }
      else
      return (
        this.game3Servis()
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
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/statistic23/store', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usersId: this.state.id,
        game: 3,
        SumQuestion: this.toplam / 2 ,
        SumTrueAnswer: 4,
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

  game3Servis() {
    fetch('http://192.168.43.217:80/KelimeOyunu/public/api/game3/Show')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          words: responseJson.words,
        }, );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sirala() {
    if (this.bittimi) {
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

      for (j = 0; j < 4; j++) {
        this.rnd[j] = this.state.TrKelime[j]
      }
      for (j = 4; j < 8; j++) {
        this.rnd[j] = this.state.EngKelime[j - 4]
      }
      this.bittimi = false
    }
  }

  der(d, dx) {
    this.toplam++;
    this.ks++;
    this.ts++;
    this.tfon(dx);
    if ((this.ks == 2) && ((d + 4 == this.kk) || (d - 4 == this.kk))) {
      this.ks = 0; this.state.asd++;
      this.dfon(this.xx, dx);
      this.ks = 0;
      this.go++;
    }

    else {
      if (this.ks >= 2) { this.ks = 0; }
      this.kk = d;
      this.xx = dx;
    }

    if (this.ts == 1) {
      this.ts1 = dx;
    }
    if (this.ts == 2) {
      this.ts2 = dx;
    }
    if (this.ts == 3) {
      this.ttfon(this.ts1, this.ts2);
      this.ts = 1;
      this.ts1 = dx;
    }

    if (this.go == 4) {
     this.statisCagir=true;
      this.componentDidMount();
      this.setState({ isLoading: true, })
      this.setState({ TrKelime: [], })
      this.setState({ EngKelime: [], })
      this.setState({ randomnumber: [], })
      this.setState({ JsonParse: false, })
      this.setState({ asd: 0, })
      rnd = [];
      t = 0;
      ks = 0;
      ts = 0;
      kk = 44;
      bittimi = true;
      go = 0;
      xx = "";
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

  tfon(a) {
    if (a == "xa") { this.setState({ tisa: "black" }) }
    if (a == "xb") { this.setState({ tisb: "black" }) }
    if (a == "xc") { this.setState({ tisc: "black" }) }
    if (a == "xd") { this.setState({ tisd: "black" }) }
    if (a == "xe") { this.setState({ tise: "black" }) }
    if (a == "xf") { this.setState({ tisf: "black" }) }
    if (a == "xg") { this.setState({ tisg: "black" }) }
    if (a == "xh") { this.setState({ tish: "black" }) }
  }

  ttfon(a, b) {
    if (a == "xa") { this.setState({ tisa: "transparent" }) }
    if (a == "xb") { this.setState({ tisb: "transparent" }) }
    if (a == "xc") { this.setState({ tisc: "transparent" }) }
    if (a == "xd") { this.setState({ tisd: "transparent" }) }
    if (a == "xe") { this.setState({ tise: "transparent" }) }
    if (a == "xf") { this.setState({ tisf: "transparent" }) }
    if (a == "xg") { this.setState({ tisg: "transparent" }) }
    if (a == "xh") { this.setState({ tish: "transparent" }) }

    if (b == "xa") { this.setState({ tisa: "transparent" }) }
    if (b == "xb") { this.setState({ tisb: "transparent" }) }
    if (b == "xc") { this.setState({ tisc: "transparent" }) }
    if (b == "xd") { this.setState({ tisd: "transparent" }) }
    if (b == "xe") { this.setState({ tise: "transparent" }) }
    if (b == "xf") { this.setState({ tisf: "transparent" }) }
    if (b == "xg") { this.setState({ tisg: "transparent" }) }
    if (b == "xh") { this.setState({ tish: "transparent" }) }
  }

  dfon(a, b) {
    if (a == "xa") { { this.setState({ disa: true }) }; { this.setState({ colora: "transparent" }); } }
    if (a == "xb") { { this.setState({ disb: true }) }; { this.setState({ colorb: "transparent" }); } }
    if (a == "xc") { { this.setState({ disc: true }) }; { this.setState({ colorc: "transparent" }); } }
    if (a == "xd") { { this.setState({ disd: true }) }; { this.setState({ colord: "transparent" }); } }
    if (a == "xe") { { this.setState({ dise: true }) }; { this.setState({ colore: "transparent" }); } }
    if (a == "xf") { { this.setState({ disf: true }) }; { this.setState({ colorf: "transparent" }); } }
    if (a == "xg") { { this.setState({ disg: true }) }; { this.setState({ colorg: "transparent" }); } }
    if (a == "xh") { { this.setState({ dish: true }) }; { this.setState({ colorh: "transparent" }); } }

    if (b == "xa") { { this.setState({ disa: true }) }; { this.setState({ colora: "transparent" }); } }
    if (b == "xb") { { this.setState({ disb: true }) }; { this.setState({ colorb: "transparent" }); } }
    if (b == "xc") { { this.setState({ disc: true }) }; { this.setState({ colorc: "transparent" }); } }
    if (b == "xd") { { this.setState({ disd: true }) }; { this.setState({ colord: "transparent" }); } }
    if (b == "xe") { { this.setState({ dise: true }) }; { this.setState({ colore: "transparent" }); } }
    if (b == "xf") { { this.setState({ disf: true }) }; { this.setState({ colorf: "transparent" }); } }
    if (b == "xg") { { this.setState({ disg: true }) }; { this.setState({ colorg: "transparent" }); } }
    if (b == "xh") { { this.setState({ dish: true }) }; { this.setState({ colorh: "transparent" }); } }
  }

  render() {

    if (this.state.JsonParse == false) {
      return (
        <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
          <StatusBar hidden={true} />
          <FlatList
            data={this.state.words}
            renderItem={({ item }) => {
              this.setState({ JsonParse: true });
              this.state.TrKelime[this.t] = (item.tr);
              this.state.EngKelime[this.t] = (item.eng);
              this.t++;
            }}
            keyExtractor={(item, index) => index}
          />
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground source={require('./app/img/1105.jpg')} style={{ flex: 5, }} >
          <StatusBar hidden={true} />
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#380B61' }}>
            <Text disabled={true} style={{ fontWeight: 'bold', color: 'white', fontSize: 25, textAlign: 'center', }}>Game 3</Text>
          </View>
          {this.sirala()}
          <View style={{ flex: 5, flexDirection: 'row' }}>
            <TouchableOpacity disabled={this.state.disa} onPress={() => this.der(this.state.randomnumber[0], "xa")} activeOpacity={0.80} style={{ margin: 20, borderColor: "blue", borderRadius: 15, flex: 1, backgroundColor: this.state.colora, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: this.state.tisa, fontSize: 15, justifyContent: 'center', }}>{this.rnd[this.state.randomnumber[0]]}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={this.state.disb} onPress={() => this.der(this.state.randomnumber[1], "xb")} activeOpacity={0.80} style={{ margin: 20, borderColor: "blue", borderRadius: 15, flex: 1, backgroundColor: this.state.colorb, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: this.state.tisb, fontSize: 15, justifyContent: 'center', }}>{this.rnd[this.state.randomnumber[1]]}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 5, flexDirection: 'row' }}>
            <TouchableOpacity disabled={this.state.disc} onPress={() => this.der(this.state.randomnumber[2], "xc")} activeOpacity={0.80} style={{ margin: 20, borderColor: "blue", borderRadius: 15, flex: 1, backgroundColor: this.state.colorc, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: this.state.tisc, fontSize: 15, justifyContent: 'center', }}>{this.rnd[this.state.randomnumber[2]]}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={this.state.disd} onPress={() => this.der(this.state.randomnumber[3], "xd")} activeOpacity={0.80} style={{ margin: 20, borderColor: "blue", borderRadius: 15, flex: 1, backgroundColor: this.state.colord, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: this.state.tisd, fontSize: 15, justifyContent: 'center', }}>{this.rnd[this.state.randomnumber[3]]}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 5, flexDirection: 'row' }}>
            <TouchableOpacity disabled={this.state.dise} onPress={() => this.der(this.state.randomnumber[4], "xe")} activeOpacity={0.80} style={{ margin: 20, borderColor: "blue", borderRadius: 15, flex: 1, backgroundColor: this.state.colore, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: this.state.tise, fontSize: 15, justifyContent: 'center', }}>{this.rnd[this.state.randomnumber[4]]}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={this.state.disf} onPress={() => this.der(this.state.randomnumber[5], "xf")} activeOpacity={0.80} style={{ margin: 20, borderColor: "blue", borderRadius: 15, flex: 1, backgroundColor: this.state.colorf, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: this.state.tisf, fontSize: 15, justifyContent: 'center', }}>{this.rnd[this.state.randomnumber[5]]}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 5, flexDirection: 'row' }}>
            <TouchableOpacity disabled={this.state.disg} onPress={() => this.der(this.state.randomnumber[6], "xg")} activeOpacity={0.80} style={{ margin: 20, borderColor: "blue", borderRadius: 15, flex: 1, backgroundColor: this.state.colorg, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: this.state.tisg, fontSize: 15, justifyContent: 'center', }}>{this.rnd[this.state.randomnumber[6]]}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={this.state.dish} onPress={() => this.der(this.state.randomnumber[7], "xh")} activeOpacity={0.80} style={{ margin: 20, borderColor: "blue", borderRadius: 15, flex: 1, backgroundColor: this.state.colorh, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: this.state.tish, fontSize: 15, justifyContent: 'center', }}>{this.rnd[this.state.randomnumber[7]]}</Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>
      );
    }
  }
}
const styles = StyleSheet.create({
});
