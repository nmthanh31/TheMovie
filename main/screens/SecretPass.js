import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const passcodeLength = 4;

class SecretPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idSpace: null,
      isOpenSpace: false,
      isExistPasscode: false,
      isAcceptedOldPasscode: false,
      passcode: [],
    };
  }
  componentDidMount() {
    this.setState({
      isExistPasscode: storage.contains('storagePasscode'),
    });
    try {
      const {idSpace, isOpenSpace} = this.props.route.params;
      this.setState({idSpace, isOpenSpace});
    } catch (err) {
      console.log(err);
    }
  }

  _onPressNumber = num => {
    if (this.state.passcode.length < passcodeLength) {
      let passcode = this.state.passcode;
      passcode.push(num);
      this.setState({passcode});
      if (passcode.length === 4) {
        // If open Space
        if (this.state.isOpenSpace) {
          // If not exist password => new password
          if (!this.state.isExistPasscode) {
            storage.set('storagePasscode', JSON.stringify(passcode));
            this.props.navigation.navigate('DetailSpace', {
              idSpace: this.state.idSpace,
            });
          }
          // Confirm success old password
          else {
            const result = storage.getString('storagePasscode');
            if (JSON.stringify(passcode) == result) {
              this.props.navigation.navigate('DetailSpace', {
                idSpace: this.state.idSpace,
              });
            }
          }
        }
        // Else reset password
        else {
          // If not exist password => new password
          if (!this.state.isExistPasscode) {
            storage.set('storagePasscode', JSON.stringify(passcode));
            this.props.navigation.goBack();
          }
          // Else reset password
          else {
            // If not accepted old password
            if (this.state.isAcceptedOldPasscode == false) {
              const result = storage.getString('storagePasscode');
              // Confirm success old password
              if (JSON.stringify(passcode) == result) {
                this.setState({isAcceptedOldPasscode: true});
                this.setState({passcode: []});
              }
            }
            // Set new password
            else {
              storage.set('storagePasscode', JSON.stringify(passcode));
              this.props.navigation.goBack();
            }
          }
        }
      }
    }
  };

  _onPressDelete = () => {
    let passcode = this.state.passcode;
    passcode.pop();
    this.setState({passcode});
  };

  handleTextPassword = () => {
    if (this.state.isOpenSpace) {
      if (!this.state.isExistPasscode) {
        return 'Enter new password';
      } else {
        return 'Enter your password';
      }
    } else {
      if (!this.state.isExistPasscode) {
        return 'Enter new password';
      } else {
        if (!this.state.isAcceptedOldPasscode) {
          return 'Enter your password';
        } else {
          return 'Enter new password';
        }
      }
    }
  };

  render() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{
              marginLeft: '80%',
              marginLeft: '75%',
              marginVertical: 50,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '400',
                fontSize: 16,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 31.12,
              height: 42,
            }}
            source={require('../../assets/images/Lock.png')}
          />
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: 20,
              marginTop: 10,
            }}>
            {this.handleTextPassword()}
          </Text>
        </View>
        <View style={styles.codeContainer}>
          {Array.from({
            length: Math.max(this.state.passcode.length, passcodeLength),
          }).map((e, index) => {
            let style =
              index < this.state.passcode.length ? styles.code2 : styles.code1;
            return <View style={style} key={index}></View>;
          })}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.numbersContainer}>
            {numbers.map(num => {
              return (
                <TouchableOpacity
                  onPress={() => this._onPressNumber(num)}
                  style={styles.number}
                  key={num}>
                  <Text style={styles.numberText}>{num}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => this._onPressDelete()}
            style={styles.buttons}>
            <Image
              style={{
                width: 32,
                height: 21.31,
                marginTop: 20,
              }}
              source={require('../../assets/images/DelPass.png')}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default SecretPass;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1946',
  },
  swipe: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 300,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginTop: 15,
  },
  code1: {
    width: 18,
    height: 18,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  code2: {
    width: 18,
    height: 18,
    borderRadius: 13,
    borderWidth: 9,
    borderColor: '#F7BE13',
  },
  number: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: '#FFFFFF',
    margin: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.0611786)',
  },
  numbersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 58,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 348,
  },
  numberText: {
    // fontFamily: 'SFProDisplay-Regular',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 250,
    justifyContent: 'space-between',
  },
  buttonText: {
    // fontFamily: 'SFProDisplay-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
