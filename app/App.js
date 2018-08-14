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
import { decorateStore, defaultStoreProps } from 'store'
import type { StoreProps } from 'store'
import NavigationService from 'navigation/NavigationService'

type Props = {}
@decorateStore
export default class App extends React.Component<Props & StoreProps> {
  static defaultProps = {
    ...defaultStoreProps
  }

  componentDidMount () {
    // Initialize auth and then navigate to proper page
    this.props.auth.initAuth().then(() => {
      NavigationService.navigate(
        this.props.auth.isAuthenticated ? 'Home' : 'Auth'
      )
    })
  }

  registerNavService = (navigator: any) => {
    // Register top level navigator for navigation in different classes including this
    NavigationService.setTopLevelNavigator(navigator)
  }

  render () {
    return <RootNavigator ref={this.registerNavService} />
  }
}
