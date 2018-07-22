/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
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
import { put, take, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';
import * as types from '../constants/ActionTypes';
import ToastUtil from '../utils/ToastUtil';
import RequestUtil from '../utils/RequestUtil';
import { SIGN_IN_URL } from '../constants/Urls';
import { startSignIn,endSignIn } from '../actions/signinup';

export function* signIn() {
    let formData=new FormData();
    formData.append("phoneNo","13927409313");
    formData.append("password","shenlin830921");
  try {
    console.log("######################SIGN IN 1##############################");
    yield put(startSignIn());
    console.log("######################SIGN IN 2##############################");
    const ret = yield call(RequestUtil.request, SIGN_IN_URL, 'post',formData);
    console.log("######################SIGN IN 3##############################");
    yield put(endSignIn());
    console.log("######################SIGN IN 4##############################");
    const errorMessage = ret;
    //if (errorMessage && errorMessage == 'fail') {
    //  yield  ToastUtil.showShort(errorMessage);
    //}
  } catch (error) {
    console.log("######################SIGN IN 5##############################");
    yield put(endSignIn());
    console.log("######################SIGN IN 6##############################");
    yield ToastUtil.showShort('登录失败');
    console.log("######################SIGN IN 7##############################");
  }
}

export function* watchSignInUp() {
  while (true) {
    console.log("######################watchSignInUp 1 ##############################");
    yield take(types.REQUEST_SIGN_IN);
    console.log("######################watchSignInUp 2 ##############################");
    yield fork(signIn);
    console.log("######################watchSignInUp 3 ##############################");
  }
}
