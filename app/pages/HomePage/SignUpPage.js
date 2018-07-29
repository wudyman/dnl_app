/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React from 'react';
import {Text, View, StyleSheet, PixelRatio, Platform, TouchableOpacity, Image, TextInput, BackHandler} from 'react-native';
import Button from '../../components/Button';
import ImageButton from '../../components/ImageButtonWithText';
import { GET_SMS_URL } from '../../constants/Urls';


export default class SignUpPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            smsGetDisable : false,
            phoneNo : "",
            smsCode : "",
            nickName : "",
            password : "",
            countDownValue: 60
        };
        this.aInterval=null;
        this.handleBack = this._handleBack.bind(this);// In Modal, no use , block by Modal`s onRequestClose
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    _signUp() {
        const { signInUpActions } = this.props;
        signInUpActions.requestSignUp(this.state.phoneNo,this.state.smsCode,this.state.nickName,this.state.password);
    }

    _handleBack() {
        return true;
    }

    _getSmsCode(){
        let formData=new FormData();
        formData.append("phone_no",this.state.phoneNo);
        formData.append("type","register");
        fetch(GET_SMS_URL, {
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
            console.log(error);
          });

        this.setState({smsGetDisable:true,countDownValue:60});
        this.aInterval=setInterval(this._countDown.bind(this),1000);
    }

    _countDown(){
        if(0==this.state.countDownValue){
            this.setState({smsGetDisable:false,countDownValue:60});
            clearInterval(this.aInterval);
        }
        else{
            this.setState({countDownValue:this.state.countDownValue-1});
        }
    }

    _signupCallback(){

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
                <View style={styles.title}>
                    <Text style={styles.mainTitle}>注册大农令</Text>
                    <Text style={styles.subTitle}>关注新农村,新农业,新农民</Text>
                </View>
                <View style={styles.signUp}>
                    <View style={styles.accout}>
                        <TextInput
                            style={styles.edit}
                            keyboardType='numeric'
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
                    <View style={styles.smsInput}>
                        <View style={styles.smsInputEdit}>
                            <TextInput
                                style={[styles.edit,{width:180}]}
                                keyboardType='numeric'
                                underlineColorAndroid="transparent"
                                placeholder="请输入短信验证码"
                                onChangeText={
                                    (text) => {
                                      this.setState({smsCode:text});
                                    }
                                }
                                placeholderTextColor="#c4c4c4"/>
                                <View style={{height: 2, backgroundColor:'#c4c4c4'}}/>
                        </View>                       
                        <View style={styles.smsInputButton}>
                            <Button disabled={this.state.smsGetDisable} text={this.state.smsGetDisable?this.state.countDownValue+"秒后可重发":"获取短信验证码"} btnStyle={styles.smsInputButtonBtn} textStyle={styles.smsInputButtonText} onPress={this._getSmsCode.bind(this)}/>
                        </View>                        
                    </View>
                    
                    <View style={styles.nickName}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid="transparent"
                            placeholder="昵称"
                            onChangeText={
                                (text) => {
                                  this.setState({nickName:text});
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
                    <View style={styles.signUpButton}>
                        <Button btnStyle={styles.signUpButtonBtn} textStyle={styles.signUpButtonText} text="注册" onPress={this._signUp.bind(this)}/>
                    </View>
                    <View style={styles.switchSignInUpButton}>
                        <Button btnStyle={styles.switchSignInUpButtonBtn} textStyle={styles.switchSignInUpButtonText} text="已有帐号？登录" onPress={this.props.switchSignInUp}/>
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
    signUp:{
        margin: 15
    },
    accout:{
        height: 48,
        backgroundColor:'white',
        justifyContent: 'center',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    smsInput:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
        backgroundColor:'white'
    },
    smsInputEdit:{

    },
    smsInputButton:{
        
    },
    smsInputButtonBtn:{
        padding: 5,
        borderWidth:1,
        borderColor:'#228b22',
        borderRadius: 3,
        borderStyle:'dotted'
    },
    smsInputButtonText:{
        color:'#228b22',
    },
    nickName:{
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
    signUpButton:{
        marginTop: 30,
        alignItems: 'stretch'
    },
    signUpButtonBtn:{
        alignItems: 'center',
        backgroundColor: '#228b22',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    signUpButtonText:{
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
});