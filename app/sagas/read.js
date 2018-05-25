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

import * as types from '../constants/ActionTypes';
import ToastUtil from '../utils/ToastUtil';
import RequestUtil from '../utils/RequestUtil';
import { SITE_URL } from '../constants/Urls';
import { fetchArticleList, receiveArticleList } from '../actions/read';

function getIndexImg(content){
  var imgReg=/<img.*?(?:>|\/>)/gi;
  var arr=content.match(imgReg);
  if(arr!=null)
  {
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      imgsrc=arr[0].match(srcReg);
      return imgsrc[1];
  }
  else
      return null;
}
function convertQuestionList(ret)
{
  var questions=[];
  ret.map((item)=>{
    let question={};
    question.date="2018-05-23 22:15:56";
    question.weixinNum="beautify_english";
    question.ct="2018-05-24 08:00:04.677";
    question.id=""+item[0];
    question.typeName="段子手";
    question.title=""+item[1];
    question.contentImg=SITE_URL+getIndexImg(item[9]);
    question.userLogo="http://wx.qlogo.cn/mmhead/Q3auHgzwzM4mLXrmkfocJUR1zkV4QVjrDj5FibDojH7cJ4vUZe6qBFw/132";
    question.lut="2018-05-25 16:30:03.510";
    question.userName=""+item[6];
    question.like_num=0;
    question.read_num=0;
    question.typeId=""+item[2];
    question.userLogo_code="https://open.weixin.qq.com/qr/code?username=beautify_english";
    question.answerId=item[4];
    question.url=SITE_URL+"/question/"+question.id+"/?ans="+question.answerId;
    questions.push(question);
  });
  return questions;
}
export function* requestArticleList(
  isRefreshing,
  loading,
  typeId,
  isLoadMore,
  page
) {
  try {
    yield put(fetchArticleList(isRefreshing, loading, isLoadMore));
    const ret = yield call(
      RequestUtil.request,
      `${SITE_URL}/ajax/topic/${typeId}/1/0/20/`,
      'post'
    );
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    const articleList=convertQuestionList(ret);
    console.log(articleList);
    yield put(receiveArticleList(
      articleList,
      typeId
    ));
    const errorMessage = articleList;
    if (errorMessage && errorMessage == 'fail') {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveArticleList([], typeId));
    ToastUtil.showShort('网络发生错误，请重试');
  }
}

export function* watchRequestArticleList() {
  while (true) {
    const {
      isRefreshing, loading, typeId, isLoadMore, page
    } = yield take(types.REQUEST_ARTICLE_LIST);
    yield fork(
      requestArticleList,
      isRefreshing,
      loading,
      typeId,
      isLoadMore,
      page
    );
  }
}
