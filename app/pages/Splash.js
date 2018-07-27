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
import { Dimensions, Animated,StatusBar,View } from 'react-native';
import store from 'react-native-simple-store';
import { registerApp } from 'react-native-wechat';
import AV from 'leancloud-storage';
import SplashScreen from 'react-native-splash-screen';
import NavigationUtil from '../utils/NavigationUtil';
import RequestUtil from '../utils/RequestUtil';
import { SITE_URL,REQUEST_USER_INFO_URL } from '../constants/Urls';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
//const splashImg = require('../img/splash.png');
const splashImg = require('../img/share_icon_moments.png');

class Splash extends React.Component {
  static navigationOptions = {
    header: (<StatusBar hidden={true} backgroundColor={'#228b22'} translucent={true} barStyle={'light-content'}/> )
  };

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
    this._getUserInfo(REQUEST_USER_INFO_URL);
    registerApp('wxb24c445773822c79');
    if (!AV.applicationId) {
      AV.init({
        appId: 'Tfi1z7dN9sjMwSul8sYaTEvg-gzGzoHsz',
        appKey: '57qmeEJonefntNqRe17dAgi4'
      });
    }
  }

  componentDidMount() {
    const { navigate } = this.props.navigation;
    Animated.timing(this.state.bounceValue, {
      toValue: 1.2,
      duration: 1000
    }).start();
    SplashScreen.hide();
    this.timer = setTimeout(() => {
      store.get('isInit').then((isInit) => {
        if (!isInit) {
          navigate('Category', { isFirst: true });
        } else {
          NavigationUtil.reset(this.props.navigation, 'Home');
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  _getUserInfo(url){
    let formData=new FormData();
    formData.append("type","userprofile");
    fetch(url, {
      method:'POST',
      body:formData
    })
      .then((response) => {
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then((responseData) => {
        if (isOk) {
          this._saveUserInfo(responseData);
        } else {
          console.log(responseData);
          this._saveUserInfo('fail');
        }
      })
      .catch((error) => {
        console.log(error);
        this._saveUserInfo('fail');
      });
  }

  _saveUserInfo(ret){
    let userInfo={};
    if("fail"!=ret)
    {
      userInfo.id=ret[0];
      userInfo.name=ret[1];
      userInfo.avatar=ret[2];
      if(userInfo.avatar.indexOf('http')<0)
      {
        userInfo.avatar=SITE_URL+userInfo.avatar;
      }
      userInfo.mood=ret[3];
    
      userInfo.url=SITE_URL+'/er/'+ret[0]+'/';
      userInfo.isSignIn='true';
    }
    else
    {
      userInfo.isSignIn='false';
    }
    store.save('userinfo',userInfo);
  }

  render() {
    return (
      <Animated.Image
        style={{
          width: maxWidth,
          height: maxHeight,
          transform: [{ scale: this.state.bounceValue }]
        }}
        source={splashImg}
      />
    );
  }
}

export default Splash;
