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

import { NavigationActions } from 'react-navigation'
import type { NavigationParams, NavigationRoute } from 'react-navigation'

let navigator: Object

const setTopLevelNavigator = (navigatorRef: Object) => {
  navigator = navigatorRef
}

const navigate = (routeName: string, params?: NavigationParams) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

const navigateDeep = (
  actions: { routeName: string, params?: NavigationParams }[]
) => {
  navigator.dispatch(
    actions.reduceRight(
      (previousAction, action): any =>
        NavigationActions.navigate({
          routeName: action.routeName,
          params: action.params,
          actions: previousAction
        }),
      undefined
    )
  )
}

const getCurrentRoute = (): NavigationRoute | null => {
  if (!navigator || !navigator.state.nav) {
    return null
  }

  return navigator.state.nav.routes[navigator.state.nav.index] || null
}

export default {
  setTopLevelNavigator,
  navigate,
  navigateDeep,
  getCurrentRoute
}
