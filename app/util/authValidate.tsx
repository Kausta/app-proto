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
import { ObservableMap } from 'mobx'

// Same validation in client and server
const validators = {
  notEmpty: (field: string | undefined | null): field is string => {
    return !(!field || field.trim().length === 0)
  },
  minLength: (field: string, len: number) => {
    return field.length >= len
  },
  maxLength: (field: string, len: number) => {
    return field.length <= len
  },
  email: (email: string) => {
    const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
    return filter.test(email)
  },
  phoneNumber: (phoneNumber: string) => {
    const filter = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    return filter.test(phoneNumber)
  },
}
const validateLogin = (changedField: string, formItems: ObservableMap<string, string | undefined>) => {
  let value = formItems.get(changedField)
  if (!value || value === '') {
    return undefined
  }
  value = value.trim()
  if (value === '') {
    return false
  }
  switch (changedField) {
    case 'email':
      {
        if (!validators.email(value)) {
          return false
        }
      }
      break
    case 'password':
      {
        if (!validators.minLength(value, 6)) {
          return false
        }
      }
      break
    default:
      return false
  }
  return true
}
const validateRegister = (changedField: string, formItems: ObservableMap<string, string | undefined>) => {
  let value = formItems.get(changedField)
  if (!value || value === '') {
    return undefined
  }
  value = value.trim()
  if (value === '') {
    return false
  }
  switch (changedField) {
    case 'username':
      {
        if (!validators.minLength(value, 6)) {
          return false
        }
        if (!validators.maxLength(value, 20)) {
          return false
        }
      }
      break
    case 'password':
      {
        if (!validators.minLength(value, 6)) {
          return false
        }
      }
      break
    case 'passwordRepeat':
      {
        const password = formItems.get('password')
        if (!password || value !== password.trim()) {
          return false
        }
      }
      break
    case 'email':
      {
        if (!validators.email(value)) {
          return false
        }
      }
      break
    case 'phoneNumber':
      {
        if (!validators.phoneNumber(value)) {
          return false
        }
      }
      break
    default:
      return false
  }
  return true
}
export { validateLogin, validateRegister }

const formValidate: {
  [key: string]: (f: string | undefined) => boolean | undefined
} = {
  email: (email: string | undefined) => validators.notEmpty(email) && validators.email(email),
  password: (password: string | undefined) => validators.notEmpty(password) && validators.minLength(password, 6),
}
export { formValidate }
