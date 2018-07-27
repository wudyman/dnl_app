/**
 * Created by wangdi on 4/11/16.
 */
import React from 'react';
import { WebView, Text, View, StyleSheet, PixelRatio, Platform, TouchableOpacity, Image, TextInput, BackHandler} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import ImageButton from '../../components/ImageButtonWithText';
class UserInfoPage extends React.Component{
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
        /*
        return `
        $(document).ready(function(){
            $("header").parent().addClass("is-hide");
        });
        `;
       */   
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
            <WebView
            ref={(ref) => {
              this.webview = ref;
            }}
            style={styles.base}
            source={{ uri: this.props.userInfoUrl }}
            javaScriptEnabled={true}
            domStorageEnabled
            startInLoadingState
            scalesPageToFit
            decelerationRate="normal"
            injectedJavaScript={this._injectedJavaScript()}
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
  
export default UserInfoPage;