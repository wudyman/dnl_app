/**
 * Created by wangdi on 4/11/16.
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Text, View, StyleSheet, PixelRatio, Platform, TouchableOpacity, Image, TextInput, BackHandler} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
//import MainPage from '../MainPage';
import Button from '../../components/Button';
import TextButton from '../../components/TextButton';
//import SignUpPage from './SignUpPage';
import ImageButton from '../../components/ImageButtonWithText';
import TextDivider from '../../components/TextDivider';
import px2dp from '../../utils/px2dp';
//import * as signInUpCreators from '../../actions/signinup';
import configureStore from '../../store/configure-store';
//const store = configureStore();
class SignInPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phoneNo : "",
            password : "",
        };
        this.handleBack = this._handleBack.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    _signIn() {
        //store.dispatch(signInUpCreators.requestSignIn(true));
        //gSignInUpActions.requestSignIn(this.state.phoneNo,this.state.password);
        const { signInUpActions } = this.props;
        signInUpActions.requestSignIn(this.state.phoneNo,this.state.password);
    }
    _handleBack() {

    }

    _signupCallback(){
    }

    _forgetPassword(){

    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.closeButton}>
                    <ImageButton
                        onPress={this.props.closePage}
                        icon="md-close"
                        color="white"
                        imgSize={25}
                        btnStyle={{width: 55, height: 55}}
                    />
                </View>
                <View style={styles.title}>
                    <Text style={styles.mainTitle}>登录大农令</Text>
                    <Text style={styles.subTitle}>关注新农村,新农业,新农民</Text>
                </View>
                <View style={styles.signIn}>
                    <View style={styles.accout}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid="transparent"
                            placeholder="手机号"
                            onChangeText={
                                (text) => {
                                  this.setState({phoneNo:text});
                                }
                            }
                            placeholderTextColor="#c4c4c4"/>
                    </View>
                    <View style={{height: 1, backgroundColor:'#c4c4c4'}}/>
                    <View style={styles.password}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid="transparent"
                            placeholder="密码"
                            onChangeText={
                                (text) => {
                                  this.setState({password:text});
                                }
                            }
                            placeholderTextColor="#c4c4c4"/>
                    </View>
                    <View style={{height: 1, backgroundColor:'#c4c4c4'}}/>
                    <View style={styles.forget}>
                        <Button style={styles.forgetText} text="忘记密码?" onPress={this._forgetPassword.bind(this)} />
                    </View>
                    <View style={styles.signInButton}>
                        <TextButton btnStyle={styles.signInButtonBtn} textStyle={styles.signInButtonText} text="登录" onPress={this._signIn.bind(this)}/>
                    </View>
                    <View style={styles.switchSignInUpButton}>
                        <TextButton btnStyle={styles.switchSignInUpButtonBtn} textStyle={styles.switchSignInUpButtonText} text="没有帐号？注册" onPress={this.props.switchSignInUp}/>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 20, marginRight: 20}}>
                        <TextDivider text="其他账号登录"/>
                    </View>
                    <View style={styles.thirdPartyView}>
                        <ImageButton text="微博" image={require('../../img/weibo_login.png')} color="rgba(255,255,255,0.7)"/>
                        <ImageButton text="微信" image={require('../../img/wechat_login.png')} color="rgba(255,255,255,0.7)"/>
                        <ImageButton text="Github" image={require('../../img/github_login.png')} color="rgba(255,255,255,0.7)"/>
                    </View>
                </View>
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
    title:{
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: '#228b22'
    },
    mainTitle:{
        color: 'white',
        fontSize: 24
    },
    subTitle:{
        color: 'white',
        fontSize: 20
    },
    signIn:{
        margin: 15
    },
    accout:{
        height: 48,
        backgroundColor:'white',
        justifyContent: 'center',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    password:{
        height: 48,
        backgroundColor:'white',
        justifyContent: 'center',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    forget:{
        marginTop: 10,
        alignItems: 'flex-end'
    },
    forgetText:{
        color: '#aaaaaa'
    },
    signInButton:{
        marginTop: 30,
        alignItems: 'stretch'
    },
    signInButtonBtn:{
        alignItems: 'center',
        backgroundColor: '#228b22',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    signInButtonText:{
        paddingTop:5,
        paddingBottom:5,
        fontSize:20,
        color:'white'
    },
    edit:{
        fontSize: 20,
        backgroundColor: '#fff'
    },
    switchSignInUpButton:{
        marginTop: 30,
        alignItems: 'stretch'
    },
    switchSignInUpButtonBtn:{
        alignItems: 'center',
        backgroundColor: '#eeeeee',
    },
    switchSignInUpButtonText:{
        paddingTop:5,
        paddingBottom:5,
        fontSize: 16
    },
    thirdPartyView:{
        flex: 1,
        marginTop: 10,
        flexDirection:'row',
        alignItems: 'flex-start',
        justifyContent:'space-around'
    }

});
/*
const mapStateToProps = (state) => {
    const { signinup } = state;
    return {
        signinup
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    const signInUpActions = bindActionCreators(signInUpCreators, dispatch);
    gSignInUpActions=signInUpActions;
    return {
        signInUpActions
    };
  };
*/

   
  
//export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
  
export default SignInPage;