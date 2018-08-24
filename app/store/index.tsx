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
import { inject as injectBase, observer, IReactComponent } from 'mobx-react/native'
import { MobX } from '@kausta/react-native-commons'

import { store as AuthStore } from 'modules/auth'
import { store as HomeStore } from 'modules/home'

const stores: MobX.StoresType = {
  auth: AuthStore,
  home: HomeStore,
}
const defaultStoreProps = {
  auth: null,
  home: null,
}

export function decorateStore<T extends IReactComponent>(Target: T) {
  const TargetFinal = injectBase((s: StoreProps) => ({
    auth: s.auth,
    home: s.home,
  }))(observer(Target))
  autobind(TargetFinal)
  return TargetFinal
}

export { AuthStore, HomeStore, stores, defaultStoreProps }

export interface StoreProps {
  auth: AuthStore
  home: HomeStore
}
