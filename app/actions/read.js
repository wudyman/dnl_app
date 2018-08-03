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

export function requestArticleList(
  topicId,
  tabIndex,
  dataIndex,
  isRefreshing,
  loading,
  isLoadMore
) {
  return {
    type: types.REQUEST_ARTICLE_LIST,
    topicId,
    tabIndex,
    dataIndex,
    isRefreshing,
    loading,
    isLoadMore
  };
}

export function fetchArticleList(isRefreshing, loading, isLoadMore = false) {
  return {
    type: types.FETCH_ARTICLE_LIST,
    isRefreshing,
    loading,
    isLoadMore
  };
}

export function receiveArticleList(topicId, tabIndex, dataIndex, articleList) {
  return {
    type: types.RECEIVE_ARTICLE_LIST,
    topicId,
    tabIndex,
    dataIndex,
    articleList
  };
}
