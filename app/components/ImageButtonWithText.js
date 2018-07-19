/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes,Text, View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Image } from 'react-native';
import px2dp from '../utils/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';

const propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    containerStyle: ViewPropTypes.style,
    text: PropTypes.string,
    activeOpacity: PropTypes.number,
    image: PropTypes.number,
    icon: PropTypes.string,
    imgSize: PropTypes.number,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    btnStyle: View.propTypes.style
};
const ImageButton=({
    onPress,
    disabled,
    containerStyle,
    style,
    activeOpacity,
    image,
    icon,
    text, 
    color, 
    imgSize, 
    fontSize, 
    btnStyle  
})=>
{
    if (image) {
        return (
        <TouchableOpacity style={containerStyle} onPress={onPress} disabled={disabled} activeOpacity={activeOpacity}>
                <View style={[styles.view, btnStyle]}>
                    <Image source={image} style={{width: imgSize, height: imgSize}}/>
                    {text ?
                        <Text style={[styles.text, {fontSize: fontSize, color: color}]}>{text}</Text>
                        :
                        null
                    }
                </View>
        </TouchableOpacity>
        );
    }
    else if(icon)
    {
        return (
            <TouchableOpacity style={containerStyle} onPress={onPress} disabled={disabled} activeOpacity={activeOpacity}>
            <View style={[styles.view, btnStyle]}>
            <Icon name={icon} size={imgSize} color={color}/>
            {text ?
                <Text style={{fontSize: fontSize, color: color}}>{text}</Text>
                :
                null
            }
            </View>
            </TouchableOpacity>
        )
    }
};

/*
class ImageButton extends React.Component{
    render() {
        const {image, icon, onPress} = this.props;

        if (Platform.OS === 'ios') {
            if (image) {
                return (
                    <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                        {this._renderContentWithImage()}
                    </TouchableOpacity>
                );
            } else if (icon) {
                return (
                    <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                        {this._renderContentWithIcon()}
                    </TouchableOpacity>
                );
            }
        } else if (Platform.OS === 'android') {
            if (image) {
                return (
                    <TouchableNativeFeedback onPress={onPress}>
                        {this._renderContentWithImage()}
                    </TouchableNativeFeedback>
                );
            } else if (icon) {
                return (
                    <TouchableNativeFeedback onPress={onPress}>
                        {this._renderContentWithIcon()}
                    </TouchableNativeFeedback>
                );
            }
        }
    }

    _renderContentWithImage(){
        const {text, image, color, imgSize, fontSize, btnStyle} = this.props;
        return(
            <View style={[styles.view, btnStyle]}>
                <Image source={image} style={{width: imgSize, height: imgSize}}/>
                {text ?
                    <Text style={[styles.text, {fontSize: fontSize, color: color}]}>{text}</Text>
                    :
                    null
                }
            </View>
        );
    }

    _renderContentWithIcon(){
        const {text, icon, color, imgSize, fontSize, btnStyle} = this.props;
        return(
            <View style={[styles.view, btnStyle]}>
                <Icon name={icon} size={imgSize} color={color}/>
                {text ?
                    <Text style={{fontSize: fontSize, color: color}}>{text}</Text>
                    :
                    null
                }
            </View>
        );
    }
}
*/
const styles = StyleSheet.create({
    view:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        color: 'rgba(255,255,255,0.7)',
        marginTop: px2dp(4)
    }
});

ImageButton.propTypes = propTypes;
ImageButton.defaultProps = {
    onPress() {},
    disabled: false,
    activeOpacity: 0.8,
    imgSize: px2dp(40),
    fontSize: px2dp(13)
};
export default ImageButton;