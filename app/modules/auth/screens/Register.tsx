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

import { observable, action, computed } from 'mobx'
import { decorateStore, defaultStoreProps, StoreProps } from 'store'
import { NavigationProps } from 'navigation/Typed'
import { StyleSheet, Alert, View, TouchableOpacity } from 'react-native'
import { Paper } from 'react-native-paper'
import { Button, Form, Text } from 'native-base'
import { Container, Content, IconInput, BoldText, LightText } from '@kausta/react-native-commons'
import { r } from 'style'

import * as validate from 'util/authValidate'

interface Props {}

@decorateStore
export default class Register extends React.Component<Props & StoreProps & NavigationProps> {
  static defaultProps = {
    ...defaultStoreProps,
  }

  readonly passwordRef: React.RefObject<IconInput> = React.createRef()

  // TODO: Create a form class and abstract these away
  @observable
  formItems: {
    [key: string]: string | undefined
  } = {
    email: undefined,
    password: undefined,
  }

  @observable
  formItemsValidity: {
    [key: string]: boolean | undefined
  } = {
    email: undefined,
    password: undefined,
  }

  @computed
  get canSubmit() {
    return !!this.formItemsValidity.email && !!this.formItemsValidity.password
  }

  @action
  onChangeText = (key: string, value: string | undefined) => {
    this.formItems[key] = value
    this.formItemsValidity[key] = validate.formValidate[key](value)
  }

  login = () => {
    this.props.navigation.navigate('LogIn')
  }

  signUp = () => {
    if (!this.canSubmit) {
      return
    }
    const { email, password } = this.formItems
    this.props.auth
      // @ts-ignore
      .createAccount(email, password)
      .then(() => {
        this.props.navigation.navigate('Home')
      })
      .catch((error: any) => {
        Alert.alert('Error occurred when registering', error.message)
      })
  }

  render() {
    return (
      <Container>
        <Content style={styles.container}>
          <BoldText style={styles.welcome}>Welcome to {this.props.auth.name}!</BoldText>
          <Paper style={styles.formPaper}>
            <Form>
              <IconInput
                iconName="mail"
                placeholder="E-Mail"
                type="email"
                onEdit={this.onChangeText}
                onSubmitEditing={() => {
                  const password = this.passwordRef.current
                  if (!password) {
                    return
                  }
                  password.input.focus()
                }}
                value={this.formItems.email}
                keyboardType="email-address"
                textContentType="emailAddress"
                isSuccessful={this.formItemsValidity.email}
              />
              <IconInput
                iconName="key"
                isLast
                placeholder="Password"
                type="password"
                ref={this.passwordRef}
                onEdit={this.onChangeText}
                value={this.formItems.password}
                secureTextEntry
                textContentType="password"
                isSuccessful={this.formItemsValidity.password}
              />
            </Form>
            <View style={styles.logInButtonContainer}>
              <Button block primary onPress={this.signUp} disabled={!this.canSubmit}>
                <Text>Sign Up</Text>
              </Button>
            </View>
          </Paper>
          <View style={styles.signUpTextContainer}>
            <TouchableOpacity onPress={this.login}>
              <LightText>
                Already have an account?
                <LightText style={styles.signUp}> Sign In</LightText>
              </LightText>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
    color: '#000',
  },
  formPaper: {
    marginTop: 10,
    padding: 10,
    width: r.wp('90%'),
    elevation: 6,
    borderRadius: 10,
  },
  logInButtonContainer: {
    marginTop: 10,
    padding: 10,
  },
  signUpTextContainer: {
    marginTop: 10,
  },
  signUp: {
    color: '#000490',
  },
})
