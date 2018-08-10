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
import { Spinner } from 'native-base'
import { Container, Content } from 'components'

type Props = {}
export default class Splash extends React.Component<Props> {
  render () {
    return (
      <Container>
        <Content style={styles.contentStyle}>
          <Spinner />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  contentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
