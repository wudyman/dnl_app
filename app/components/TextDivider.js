/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, Text, View, StyleSheet, Platform, PixelRatio, TouchableOpacity, Image } from 'react-native';
import px2dp from '../utils/px2dp';

const propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    containerStyle: ViewPropTypes.style,
    text: PropTypes.string,
    activeOpacity: PropTypes.number
  };
class TextDivider extends React.Component{

    render(){
        return(
            <View style={styles.view}>
                <View style={styles.divider}/>
                <Text style={styles.text}>{this.props.text}</Text>
                <View style={styles.divider}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider:{
        flex: 1,
        backgroundColor: '#3d3d3d',
        height: 1 / PixelRatio.get()
    },
    text:{
        color: '#3d3d3d',
        fontSize: px2dp(10),
        marginLeft: px2dp(9),
        marginRight: px2dp(9)
    }
});

TextDivider.propTypes = propTypes;

TextDivider.defaultProps = {
  onPress() {},
  disabled: false,
  activeOpacity: 0.8
};

export default TextDivider;
