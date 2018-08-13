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

import SignPage from '../pages/MiscPage/SignPage';
import WritePage from '../pages/MiscPage/WritePageByWebView';

import ToastUtil from '../utils/ToastUtil';
import { WRITE_URL} from '../constants/Urls';

let gUserInfo={};
class MiscContainer extends React.Component {
  _closePage(){
    console.log('*******MiscContainer _closePage*******');
    this.props.navigation.pop();
  }

  componentWillMount() {
    console.log('*******MiscContainer componentWillMount*******');
    const { params } = this.props.navigation.state;
    if((params.pageType!='sign')&&(params.isSignIn=='false'))
    {
      ToastUtil.showShort("此功能需要先登录");
    }
  }


  render() {
    const { params } = this.props.navigation.state;
    if(params.isSignIn=='false')
      return <SignPage closePage={()=>this._closePage()} {...this.props} />;
    else if(params.pageType=='ask')
      return <WritePage closePage={()=>this._closePage()} writePageUrl={WRITE_URL}/>;
    else if(params.pageType=='write')
      return <WritePage closePage={()=>this._closePage()} writePageUrl={WRITE_URL}/>;
    else if(params.pageType=='search')
      return <WritePage closePage={()=>this._closePage()} writePageUrl={WRITE_URL}/>;
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(MiscContainer);
