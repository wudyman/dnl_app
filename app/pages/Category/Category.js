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

//import AV from 'leancloud-storage';
import store from 'react-native-simple-store';
import GridView from '../../components/GridView';
import Button from '../../components/Button';
import ImageButton from '../../components/ImageButtonWithText';
import ToastUtil from '../../utils/ToastUtil';
//import NavigationUtil from '../../utils/NavigationUtil';
//import { HEAD_TOPIC_ID, ANSWER_TOPIC_ID } from '../../constants/Constants';
import { FOLLOW_TOPICS_URL } from '../../constants/Urls';

//let tempFollowTopicsIds = [HEAD_TOPIC_ID,ANSWER_TOPIC_ID];
let tempFollowTopics = [];
let tempFollowTopicsIds = [];
let maxCategory = 100; // 未登录最多3个类别，登录后无限制
let isSignIn='false';

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
    console.log("********category componentWillMount*********");
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
          console.log(tempFollowTopicsIds);
        });
      });
    }
  }

  componentDidMount() {
    console.log("********category componentDidMount*********");
    const { categoryActions } = this.props;
    categoryActions.requestTopicList();
    //const query = new AV.Query('Reading_Settings');
    //query.get('57b86e0ba633bd002a96436b').then((settings) => {
    //  maxCategory = settings.get('max_category');
    //});
    const { params } = this.props.navigation.state;
    if (params === undefined || !params.isFirst) {
      this.props.navigation.setParams({ handleCheck: this.onActionSelected });
      store.get('userInfo').then((userInfo)=>{
        if('true'==userInfo.isSignIn)
          isSignIn='true';
        else
          isSignIn='false';
        console.log(isSignIn);
      });
    }
  }

  followTopicsServer(topicsIds) {
    let formData=new FormData();
    formData.append("topicsIds",""+topicsIds);
    fetch(FOLLOW_TOPICS_URL, {
      method:'POST',
      body:formData
    })
      .then((response) => {
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then((responseData) => {
        if (isOk) {
          console.log(responseData);
        } else {
          console.log(responseData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
      Alert.alert('提示', '您确定不选择任何栏目吗？', [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          onPress: () => {
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
        if("true"==isSignIn)
        {
          console.log('*******followTopicsServer********');
          this.followTopicsServer(tempFollowTopicsIds);
        }
        store.save('followTopics', this.state.followTopics).then(this.routeMain);

      });
    });
  };

  routeMain = () => {
    console.log(this.state.followTopics);
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
            ? { backgroundColor: '#898' }
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
            colors={['#228b22cc', '#00ff00ff', '#ffffbb33', '#ffff4444']}
            //colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
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

  renderItemMyTopic = (item) => {
    return (
      <Button
        key={item.id}
        btnStyle={[
          styles.categoryBtn,
          {backgroundColor: '#006400'}
        ]}
        textStyle={[
          styles.categoryText,
          { color: '#fcfcfc' }
        ]}
        text={item.name}
        onPress={() => this.onPress(item)}
      />
    );
  };

  renderGridViewMyTopic = () => {
    const { category } = this.props;
    return (

        <View style={styles.gridLayout}>
          <GridView
            items={Array.from(tempFollowTopics)}
            itemsPerRow={2}
            renderItem={this.renderItemMyTopic}
          />
        </View>

    );
  };

  render() {
    const { params } = this.props.navigation.state;
    if (params !== undefined && params.isFirst) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <ImageButton btnStyle={{padding:10}} icon="md-close" iconSize={25} iconColor="black" activeOpacity={0.2} onPress={() => this.onSelectCategory()}/>
            <View style={styles.title}>
              <Text style={styles.titleText}>栏目</Text>
            </View>
            <ImageButton btnStyle={{padding:10}} icon="md-checkmark" iconSize={25} iconColor="black" activeOpacity={0.2} onPress={() => this.onSelectCategory()}/>
          </View>           

          <View style={styles.greet}>
            <Text style={styles.greetText}>
              初次见面，请选择您感兴趣的栏目
            </Text>
          </View>
          {this.renderGridView()}
          <Button
            btnStyle={styles.sureBtn}
            textStyle={styles.sureBtnText}
            text="确认"
            onPress={() => this.onSelectCategory()}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <ImageButton btnStyle={{padding:10}} icon="md-close" iconSize={25} iconColor="black" activeOpacity={0.2} onPress={() => this.onActionSelected()}/>
          <View style={styles.title}>
            <Text style={styles.titleText}>栏目</Text>
          </View>
          <ImageButton btnStyle={{padding:10}} icon="md-checkmark" iconSize={25} iconColor="black" activeOpacity={0.2} onPress={() => this.onActionSelected()}/>
        </View>   

        <View style={styles.myTopic}>
          <Text style={styles.myTopicText}>我的栏目</Text>
          <Text style={styles.myTopicSubText}>点击栏目移除</Text> 
        </View>
        {this.renderGridViewMyTopic()}
        <View style={{paddingBottom:50}}/>
        <View style={styles.allTopic}>
          <Text style={styles.allTopicText}>所有栏目</Text>
          <Text style={styles.allTopicSubText}>点击栏目添加或移除</Text>
        </View>
        {this.renderGridView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    //flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'flex-start',
    //alignItems:'flex-start',
    //alignContent:'flex-start',
    backgroundColor: '#fff'
  },
  header: {
  flexDirection: 'row',
  justifyContent:'space-between',
  margin:10
  },
  title: {
    padding: 10,
    backgroundColor: '#fcfcfc'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  myTopic: {
    marginLeft: 20,
    marginTop:20,
    marginBottom:10,
    //flex: 1,  //can`t use
    flexDirection: 'row',
    //justifyContent: 'flex-start',
    //alignItems:'flex-start',
    //alignContent:'flex-start',
  },
  myTopicText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  myTopicSubText: {
    marginLeft:5,
    fontSize: 16,
    textAlign: 'center',
    color: '#ccc'
  },
  allTopic: {
    marginLeft: 20,
    marginTop:20,
    marginBottom:10,
    //flex: 1,  //can`t use
    flexDirection: 'row',
    //justifyContent: 'flex-start',
    //alignItems:'flex-start',
    //alignContent:'flex-start',
  },
  allTopicText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  allTopicSubText: {
    marginLeft:5,
    fontSize: 16,
    textAlign: 'center',
    color: '#ccc'
  },
  categoryBtn: {
    margin: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee'
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center'
  },
  gridLayout: {
    //flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  sureBtn: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#228b22'
  },
  sureBtnText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff'
  },
  greet: {
    padding: 10,
    backgroundColor: '#fcfcfc'
  },
  greetText: {
    padding: 5,
    fontSize: 16,
    color: 'black',
    textAlign: 'center'
  }
});

Category.propTypes = propTypes;

export default Category;
