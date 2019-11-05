import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, FlatList, Picker} from 'react-native';
import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Body,
  Icon,
  Text,
  View,
  Item,
  Input,
  Button,
  Form,
  Label,
  Toast,
} from 'native-base';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {MaterialIndicator} from 'react-native-indicators';
import CountDown from 'react-native-countdown-component';
import * as actionsCheckIn from '../redux/_actions/checkin';
import * as actionsCustomers from '../redux/_actions/customers';
import * as color from '../assets/color';

class CheckIn extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      CheckInVisible: false,
      CheckOutVisible: false,
      room: '',
      customer: '',
      orderId: '',
      idRoom: '',
      idCustomer: '',
      duration: '',
    };
  }

  async componentDidMount() {
    await this.getIdentity();
    await this.getCheckIn();
    await this.getCustomers();
  }

  getIdentity = async () => {
    await AsyncStorage.getItem('token').then(key => {
      this.setState({
        token: key,
      });
    });
  };

  getCheckIn = () => {
    this.props.handleGetCheckIn((token = this.state.token));
  };

  refreshData = async () => {
    await this.getCheckIn();
    await this.getCustomers();
  };

  toggleCheckInModal(idRoom, room) {
    this.setState({idRoom, room});
    this.setState({CheckInVisible: !this.state.CheckInVisible});
  }

  toggleCancelCheckIn() {
    this.setState({CheckInVisible: !this.state.CheckInVisible});
  }

  toggleCheckOutModal(room, customer, duration, orderId) {
    this.setState({
      room,
      customer,
      duration,
      orderId,
    });
    this.setState({CheckOutVisible: !this.state.CheckOutVisible});
  }

  toogleCancelCheckOut() {
    this.setState({CheckOutVisible: !this.state.CheckOutVisible});
  }

  getCustomers = () => {
    this.props.handleGetCustomers((token = this.state.token));
  };

  RoomActive = item => {
    const idRoom = item.id;
    const room = item.room;
    return (
      <TouchableOpacity onPress={() => this.toggleCheckInModal(idRoom, room)}>
        <View style={styles.room}>
          <Text style={styles.roomtxt}> {item.room} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  RoomDisable = item => {
    const room = item.room;
    const customer = item.customer.name;
    const duration = item.order.duration;
    const orderId = item.order.id;
    return (
      <TouchableOpacity
        onPress={() =>
          this.toggleCheckOutModal(room, customer, duration, orderId)
        }>
        <View style={styles.roomDisable}>
          <Text style={styles.roomtxtDisable}> {item.room} </Text>
          {this.CountdownView(duration, orderId, room)}
        </View>
      </TouchableOpacity>
    );
  };

  CountdownView = (duration, orderId, room) => {
    return (
      <CountDown
        until={duration * 60}
        size={10}
        onFinish={() => this.checkOutPutTimer(orderId, room)}
        digitStyle={{backgroundColor: '#FFF', width: 20, height: 10}}
        digitTxtStyle={{color: '#e74c3c'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
      />
    );
  };

  checkInPost = async () => {
    const token = this.state.token;
    const idRoom = this.state.idRoom;
    const idCustomer = this.state.idCustomer;
    const duration = this.state.duration;

    this.toggleCancelCheckIn();
    await this.props.handlePostCheckIn(token, idRoom, idCustomer, duration);
    await this.getCheckIn();
  };

  checkOutPut = async () => {
    const token = this.state.token;
    const idOrder = this.state.orderId;

    await this.props.handlePutCheckOut(token, idOrder);
    this.toogleCancelCheckOut();
    await this.getCheckIn();
  };

  checkOutPutTimer = async (orderId, room) => {
    const token = this.state.token;
    alert(`Room ${room} booking time out !! `);
    await this.props.handlePutCheckOut(token, orderId);
    await this.getCheckIn();
  };

  render() {
    if (this.props.customers.isLoading) {
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

    // console.log('Before ', this.state.idCustomer);

    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Icon
              type="FontAwesome"
              name="check-circle"
              size={20}
              style={{color: 'white'}}
            />
          </Left>
          <Body>
            <Title>CheckIn List</Title>
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
          data={this.props.checkin.data}
          numColumns={3}
          renderItem={({item}) => (
            <View key={item.id}>
              {item.order && item.order.is_booked
                ? this.RoomDisable(item)
                : this.RoomActive(item)}
            </View>
          )}
          keyExtractor={item => item.id}
        />

        <Modal
          isVisible={this.state.CheckInVisible}
          onBackdropPress={() => this.toggleCheckInModal()}>
          <View style={styles.modalcon}>
            <Text style={styles.modaltxt}> CheckIn Data </Text>
            <Form>
              <Label style={styles.modalformlabel}>Room Name</Label>
              <Item regular>
                <Input
                  disabled
                  value={this.state.room}
                  style={{backgroundColor: '#a5b1c2'}}
                />
              </Item>
              <Label style={[styles.modalformlabel, {marginTop: 10}]}>
                Customer
              </Label>
              <Picker
                selectedValue={this.state.idCustomer}
                style={{height: 50, width: 340}}
                onValueChange={itemValue =>
                  this.setState({idCustomer: itemValue})
                }>
                {this.props.customers.data.map(pick => (
                  <Picker.Item
                    key={pick.id}
                    label={pick.name}
                    value={pick.id}
                  />
                ))}
              </Picker>
              <Label style={[styles.modalformlabel, {marginTop: 10}]}>
                Duration <Text note> (minutes) </Text>
              </Label>
              <Item regular>
                <Input onChangeText={data => this.setState({duration: data})} />
              </Item>
            </Form>
            <Button
              info
              style={styles.btnmodal}
              onPress={() => this.checkInPost()}>
              <Text> SAVE </Text>
            </Button>
            <Button
              warning
              style={styles.btnmodal}
              onPress={() => this.toggleCheckInModal()}>
              <Text> CANCEL </Text>
            </Button>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.CheckOutVisible}
          onBackdropPress={() => this.toogleCancelCheckOut()}>
          <View style={styles.modalcon}>
            <Text style={styles.modaltxt}>CheckOut</Text>
            <Form>
              <Label style={styles.modalformlabel}>Room Name</Label>
              <Item regular>
                <Input
                  disabled
                  value={this.state.room}
                  style={{backgroundColor: '#a5b1c2'}}
                />
              </Item>
              <Label style={[styles.modalformlabel, {marginTop: 10}]}>
                Customer
              </Label>
              <Item regular>
                <Input
                  disabled
                  value={this.state.customer}
                  style={{backgroundColor: '#a5b1c2'}}
                />
              </Item>
              <Label style={[styles.modalformlabel, {marginTop: 10}]}>
                Duration <Text note> (minutes) </Text>
              </Label>
              <Item regular>
                <Input
                  disabled
                  value={this.state.duration.toString()}
                  style={{backgroundColor: '#a5b1c2'}}
                />
              </Item>
            </Form>
            <Button
              info
              style={styles.btnmodal}
              onPress={() => this.checkOutPut()}>
              <Text> CHECKOUT </Text>
            </Button>
            <Button
              warning
              style={styles.btnmodal}
              onPress={() => this.toogleCancelCheckOut()}>
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
    checkin: state.checkin,
    customers: state.customers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetCheckIn: token => dispatch(actionsCheckIn.handleGetCheckIn(token)),
    handleGetCustomers: token =>
      dispatch(actionsCustomers.handleGetCustomers(token)),
    handlePostCheckIn: (token, idRoom, idCustomer, duration) =>
      dispatch(
        actionsCheckIn.handlePostCheckIn(token, idRoom, idCustomer, duration),
      ),
    handlePutCheckOut: (token, idOrder) =>
      dispatch(actionsCheckIn.handlePutCheckOut(token, idOrder)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckIn);

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.orange,
  },
  room: {
    margin: 13,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 70,
    backgroundColor: color.carrot,
  },
  roomtxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  roomDisable: {
    margin: 13,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 70,
    backgroundColor: '#d1d8e0',
  },
  roomtxtDisable: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 5,
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
    fontSize: 24,
    marginBottom: 10,
  },
  modalformlabel: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
