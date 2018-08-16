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
import { Icon, Item } from 'native-base'
import { Input } from 'components'

type Props = {
  iconName: string,
  placeholder: string,
  type: string,
  onChangeText: (string, string) => void,
  isLast?: boolean,
  inputStyle?: any,
  isSuccessful?: ?boolean // true, false or null
}
export default class IconInput extends React.Component<Props> {
  static defaultProps = {
    isLast: false,
    isSuccessful: null,
    inputStyle: {}
  }

  get input () {
    return this.refs.input.input
  }

  render () {
    const {
      iconName,
      isLast,
      isSuccessful,
      placeholder,
      type,
      onChangeText,
      inputStyle,
      ...props
    } = this.props
    const returnKeyType = isLast ? 'done' : 'next'
    const success = isSuccessful != null && isSuccessful
    const error = isSuccessful != null && !isSuccessful
    return (
      <Item style={styles.item} success={success} error={error}>
        <Icon name={iconName} />
        <Input
          {...props}
          ref='input'
          returnKeyType={returnKeyType}
          blurOnSubmit={isLast}
          placeholder={placeholder}
          type={type}
          onChangeText={onChangeText}
          style={inputStyle}
        />
      </Item>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    marginLeft: 4,
    marginRight: 4
  }
})
