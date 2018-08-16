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
import { Text } from 'react-native'
import { fontFamily } from 'style'

type Props = {
  style?: any
}
const defaultProps = {
  style: {}
}

const RegularText = ({ style, ...rest }: Props) => (
  <Text {...rest} style={[style, { fontFamily: fontFamily.regular }]} />
)
const LightText = ({ style, ...rest }: Props) => (
  <Text {...rest} style={[style, { fontFamily: fontFamily.light }]} />
)
const BoldText = ({ style, ...rest }: Props) => (
  <Text {...rest} style={[style, { fontFamily: fontFamily.bold }]} />
)
RegularText.defaultProps = defaultProps
LightText.defaultProps = defaultProps
BoldText.defaultProps = defaultProps

export { RegularText, LightText, BoldText }
