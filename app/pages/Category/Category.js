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
  InteractionManager,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  ScrollView,
  RefreshControl,
  Alert
} from 'react-native';

import AV from 'leancloud-storage';
import store from 'react-native-simple-store';
import GridView from '../../components/GridView';
import Button from '../../components/Button';
import ToastUtil from '../../utils/ToastUtil';
import NavigationUtil from '../../utils/NavigationUtil';
import { HEAD_TOPIC_ID, ANSWER_TOPIC_ID } from '../../constants/Constants';

let initFollowTopics = [{'id':HEAD_TOPIC_ID,'name':'头条','dataIndex':0},{'id':ANSWER_TOPIC_ID,'name':'回答','dataIndex':0}];
let [ ...tempFollowTopics ] = initFollowTopics;
let tempFollowTopicsIds = [HEAD_TOPIC_ID,ANSWER_TOPIC_ID];
let maxCategory = 5; // 未登录最多3个类别，登录后无限制

const propTypes = {
  categoryActions: PropTypes.object,
  category: PropTypes.object.isRequired
};

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followTopics: tempFollowTopics
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params === undefined || !params.isFirst) {
      InteractionManager.runAfterInteractions(() => {
        store.get('followTopics').then((followTopics) => {
          if(null!=followTopics)
          {
            tempFollowTopics = followTopics;
            this.setState({
              followTopics
            });
          }
          tempFollowTopicsIds=[];
          tempFollowTopics.map((topic)=>{tempFollowTopicsIds.push(topic.id);});
        });
      });
    }
  }

  componentDidMount() {
    const { categoryActions } = this.props;
    categoryActions.requestTopicList();
    //const query = new AV.Query('Reading_Settings');
    //query.get('57b86e0ba633bd002a96436b').then((settings) => {
    //  maxCategory = settings.get('max_category');
    //});
    const { params } = this.props.navigation.state;
    if (params === undefined || !params.isFirst) {
      this.props.navigation.setParams({ handleCheck: this.onActionSelected });
    }
  }

  onRefresh = () => {
    const { categoryActions } = this.props;
    categoryActions.requestTopicList();
  };

  onPress = (item) => {
    const pos = tempFollowTopicsIds.indexOf(item.id);
    if (pos === -1) {
      let tempTopic={'id':item.id,'name':item.name,'dataIndex':0};
      tempFollowTopics.push(tempTopic);
    } else {
      tempFollowTopics.splice(pos, 1);
    }
    tempFollowTopicsIds=[];
    tempFollowTopics.map((topic)=>{tempFollowTopicsIds.push(topic.id);});
    console.log(tempFollowTopicsIds);
    this.setState({
      followTopics: tempFollowTopics
    });
  };

  onSelectCategory = () => {
    if (this.state.followTopics.length === 0) {
      Alert.alert('提示', '您确定不选择任何分类吗？', [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          onPress: () => {
            //store.save('followTopics', this.state.followTopics);
            //NavigationUtil.reset(this.props.navigation, 'Home');
            store.save('followTopics', this.state.followTopics)
            .then(store.save('isInit', true))
            .then(this.routeMain);
          }
        }
      ]);
    } 
    else if (this.state.followTopics.length > maxCategory) {
      ToastUtil.showShort(`不要超过${maxCategory}个类别哦`);
    } 
    else {
      //store.save('followTopics', this.state.followTopics);
      //store.save('isInit', true);
      //NavigationUtil.reset(this.props.navigation, 'Home');
      store.save('followTopics', this.state.followTopics)
      .then(store.save('isInit', true))
      .then(this.routeMain);
    }
  };

  onActionSelected = () => {
    if (tempFollowTopics.length > maxCategory) {
      ToastUtil.showShort(`不要超过${maxCategory}个类别哦`);
      return;
    }
    if (tempFollowTopics.length < 1) {
      ToastUtil.showShort('不要少于1个类别哦');
    }
    const { navigate } = this.props.navigation;
    InteractionManager.runAfterInteractions(() => {
      store.get('followTopics').then((followTopics) => {
        if(null!=followTopics)
        { 
          tempFollowTopicsIds=[];
          tempFollowTopics.map((topic)=>{tempFollowTopicsIds.push(topic.id);});
          let followTopicsIds=[];
          followTopics.map((topic)=>{followTopicsIds.push(topic.id);});
          if (
            followTopicsIds.sort().toString() ===
            Array.from(tempFollowTopicsIds)
              .sort()
              .toString()
          ) {
            navigate('Main');
            return;
          }
        }
        store.save('followTopics', this.state.followTopics).then(this.routeMain);

      });
    });
  };

  routeMain = () => {
    const { navigate } = this.props.navigation;
    DeviceEventEmitter.emit('changeCategory', this.state.followTopics);
    navigate('Main');
  };

  renderItem = (item) => {
    const isSelect = Array.from(tempFollowTopicsIds).indexOf(item.id) !== -1;
    return (
      <Button
        key={item.id}
        btnStyle={[
          styles.categoryBtn,
          isSelect
            ? { backgroundColor: '#228b22' }
            : { backgroundColor: '#fcfcfc' }
        ]}
        textStyle={[
          styles.categoryText,
          isSelect ? { color: '#fcfcfc' } : { color: 'black' }
        ]}
        text={item.name}
        onPress={() => this.onPress(item)}
      />
    );
  };

  renderGridView = () => {
    const { category } = this.props;
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        horizontal={false}
        contentContainerStyle={styles.no_data}
        style={styles.base}
        refreshControl={
          <RefreshControl
            refreshing={category.loading}
            onRefresh={this.onRefresh}
            title="Loading..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }
      >
        <View style={styles.gridLayout}>
          <GridView
            items={Array.from(category.topicList)}
            itemsPerRow={3}
            renderItem={this.renderItem}
          />
        </View>
      </ScrollView>
    );
  };

  render() {
    const { params } = this.props.navigation.state;
    if (params !== undefined && params.isFirst) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={[
                styles.btnText,
                { color: 'black', padding: 5, fontSize: 18 }
              ]}
            >
              初次见面，请选择您感兴趣的1-5个类别
            </Text>
          </View>
          {this.renderGridView()}
          <Button
            btnStyle={styles.sureBtn}
            textStyle={styles.btnText}
            text="确认"
            onPress={() => this.onSelectCategory()}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.btnText, { color: 'black' }]}>
            请选择您感兴趣的1-5个类别
          </Text>
        </View>
        {this.renderGridView()}
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
  categoryBtn: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd'
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center'
  },
  gridLayout: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
  },
  sureBtn: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#228b22'
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff'
  },
  header: {
    padding: 10,
    backgroundColor: '#fcfcfc'
  }
});

Category.propTypes = propTypes;

export default Category;
