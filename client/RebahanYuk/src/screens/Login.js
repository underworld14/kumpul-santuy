import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {api_url, axios} from '../api-url';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Button, Text, Item, Input, Form, Label, Icon} from 'native-base';

import * as color from '../assets/color';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      icon: 'eye-off',
      username: '',
      password: null,
      pass: true,
      isDisable: true,
      token: '',
      id: '',
    };
  }

  userLogin = () => {
    axios({
      method: 'POST',
      url: `${api_url}/login`,
      data: {
        email: this.state.username,
        password: this.state.password,
      },
    }).then(response => {
      this.setState({
        id: response.data.id,
        token: response.data.token,
      });

      const login = response.data.login;

      if (login !== false) {
        AsyncStorage.setItem('token', this.state.token);
        AsyncStorage.setItem('id', JSON.stringify(this.state.id));
        this.props.navigation.navigate('CheckIn');
      } else {
        alert('Login Failed !!');
        console.log('Login Failed');
      }
    });
  };

  eyeIcon = () => {
    this.setState(before => ({
      icon: before.icon === 'eye' ? 'eye-off' : 'eye',
      pass: !before.pass,
    }));
  };

  userValidation = username => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(username) == true && this.state.password != null) {
      this.setState({
        username: username,
        isDisable: false,
      });
    } else {
      this.setState({
        username: username,
        isDisable: true,
      });
    }
    this.setState({
      username,
    });
  };

  passValidation = password => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if ((password != null) == true && reg.test(this.state.username) == true) {
      this.setState({
        password: password,
        isDisable: false,
      });
    } else {
      this.setState({
        password: password,
        isDisable: true,
      });
    }
    this.setState({
      password,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require('../assets/img/kumpulWhite2.png')}
            style={styles.profImg}
          />
        </View>

        <Form style={styles.formlogin}>
          <Item floatingLabel>
            <Label style={styles.textLabel}> E-Mail </Label>
            <Input
              onChangeText={username => this.userValidation(username)}
              style={styles.input}
            />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.textLabel}> Password </Label>
            <Input
              secureTextEntry={this.state.pass}
              onChangeText={password => this.passValidation(password)}
              style={styles.input}
            />
            <Icon name={this.state.icon} onPress={() => this.eyeIcon()} />
          </Item>

          <Button
            success
            disabled={this.state.isDisable}
            rounded
            block
            style={styles.btnsign}
            onPress={() => this.userLogin()}>
            <Text style={{justifyContent: 'center'}}> Login Here </Text>
          </Button>
        </Form>

        <Text style={styles.copyright}>
          Kumpul&Santuy Ver 1.0 Copyright By Yusril Izza
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.orange,
  },
  profImg: {
    marginTop: 50,
    width: 350,
    height: 200,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  formlogin: {
    marginTop: 0,
    marginHorizontal: 25,
  },
  input: {
    color: 'white',
    fontWeight: 'bold',
  },
  btnsign: {
    marginTop: 35,
    marginLeft: 8,
    width: 350,
  },
  copyright: {
    color: 'white',
    fontSize: 12,
    marginTop: 200,
    alignSelf: 'center',
  },
});
