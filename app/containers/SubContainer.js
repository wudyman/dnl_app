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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as signInUpCreators from '../actions/signinup';

import SettingPage from '../pages/HomePage/Subs/SettingPage';

import ToastUtil from '../utils/ToastUtil';
import { WRITE_URL} from '../constants/Urls';

let gUserInfo={};
class SubContainer extends React.Component {
  _closePage(){
    console.log('*******SubContainer _closePage*******');
    this.props.navigation.pop();
  }

  componentWillMount() {
    console.log('*******SubContainer componentWillMount*******');
  }


  render() {
    const { params } = this.props.navigation.state;
    if(params.subPage=='Setting')
        return <SettingPage closePage={()=>this._closePage()} {...this.props}/>;
    else
        return <SettingPage closePage={()=>this._closePage()} {...this.props}/>;
  }
}
/*
const mapStateToProps = (state) => {
  const { signinup } = state;
  return {
    signinup
  };
};

const mapDispatchToProps = (dispatch) => {
  const signInUpActions = bindActionCreators(signInUpCreators, dispatch);
  return {
    signInUpActions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubContainer);
*/
export default SubContainer;
