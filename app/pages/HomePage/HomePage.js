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
import PropTypes from 'prop-types';
import { StyleSheet, Image, Text, Linking, Modal,TouchableOpacity, View } from 'react-native';
import store from 'react-native-simple-store';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import TextButton from '../../components/TextButton';
import ImageButton from '../../components/ImageButtonWithText';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import UserInfoPage from './UserInfoPageByWebView';

const SHOW_API = 'https://www.showapi.com';
const READING_REPO = 'https://github.com/attentiveness/reading';

const LOGIN_URL = 'http://www.danongling.com/signinup/?next=/';

const aboutLogo = require('../../img/about_logo.png');

const useravatar='http://www.danongling.com/media/avatar/default.jpg';
const userurl='http://www.danongling.com/er/2/';

const propTypes = {
  signInUpActions: PropTypes.object,
  signinup: PropTypes.object.isRequired
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userInfo: {},
        signModal: false,
        isSignUp:false,
        userInfoPageModal: false
    }
  }

  _openSignPage(){
    const { signInUpActions } = this.props;
    signInUpActions.initSignIn();
    this.setState({signModal:true});
  }

  _closeSignPage(){
    this.setState({signModal:false});
  }

  _switchSignInUp(){
    this.setState({isSignUp:!this.state.isSignUp});
  }

  _openUserInfoPage(){
    this.setState({userInfoPageModal:true});
  }

  _closeUserInfoPage(){
    this.setState({userInfoPageModal:false});
  }

  componentWillMount() {
    store.get('userinfo').then((userInfo)=>{
      this.setState({userInfo:userInfo});
    });
  }

  componentWillReceiveProps(nextProps) {
    const { signinup } = nextProps;
    if('success'==signinup.signInResult)
    {
      this.setState({signModal:false});
    }
    if('success'==signinup.getUserInfoResult)
    {
      this.setState({userInfo:signinup.userInfo});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.login}>
          {this.state.userInfo.isSignIn=='true' ?
              <TouchableOpacity style={styles.userInfo} onPress={() => this._openUserInfoPage()}>
                <Image style={styles.userInfoAvatar} source={{ uri: this.state.userInfo.avatar }} />
                <Text style={styles.userInfoName}>{this.state.userInfo.name}</Text>
                <Text style={styles.userInfoMood}>{this.state.userInfo.mood}</Text>
              </TouchableOpacity>
            :
            <Button
                style={[styles.loginButton, { color: '#228b22' }]}
                text='登录/注册'
                onPress={() => this._openSignPage()}
            />
          }
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
            {this.state.isSignUp ?
              <SignUpPage closePage={()=>this._closeSignPage()} switchSignInUp={()=>this._switchSignInUp()} {...this.props}/>
              :
              <SignInPage closePage={()=>this._closeSignPage()} switchSignInUp={()=>this._switchSignInUp()} {...this.props}/>
            }
          </Modal>
        </View>
        
        <View>
          <Modal
                animationType={'slide'}
                transparent={true}
                onRequestClose={() => this._closeUserInfoPage()}
                visible={this.state.userInfoPageModal}
          >
            <UserInfoPage userInfoUrl={this.state.userInfo.url} closePage={()=>this._closeUserInfoPage()}/>
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
  userInfo: {
    alignItems: 'center'
  },
  userInfoAvatar: {
    width: 70,
    height: 70,
    borderRadius:35
  },
  userInfoName: {
    fontSize:20,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  userInfoMood: {
    alignItems: 'center'
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
HomePage.propTypes = propTypes;
export default HomePage;
