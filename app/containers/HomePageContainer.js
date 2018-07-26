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

import HomePage from '../pages/HomePage/HomePage';

class HomePageContainer extends React.Component {
  static navigationOptions = {
    title: '我',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-person" size={25} color={tintColor} />
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

  render() {
    return <HomePage {...this.props} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
