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
import RootNavigator from 'navigation'
import { autorun } from 'mobx'
import { decorateStore, defaultStoreProps, StoreProps } from 'store'
import { NavigationService } from '@kausta/react-native-commons'

interface Props {}

@decorateStore
export default class App extends React.Component<Props & StoreProps> {
  static defaultProps = {
    ...defaultStoreProps,
  }

  componentDidMount() {
    // Set connecting and authentication autorun
    autorun(() => {
      // We track connecting and authenticated info
      const { isConnecting, isAuthenticated, isAuthenticating } = this.props.auth
      if (isConnecting || isAuthenticating) {
        // If is connecting go back to splash
        NavigationService.navigate('Splash')
      } else {
        // If not connected, go to auth or home
        // TODO: Remember last logged in page and goto that
        NavigationService.navigate(isAuthenticated ? 'Home' : 'Auth')
      }
    })

    // Initialize auth
    this.props.auth.init()
    this.props.home.init(this.props.auth)
  }

  registerNavService = (navigator: any) => {
    // Register top level navigator for navigation in different classes including this
    NavigationService.setTopLevelNavigator(navigator)
  }

  render() {
    return <RootNavigator ref={this.registerNavService} />
  }
}
