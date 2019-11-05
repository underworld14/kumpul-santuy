import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  View,
  Fab,
  Item,
  Input,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {MaterialIndicator} from 'react-native-indicators';
import * as actionRooms from '../redux/_actions/rooms';

import * as color from '../assets/color';

class Rooms extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      idRoom: '',
      input: '',
      modalVisible: false,
      eModalVisible: false,
    };
  }

  async componentDidMount() {
    await this.getIdentity();
    await this.getRooms();
  }

  getIdentity = async () => {
    await AsyncStorage.getItem('token').then(key => {
      this.setState({
        token: key,
      });
    });
  };

  getRooms = async () => {
    await this.props.handleGetRooms((token = this.state.token));
  };

  refreshData = async () => {
    await this.getRooms();
  };

  postRooms = async () => {
    this.toggleModal();
    await this.props.handlePostRooms(
      (token = this.state.token),
      (input = this.state.input),
    );
    await this.getRooms();
  };

  putRooms = async () => {
    this.eToggleModal();
    await this.props.handlePutRooms(
      (token = this.state.token),
      (idRoom = this.state.idRoom),
      (room = this.state.input),
    );
    await this.getRooms();
  };

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  eToggleModal = (idRoom, room) => {
    this.setState({
      idRoom,
      input: room,
    });
    this.setState({eModalVisible: !this.state.eModalVisible});
  };

  render() {
    if (this.props.rooms.isLoading) {
      return (
        <MaterialIndicator
          color={color.orange}
          animating={true}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 80,
          }}
        />
      );
    }

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Icon
              type="FontAwesome"
              name="building"
              size={20}
              style={{color: 'white'}}
            />
          </Left>
          <Body>
            <Title>Rooms List</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => this.refreshData()}>
              <Icon
                type="FontAwesome"
                name="refresh"
                size={20}
                style={{color: 'white'}}
              />
            </TouchableOpacity>
          </Right>
        </Header>

        <FlatList
          data={this.props.rooms.data}
          numColumns={3}
          renderItem={({item}) => (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() =>
                  this.eToggleModal((idRoom = item.id), (room = item.room))
                }>
                <View style={styles.room}>
                  <Text style={styles.roomtxt}> {item.room} </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />

        <View>
          <Fab
            containerStyle={{}}
            style={{backgroundColor: color.orange}}
            position="bottomRight"
            onPress={() => this.toggleModal()}>
            <Icon type="FontAwesome5" name="plus" />
          </Fab>
        </View>

        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.toggleModal()}>
          <View style={styles.modalcon}>
            <Text style={styles.modaltxt}> ADD ROOM DATA </Text>
            <Item>
              <Icon type="FontAwesome5" name="bed" />
              <Input
                placeholder="Insert room name here !"
                onChangeText={room => this.setState({input: room})}
              />
            </Item>
            <Button
              info
              style={styles.btnmodal}
              onPress={() => this.postRooms()}>
              <Text> INSERT </Text>
            </Button>
            <Button
              warning
              style={styles.btnmodal}
              onPress={() => this.toggleModal()}>
              <Text> CANCEL </Text>
            </Button>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.eModalVisible}
          onBackdropPress={() => this.eToggleModal()}>
          <View style={styles.modalcon}>
            <Text style={styles.modaltxt}> EDIT ROOMS </Text>
            <Item>
              <Icon type="FontAwesome5" name="bed" />
              <Input
                value={this.state.input}
                onChangeText={input => this.setState({input})}
              />
            </Item>
            <Button
              info
              style={styles.btnmodal}
              onPress={() => this.putRooms()}>
              <Text> INSERT </Text>
            </Button>
            <Button
              warning
              style={styles.btnmodal}
              onPress={() => this.eToggleModal()}>
              <Text> CANCEL </Text>
            </Button>
          </View>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetRooms: token => dispatch(actionRooms.handleGetRooms(token)),
    handlePostRooms: (token, input) =>
      dispatch(actionRooms.handlePostRooms(token, input)),
    handlePutRooms: (token, idRoom, room) =>
      dispatch(actionRooms.handlePutRooms(token, idRoom, room)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rooms);

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: color.orange,
  },
  room: {
    margin: 13,
    padding: 10,
    borderRadius: 10,
    borderColor: color.orange,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 70,
  },
  roomtxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
  },
  icon: {
    color: 'white',
  },
  modalcon: {
    padding: 20,
    backgroundColor: 'white',
  },
  btnmodal: {
    marginTop: 15,
    justifyContent: 'center',
  },
  modaltxt: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});
