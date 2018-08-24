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

import { AsyncStorage } from 'react-native'
import io from 'socket.io-client'
import feathers, { Application } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

const API_URL = 'https://app-proto.kausta.me/'

export interface ApplicationType extends Application<Object> {
  io: SocketIOClient.Manager
}

class FeathersApi {
  appInstance: ApplicationType | null = null

  init(): void {
    const options = {
      transports: ['websocket'],
      pingTimeout: 3000,
      pingInterval: 5000,
    }
    const socket = io(API_URL, options)

    this.appInstance = feathers()
      .configure(socketio(socket))
      .configure(
        authentication({
          storage: AsyncStorage,
        })
      ) as ApplicationType
  }

  get app(): ApplicationType {
    return this.appInstance as ApplicationType
  }
}

const instance = new FeathersApi()
export { instance as api }
