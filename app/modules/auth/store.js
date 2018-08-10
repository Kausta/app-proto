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

import { autobind } from 'core-decorators'
import { observable, action } from 'mobx'

// Temporary sleep for splash + init auth
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

@autobind
export default class AuthStore {
  @observable name = 'proto-app'
  @observable isAuthenticating = true
  @observable isAuthenticated = false

  async initAuth () {
    // Simulate start
    await sleep(1000)

    this.initAuthFinish(false)
  }

  @action initAuthFinish (isAuthenticated: boolean) {
    this.isAuthenticating = false
    this.isAuthenticated = isAuthenticated
  }
}
