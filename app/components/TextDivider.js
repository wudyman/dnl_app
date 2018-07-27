/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';

const propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
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
        height: 1
    },
    text:{
        color: '#3d3d3d',
        fontSize: 10,
        marginLeft: 9,
        marginRight: 9
    }
});

TextDivider.propTypes = propTypes;

TextDivider.defaultProps = {
  onPress() {},
  disabled: false,
  activeOpacity: 0.8
};

export default TextDivider;
