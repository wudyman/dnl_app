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
import { View,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import CodePush from 'react-native-code-push';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from '../pages/MainPage/Main';
import * as readCreators from '../actions/read';
import {TextInput} from 'react-native';
import Button from '../components/Button'; 


class MainContainer extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return{
      //headerTitle: '首页',
      title: '首页',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-home" size={25} color={tintColor} />
      ),
      headerLeft: (<Button text='写文章' onPress={()=>navigation.state.params.showWritePage()} btnStyle={{padding:5}} textStyle={{textAlign: 'center',color:'#228b22'}}/>),
      headerRight: (<Button text='提问' btnStyle={{padding:5}} textStyle={{textAlign: 'center',color:'#228b22'}}/>),
      headerTitle:(
        <TextInput
        style={{flex:1,backgroundColor:'transparent',fontSize:15,borderColor:'#f0f0f0',borderWidth:1,borderRadius: 20,padding:1,textAlign:'center'}}
        underlineColorAndroid='transparent'
        placeholderTextColor='#aaaaaa'   
        placeholder='搜索内容' />
      ),
    };
  };

  
  _showWritePage(){
    console.log('**************show write page*********');
  }

  componentWillMount() {
    this.props.navigation.setParams({showWritePage:this._showWritePage});
  }

  static componentDidMount() {
    CodePush.sync({
      deploymentKey: 'RGOUfyINiLicZnld67aD0nrbRvyLV1Ifekvul',
      updateDialog: {
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '后台更新',
        optionalUpdateMessage: 'iReading有新版本了，是否更新？',
        title: '更新提示'
      },
      installMode: CodePush.InstallMode.ON_NEXT_RESTART
    });
  }

  render() {
  return (<Main {...this.props} />);
  }
}

const mapStateToProps = (state) => {
  const { read } = state;
  return {
    read
  };
};

const mapDispatchToProps = (dispatch) => {
  const readActions = bindActionCreators(readCreators, dispatch);
  return {
    readActions
  };
};

 

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
