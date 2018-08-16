/**
 * app-proto
 * __________________
 *
 *
 *  Licensed under a Proprietary License shared with this Work
 *  under the name LICENSE (the 'License').
 *  You MAY NOT USE this file except in compliance with the License.
 *  'The Authors' are defined in the License.
 *
 *  Copyright [2018] The Authors
 *  All Rights Reserved.
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *  Under all conditions, except rights given from an Explicit Grant defined in the License,
 *  all information contained herein is, and remains the property of the Authors.
 *
 *  @flow
 *  @format
 */

import React from 'react'
import { StyleSheet } from 'react-native'
import { Input as NBInput } from 'native-base'

import { fontFamily } from 'style'

type Props = {
  placeholder: string,
  type: string,
  onChangeText: (string, string) => void,
  style?: any
}
export default class Input extends React.Component<Props> {
  static defaultProps = {
    style: {}
  }

  constructor () {
    super()
    this.state = {}
  }

  get input () {
    return this.refs.input._root
  }

  onValueChange = value => {
    const { type, onChangeText } = this.props
    onChangeText(type, value)
  }

  render () {
    // OnChangeText and Type are important here so that they are not passed to NBInput
    const { placeholder, type, onChangeText, style, ...props } = this.props
    return (
      <NBInput
        {...props}
        ref='input'
        autoCapitalize='none'
        autoCorrect={false}
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor='#a0a0a0'
        underlineColorAndroid='transparent'
        onChangeText={this.onValueChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    fontSize: 16,
    fontFamily: fontFamily.light
  }
})
