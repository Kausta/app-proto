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

import { configure, spy } from 'mobx'
import { stores } from 'store'

const initMobx = (logEverything?: boolean = false) => {
  // Enforce actions for better manageability
  configure({
    enforceActions: true
  })

  // Register development logger
  spy(event => {
    if (event.type === 'action') {
      console.log(`${event.name} with args: ${event.arguments}`)
    } else if (logEverything) {
      console.log(event.toString())
    }
  })

  // Create store objects from classes
  // We want to leave access to stores for typing purposes
  const storeInstances = {}
  for (const key in stores) {
    const Store = stores[key]
    storeInstances[key] = new Store()
  }
  return storeInstances
}
export default initMobx
