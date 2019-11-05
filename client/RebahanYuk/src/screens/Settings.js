import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {Container, Text, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import * as color from '../assets/color';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    };
  }

  async componentDidMount() {
    await this.getIdentity();
  }

  getIdentity = async () => {
    await AsyncStorage.getItem('token').then(key => {
      this.setState({
        token: key,
      });
    });
  };

  async logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    this.props.navigation.navigate('loginTabs');
  }

  getCustomers = () => {
    this.props.handleGetCustomers((token = this.state.token));
  };

  render() {
    return (
      <Container>
        <View style={styles.rectStack}>
          <View style={styles.rect} />
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXNM88jFoywO7jEY_mM_dMtHLeCDpAr5O6qRI5bWbxgYX9sLC-',
            }}
            style={styles.ellipse3}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.text2}>Kumpul & Santuy Coworking Space</Text>
          <Text style={styles.text3}>Admin Users</Text>
        </View>
        <Button
          danger
          small
          onPress={() => this.logout()}
          style={styles.btnlog}>
          <Text> Log Out </Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

const styles = StyleSheet.create({
  btnlog: {
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 230,
    borderRadius: 15,
  },
  rectStack: {
    width: 454,
    height: 305,
  },
  rect: {
    top: 0,
    left: 0,
    width: 800,
    height: 254,
    backgroundColor: color.orange,
    position: 'absolute',
  },
  ellipse3: {
    top: 158,
    width: 147,
    height: 147,
    position: 'absolute',
    left: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
  },
  text2: {
    color: 'rgba(0,0,0,1)',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  text3: {
    color: 'rgba(0,0,0,1)',
    fontSize: 16,
    fontFamily: 'roboto-300',
    marginTop: 6,
    alignSelf: 'center',
  },
  button: {
    width: 195,
    height: 33,
    backgroundColor: 'rgba(222,34,34,1)',
    marginTop: 51,
    marginLeft: 82,
  },
  text: {
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    fontFamily: 'roboto-500',
    marginTop: 8,
    marginLeft: 72,
  },
});
