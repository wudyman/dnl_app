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
    btnStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    text: PropTypes.string,
    activeOpacity: PropTypes.number
};

const TextButton = ({
    onPress,
    disabled,
    btnStyle,
    textStyle,
    text,
    activeOpacity
  }) => (
    <TouchableOpacity
      style={btnStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
        <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
);

TextButton.propTypes = propTypes;

TextButton.defaultProps = {
  onPress() {},
  disabled: false,
  activeOpacity: 0.8,
};

export default TextButton;