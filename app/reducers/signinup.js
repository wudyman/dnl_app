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
import * as types from '../constants/ActionTypes';

const initialState = {
  isStart: false,
  signInResult: 'fail',
  userInfo:{}
};

export default function signinup(state = initialState, action) {
  switch (action.type) {
    case types.INIT_SIGN_IN:
    return Object.assign({}, state, {
      isStart: false,
      signInResult: 'fail'
    });
    case types.START_SIGN_IN:
      return Object.assign({}, state, {
        isStart: true
      });
    case types.END_SIGN_IN:
      return Object.assign({}, state, {
        isStart: false,
        signInResult: action.signInResult
      });
    case types.RECEIVE_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.userInfo
      });
    default:
      return state;
  }
}
