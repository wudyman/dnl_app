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
import PropTypes from 'prop-types';
import {
  DeviceEventEmitter,
  InteractionManager,
  ListView,
  StyleSheet,
  View
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import { getArticleList, getTypeName } from '../../utils/ItemsUtil';
import ItemCell from './ItemCell';
import Footer from './Footer';
import EmptyView from './EmptyView';
import ItemListView from './ItemListView';

const propTypes = {
  readActions: PropTypes.object,
  read: PropTypes.object.isRequired
};

let loadMoreTime = 0;
let currentLoadMoreTopicId;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      followTopics: [],
      topicList: []
    };
  }

  componentDidMount() {
    const { readActions } = this.props;
    DeviceEventEmitter.addListener('changeCategory', (followTopics) => {
      console.log(followTopics);
      followTopics.forEach((topic) => {
        readActions.requestArticleList(false, true, topic.id);
      });
      this.setState({
        followTopics
      });
    });
    InteractionManager.runAfterInteractions(() => {
      store.get('followTopics').then((followTopics) => {
        if (!followTopics) {
          return;
        }
        console.log(followTopics);
        let headTopic=followTopics[0];
        readActions.requestArticleList(false, true, headTopic.id);
        //followTopics.forEach((topic) => {
        //  readActions.requestArticleList(false, true, topic.id);
        //});
        store.get('topicList').then(topicList =>
          this.setState({
            followTopics,
            topicList
          }));
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { read } = this.props;
    console.log(read);
    console.log(nextProps);
    if (
      read.isLoadMore &&
      !nextProps.read.isLoadMore &&
      !nextProps.read.isRefreshing
    ) {
      if (nextProps.read.noMore) {
        ToastUtil.showShort('没有更多数据了');
        //const index = this.state.typeIds.indexOf(currentLoadMoreTypeId);
      }
    }
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('changeCategory');
  }

  onRefresh = (topicId) => {
    const { readActions } = this.props;
    console.log("#################################2");
    readActions.requestArticleList(true, false, topicId);
    //const index = this.state.typeIds.indexOf(typeId);
  };

  onPress = (article) => {
    const { navigate } = this.props.navigation;
    navigate('Web', { article });
  };

  onIconClicked = () => {
    this.drawer.openDrawer();
  };

  onEndReached = (topicId) => {
    currentLoadMoreTopicId = topicId;
    const time = Date.parse(new Date()) / 1000;
    //const index = this.state.typeIds.indexOf(topicId);
    //if (index < 0) {
    //  return;
    //}
    if (time - loadMoreTime > 1) {
      const { readActions } = this.props;
      console.log("#################################1");
      readActions.requestArticleList(false, false, topicId, true);
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
  };
  renderFooter = () => {
    const { read } = this.props;
    return read.isLoadMore ? <Footer /> : <View />;
  };

  renderItem = article => (
    <ItemCell article={article} onPressHandler={this.onPress} />
  );

  renderContent = (dataSource, topicId) => {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$a"+topicId);
    const { read } = this.props;
    if (read.loading) {
      return <LoadingView />;
    }
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$b"+topicId);
    const isEmpty =
      read.articleList[topicId] === undefined ||
      read.articleList[topicId].length === 0;
    if (isEmpty) {
      return (
        <EmptyView read={read} topicId={topicId} onRefresh={this.onRefresh} />
      );
    }
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$c"+topicId);
    return (
      <ItemListView
        dataSource={dataSource}
        topicId={topicId}
        isRefreshing={read.isRefreshing}
        onEndReached={this.onEndReached}
        onRefresh={this.onRefresh}
        renderFooter={this.renderFooter}
        renderItem={this.renderItem}
      />
    );
  };

  render() {
    const { read } = this.props;
    const content = this.state.followTopics.map((topic) => {
      /*
      if (this.state.topicList === null) {
        return null;
      }
      if(topic.id<1)
        return;
      console.log('############start##############');
      console.log(this.state.topicList);
      console.log(this.state.topicList);
      const name = getTypeName(this.state.topicList, parseInt(topic.id));
      console.log(name);
      console.log('############end##############');
      */
      const typeView = (
        <View key={topic.id} tabLabel={topic.name} style={styles.base}>
          {this.renderContent(
            this.state.dataSource.cloneWithRows(getArticleList(read.articleList[topic.id])),
            topic.id
          )}
        </View>
      );
      return typeView;
    });
    return (
      <View style={styles.container}>
        <ScrollableTabView
          renderTabBar={() => (
            <ScrollableTabBar
              style={{borderWidth:1,borderColor:'#f8f8f8'}}
              tabStyle={styles.tab}
              textStyle={styles.tabText}
            />
          )}
          onChangeTab={(obj) => {
            let index=obj.i;
            console.log('index:' + index);
            let topicId=this.state.followTopics[index].id;
            console.log('topicId:' + topicId);
            //this.renderContent(
            //  this.state.dataSource.cloneWithRows(getArticleList(read.articleList[topicId])),
            //  topicId
            //  );
            }
          }
          tabBarBackgroundColor="#ffffff"
          tabBarUnderlineStyle={styles.tabBarUnderline}
          tabBarActiveTextColor="#228b22"
          tabBarInactiveTextColor="#aaaaaa"
        >
          {content}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8'
  },
  drawerTitleContent: {
    height: 120,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#228b22'
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  drawerTitle: {
    fontSize: 20,
    textAlign: 'left',
    color: '#fcfcfc'
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: 'black'
  },
  timeAgo: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 5
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  },
  tab: {
    paddingBottom: 0
  },
  tabText: {
    fontSize: 16
  },
  tabBarUnderline: {
    //backgroundColor: '#228b22',
    //height: 2
    backgroundColor: 'transparent',
  }
});

Main.propTypes = propTypes;

export default Main;
