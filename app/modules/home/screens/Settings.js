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

import React, { Component } from 'react'
import { StyleSheet, Image } from 'react-native'
import { decorateStore, defaultStoreProps } from 'store'
import type { StoreProps } from 'store'
import {
  Button,
  Text,
  Header,
  Left,
  Right,
  Icon,
  Card,
  Body,
  CardItem,
  Title
} from 'native-base'
import { Container, Content } from 'components'

type Props = {}
@decorateStore
export default class Settings extends Component<Props & StoreProps> {
  static defaultProps = {
    ...defaultStoreProps
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  logout = () => {
    const { auth, home } = this.props
    auth.promptForLogout(() => home.logout())
  }

  render () {
    const { auth: { user } } = this.props
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.container}>
          <Card>
            <CardItem>
              <Left>
                <Image
                  style={styles.thumbnail}
                  source={{
                    uri: user.avatar
                  }}
                  resizeMode='contain'
                />
                <Body>
                  <Text>{user.email}</Text>
                  <Text note>{user._id}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Button style={styles.button} full light onPress={this.logout}>
                <Text>Log Out</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  button: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 30
  }
})
