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
import { AppLoading } from 'expo'
import { Provider } from 'mobx-react/native'

import initMobx from 'util/initMobx'
import { cacheFonts, cacheImages } from 'util/cache'
import AppWithoutStore from './app/App'
import stores from 'store'

type Props = {}
type State = {
  isReady: boolean
}
export default class App extends React.Component<Props, State> {
  constructor () {
    super()
    initMobx()
    this.state = {
      isReady: false
    }
  }

  /**
   * Caches images and fonts
   */
  static async _loadAssetsAsync () {
    const imageAssets = cacheImages([
      // require('assets/logo.png'),
    ])
    const fontAssets = cacheFonts([
      {Roboto: require('native-base/Fonts/Roboto.ttf')},
      {Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')},
      {Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')},
      {FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf')}
    ])

    await Promise.all([...imageAssets, ...fontAssets])
  }

  _setReady = () => {
    this.setState({isReady: true})
  }

  render () {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={App._loadAssetsAsync}
          onFinish={this._setReady}
          onError={console.warn}
        />
      )
    }
    return (
      <Provider {...stores}>
        <AppWithoutStore />
      </Provider>
    )
  }
}
