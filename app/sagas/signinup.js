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
import { SITE_URL } from '../constants/Urls';
import { SIGN_IN_URL,REQUEST_USER_INFO_URL } from '../constants/Urls';
import { startSignIn,endSignIn,requestUserInfo,receiveUserInfo } from '../actions/signinup';
function convertUserInfo(ret)
{
  let userInfo={};
  userInfo.id=ret[0];
  userInfo.name=ret[1];
  userInfo.avatar=ret[2];
  if(userInfo.avatar.indexOf('http')<0)
  {
    userInfo.avatar=SITE_URL+userInfo.avatar;
  }
  userInfo.mood=ret[3];

  userInfo.url=SITE_URL+'/er/'+ret[0]+'/'
  userInfo.isSignIn='true';
  return userInfo;
}
export function* signIn(phoneNo,password) {
  let formData=new FormData();
  formData.append("phoneNo",phoneNo);
  formData.append("password",password);
  try {
    yield put(startSignIn());
    const ret = yield call(RequestUtil.request, SIGN_IN_URL, 'post',formData);
    yield put(endSignIn(ret));
    if(ret == 'success')
    {
      yield ToastUtil.showShort("登录成功");
      let formData=new FormData();
      formData.append("type","userprofile");
      yield put(requestUserInfo());
      const ret = yield call(RequestUtil.request, REQUEST_USER_INFO_URL, 'post',formData);
      if("fail"!=ret)
      {
        const userInfo=convertUserInfo(ret);
        yield put(receiveUserInfo(userInfo));
      }
    }
    else
    {
      yield  ToastUtil.showShort("登录失败");
    }
  } catch (error) {
    yield put(endSignIn('fail'));
    yield ToastUtil.showShort('登录失败');
  }
}

export function* watchSignInUp() {
  while (true) {
    const {phoneNo,password} = yield take(types.REQUEST_SIGN_IN);
    yield fork(signIn,phoneNo,password);
  }
}
