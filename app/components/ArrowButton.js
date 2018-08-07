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
    textStyle: Text.propTypes.style,
    tipsStyle: Text.propTypes.style,
    text: PropTypes.string,
    tips: PropTypes.string,
    activeOpacity: PropTypes.number,
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string
};
const ArrowButton=({
    onPress,
    disabled,
    activeOpacity,
    icon,
    text,
    tips, 
    btnStyle,
    textStyle,
    tipsStyle,
    iconSize,
    iconColor  
})=>
{
    return (
        <TouchableOpacity style={{flexDirection: 'row',justifyContent: 'space-between',paddingTop:15, paddingBottom:15}}  onPress={onPress} disabled={disabled} activeOpacity={activeOpacity}>

        {text ?
            <Text style={textStyle}>{text}</Text>
            :
            null
        }
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
        {tips ?
            <Text style={tipsStyle}>{tips}</Text>
            :
            null
        }
        <Icon name={icon} size={iconSize} color={iconColor}/>
        </View>

        </TouchableOpacity>
    )
};

ArrowButton.propTypes = propTypes;
ArrowButton.defaultProps = {
    onPress() {},
    disabled: false,
    activeOpacity: 0.8,
};
export default ArrowButton;