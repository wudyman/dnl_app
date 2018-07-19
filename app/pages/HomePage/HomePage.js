/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import { StyleSheet, Image, Text, Linking, Modal,TouchableOpacity, View } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import TextButton from '../../components/TextButton';
import ImageButton from '../../components/ImageButtonWithText';
import SignInPage from '../SignInAndSignup/SignInPage';
import SignUpPage from '../SignInAndSignup/SignUpPage';

const SHOW_API = 'https://www.showapi.com';
const READING_REPO = 'https://github.com/attentiveness/reading';

const LOGIN_URL = 'http://www.danongling.com/signinup/?next=/';

const aboutLogo = require('../../img/about_logo.png');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        signModal: false,
        bSignUp:false,
    }
  }

  static navigationOptions = {
    title: '我',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-information-circle" size={25} color={tintColor} />
    ),
    headerRight: (
      <Icon.Button
        name="logo-github"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={() => Linking.openURL(READING_REPO)}
      />
    )
  };

  _closeSignPage(){
    this.setState({signModal:false});
  }

  _switchSignInUp(){
    this.setState({bSignUp:!this.state.bSignUp});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.login}>
            <Button
                style={[styles.loginButton, { color: '#228b22' }]}
                text='登录/注册'
                onPress={() => this.setState({ signModal: true})}
            />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.disclaimerContent}>
              <Button
                style={[styles.disclaimer, { color: '#228b22' }]}
                text='消息'
                onPress={() => Linking.openURL(SHOW_API)}
              />
              <Button
                style={[styles.disclaimer, { color: '#228b22' }]}
                text='设置'
                onPress={() => Linking.openURL(SHOW_API)}
              />
            </View>
          </View>
        </View>

        <View>
            <Modal
              animationType={'slide'}
              transparent={true}
              onRequestClose={() => this._closeSignPage()}
              visible={this.state.signModal}
            >
            {this.state.bSignUp ?
              <SignUpPage closePage={()=>this._closeSignPage()} switchSignInUp={()=>this._switchSignInUp()}/>
              :
              <SignInPage closePage={()=>this._closeSignPage()} switchSignInUp={()=>this._switchSignInUp()}/>
            }
          </Modal>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10
  },
  login: {
    flex: 1,
    padding:10,
    alignItems: 'center'
  },
  loginButton: {
    fontSize: 24,
    textAlign: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 50
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaaaaa',
    marginTop: 5
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4e4e'
  },
  disclaimerContent: {
    flexDirection: 'column'
  },
  disclaimer: {
    fontSize: 18,
    textAlign: 'left'
  },
  bottomContainer: {
    alignItems: 'flex-start'
  }
});

export default HomePage;
