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

import { Alert } from 'react-native'
import { autobind } from 'core-decorators'
import { observable, action } from 'mobx'
import { api } from 'api/Feathers'

@autobind
export default class AuthStore {
  @observable name = 'App Proto'

  @observable isAuthenticating = true
  @observable isAuthenticated = false
  @observable isConnecting = false
  @observable user = null

  init () {
    api.init()
    this.connect()

    const accessToken = api.app.get('accessToken')
    if (accessToken) {
      this.setAuthenticated(accessToken !== null)
    }
  }

  connect () {
    this.setConnecting(true)

    const { io } = api.app

    io.on('connect', () => {
      this.setConnecting(false)
      this.authenticate()
        .then(() => {
          console.log('Successfully authenticated after reconnecting')
          this.setAuthenticated(true)
        })
        .catch(() => {
          console.log('Cannot authenticate after reconnecting')
          this.setAuthenticated(false)
        })
    })
    io.on('reconnect', () => {
      console.log('Reconnected!')
      this.setConnecting(false)
    })

    io.on('disconnect', () => {
      this.setConnecting(true)
      console.log('Disconnected!')
    })
  }

  createAccount (email, password) {
    return api.app
      .service('users')
      .create({
        email,
        password
      })
      .then(result => {
        return this.login(email, password)
      })
  }

  login (email, password) {
    return this.authenticate({
      strategy: 'local',
      email,
      password
    })
  }

  authenticate (options?: any) {
    options = options || undefined
    this.setAuthenticating(true)
    return this._authenticate(options)
      .then(user => {
        console.log('Authenticated successfully: ', user._id, user.email)
        this.setUser(user)
        this.setAuthenticated(true)
        return Promise.resolve(user)
      })
      .catch(error => {
        console.log('Authentication failed: ', error.message)
        console.log(error)
        this.setAuthenticated(false)
        return Promise.reject(error)
      })
  }

  _authenticate (payload: any) {
    return api.app
      .authenticate(payload)
      .then(response => {
        return api.app.passport.verifyJWT(response.accessToken)
      })
      .then(payload => {
        return api.app.service('users').get(payload.userId)
      })
      .catch(e => Promise.reject(e))
  }

  @action
  setConnecting (isConnecting: boolean) {
    this.isConnecting = isConnecting
  }

  @action
  setAuthenticated (isAuthenticated: boolean) {
    this.isAuthenticating = false
    this.isAuthenticated = isAuthenticated
  }

  @action
  setAuthenticating (isAuthenticating: boolean) {
    this.isAuthenticating = isAuthenticating
  }

  @action
  setUser (user: ?Object) {
    // TODO: Actual username
    user.name = user.email
    this.user = user
  }

  promptForLogout (callback: () => void) {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => {
          callback()
          this.logout()
        },
        style: 'destructive'
      }
    ])
  }

  @action
  logout () {
    api.app.logout()
    this.user = null
    this.isAuthenticated = false
    this.isAuthenticating = false
  }
}
