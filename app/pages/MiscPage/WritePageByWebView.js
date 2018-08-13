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
import { WebView, Text, View, StyleSheet, PixelRatio, Platform, TouchableOpacity, Image, TextInput, BackHandler} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import WebView2 from '../../components/WebView2';
import ImageButton from '../../components/ImageButtonWithText';
class WritePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
        this.handleBack = this._handleBack.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }
    
    _injectedJavaScript()
    {
        return `$("header").parent().addClass("is-hide");`; 
    }

    _handleBack() {

    }

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.closeButton}>
                <ImageButton
                    onPress={this.props.closePage}
                    icon="md-close"
                    iconColor="white"
                    iconSize={25}
                    btnStyle={{width: 55, height: 55, alignItems: 'center',justifyContent: 'center'}}
                />
            </View>
            <WebView2
            ref={(ref) => {
              this.webview = ref;
            }}
            style={styles.base}
            source={{ uri: this.props.pageUrl }}
            javaScriptEnabled={true}
            domStorageEnabled
            startInLoadingState
            scalesPageToFit
            decelerationRate="normal"
            injectedJavaScript={`g_is_app="true";$(".Mobile-header").addClass("is-hide");`}
            onShouldStartLoadWithRequest={() => {
              const shouldStartLoad = true;
              return shouldStartLoad;
            }}
            onNavigationStateChange={this.onNavigationStateChange}
            renderLoading={this.renderLoading}
          />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    closeButton:{
        marginTop: (Platform.OS === 'ios') ? 10 : 0,
        backgroundColor: '#228b22'
    },
    base: {
        flex: 1
    }

});
  
export default WritePage;