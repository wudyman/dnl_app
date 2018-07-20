/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes,Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import px2dp from '../utils/px2dp';

const propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    containerStyle: ViewPropTypes.style,
    text: PropTypes.string,
    activeOpacity: PropTypes.number,       
    color: PropTypes.string,
    fontSize: PropTypes.number
};

const TextButton = ({
    onPress,
    disabled,
    containerStyle,
    btnStyle,
    textStyle,
    text,
    activeOpacity
  }) => (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
        <View style={btnStyle}>
            <Text style={textStyle}>{text}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    btnStyle: {

    },
    textStyle: {

    },
  });

TextButton.propTypes = propTypes;

TextButton.defaultProps = {
  onPress() {},
  disabled: false,
  activeOpacity: 0.8,
  color: 'white',
  fontSize: 12
};

export default TextButton;