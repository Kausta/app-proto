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

import { api } from 'api/Feathers'
import { autobind } from 'core-decorators'
import { observable, action } from 'mobx'
import { AuthStore } from 'store'

const PLACEHOLDER = 'https://spaceholder.cc/600x600'

@autobind
export default class HomeStore {
  @observable authStore: any | AuthStore = null
  @observable messages = []
  @observable skip = 0
  @observable hasMoreMessages = false

  @action
  init (authStore) {
    this.authStore = authStore

    api.app.service('messages').on('created', this.onMessageCreated)

    api.app.service('messages').on('removed', removedMessage => {
      this.deleteMessage(removedMessage)
    })
  }

  @action
  logout () {
    this.userId = null
    this.messages = []
    this.skip = 0
    this.hasMoreMessages = false
  }

  loadMessages (loadNextPage) {
    let $skip = this.skip

    const query = {
      query: {
        $sort: { createdAt: -1 },
        $skip
      }
    }

    return api.app
      .service('messages')
      .find(query)
      .then(response => {
        const messages = []
        const skip = response.skip + response.limit

        for (let message of response.data) {
          messages.push(this.formatMessage(message))
        }

        console.log(
          'loaded messages from server',
          JSON.stringify(messages, null, 2)
        )
        this.setMessages(
          loadNextPage ? this.messages.concat(messages) : messages
        )
        this.setSkip(skip)
        this.setHasMoreMessages(response.skip + response.limit < response.total)
      })
      .catch(error => {
        console.log(error)
      })
  }

  formatMessage (message) {
    return {
      _id: message._id,
      text: message.text,
      position:
        message.user._id.toString() === this.authStore.user._id.toString()
          ? 'left'
          : 'right',
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.user._id ? message.user._id : '',
        name: message.user.email ? message.user.email : message.name,
        avatar: message.user.avatar ? message.user.avatar : PLACEHOLDER
      }
    }
  }

  deleteMessage (messageToRemove) {
    let messages = this.messages
    let idToRemove = messageToRemove.id
      ? messageToRemove.id
      : messageToRemove._id

    messages = messages.filter(function (message) {
      return message.id !== idToRemove
    })
    this.setMessages(messages)
  }

  sendMessage (messages = [], rowID = null) {
    api.app
      .service('messages')
      .create({ text: messages[0].text })
      .then(result => {
        console.log('message created!')
      })
      .catch(error => {
        console.log('ERROR creating message')
        console.log(error)
      })
  }

  @action
  onMessageCreated (createdMessage) {
    this.messages.unshift(this.formatMessage(createdMessage))
  }

  @action
  setMessages (messages: any[]) {
    this.messages = messages
  }

  @action
  setSkip (skip: number) {
    this.skip = skip
  }

  @action
  setHasMoreMessages (moreMessages: boolean) {
    this.hasMoreMessages = moreMessages
  }
}
