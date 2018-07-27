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
    btnStyle: View.propTypes.style,
    imgStyle: Image.propTypes.style,
    textStyle: Text.propTypes.style,
    text: PropTypes.string,
    activeOpacity: PropTypes.number,
    image: PropTypes.number,
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string
};
const ImageButton=({
    onPress,
    disabled,
    activeOpacity,
    image,
    icon,
    text, 
    btnStyle,
    imgStyle,
    textStyle,
    iconSize,
    iconColor  
})=>
{
    if (image) {
        return (
        <TouchableOpacity style={btnStyle} onPress={onPress} disabled={disabled} activeOpacity={activeOpacity}>
                    <Image source={image} style={imgStyle}/>
                    {text ?
                        <Text style={textStyle}>{text}</Text>
                        :
                        null
                    }
        </TouchableOpacity>
        );
    }
    else if(icon)
    {
        return (
            <TouchableOpacity style={btnStyle} onPress={onPress} disabled={disabled} activeOpacity={activeOpacity}>
            <Icon name={icon} size={iconSize} color={iconColor}/>
            {text ?
                <Text style={texStyle}>{text}</Text>
                :
                null
            }
            </TouchableOpacity>
        )
    }
};

ImageButton.propTypes = propTypes;
ImageButton.defaultProps = {
    onPress() {},
    disabled: false,
    activeOpacity: 0.8,
};
export default ImageButton;