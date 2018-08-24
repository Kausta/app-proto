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
import { StyleSheet, Dimensions, Platform } from 'react-native'
import { NavigationProps } from 'navigation/Typed'
import { decorateStore, defaultStoreProps, StoreProps } from 'store'
import { Button, Header, Left, Right, Icon, Body, Title } from 'native-base'
import { GiftedChat } from 'react-native-gifted-chat'
import { Container, Content } from '@kausta/react-native-commons'
import { computed } from 'mobx'

const maxHeight = Platform.OS === 'ios' ? Dimensions.get('window').height - 65 : Dimensions.get('window').height - 85

interface Props {}

@decorateStore
export default class MainPage extends Component<Props & StoreProps & NavigationProps> {
  static defaultProps = {
    ...defaultStoreProps,
  }

  @computed
  get userId(): string {
    const { user } = this.props.auth
    if (!user) {
      return ''
    }
    return user._id
  }

  componentDidMount() {
    this.props.home
      .loadMessages()
      // tslint:disable-next-line no-empty
      .then(() => {})
      // tslint:disable-next-line no-empty
      .catch(() => {})
  }

  goToSettings = () => {
    this.props.navigation.navigate('Settings')
  }

  onSend = (messages = [], rowId = null) => {
    this.props.home.sendMessage(messages, rowId)
  }

  onLoadEarlier = () => {
    this.props.home
      .loadMessages(true)
      // tslint:disable-next-line no-empty
      .then(() => {})
      // tslint:disable-next-line no-empty
      .catch(() => {})
  }

  render() {
    const { home } = this.props
    const messages = home.messages.slice()

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>App Proto</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.goToSettings}>
              <Icon name="settings" />
            </Button>
          </Right>
        </Header>
        <Content style={styles.container}>
          <GiftedChat
            onSend={this.onSend}
            messages={messages}
            user={{ _id: this.userId }}
            loadEarlier={home.hasMoreMessages}
            onLoadEarlier={this.onLoadEarlier}
            keyboardDismissMode="on-drag"
            autoFocus={false}
            maxHeight={maxHeight}
          />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  button: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 30,
  },
})
