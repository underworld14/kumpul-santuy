import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, TouchableOpacity, FlatList} from 'react-native';
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
  List,
  ListItem,
  Thumbnail,
} from 'native-base';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import {MaterialIndicator} from 'react-native-indicators';
import * as actionsCustomers from '../redux/_actions/customers';
import * as color from '../assets/color';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      idcustomer: '',
      idcard: '',
      name: '',
      phone: '',
      modalVisible: false,
      eModalVisible: false,
      isrefreshing: false,
    };
  }

  async componentDidMount() {
    await this.getIdentity();
    await this.getCustomers();
  }

  getIdentity = async () => {
    await AsyncStorage.getItem('token').then(key => {
      this.setState({
        token: key,
      });
    });
  };

  getCustomers = () => {
    this.props.handleGetCustomers((token = this.state.token));
  };

  refreshData = async () => {
    await this.getCustomers();
  };

  postCustomer = async () => {
    this.toggleModal();
    await this.props.handlePostCustomers(
      (token = this.state.token),
      (name = this.state.name),
      (idcard = this.state.idcard),
      (phone = this.state.phone),
    );
    await this.getCustomers();
  };

  putCustomer = async () => {
    this.eToggleModal();
    await this.props.handlePutCustomers(
      (token = this.state.token),
      (name = this.state.name),
      (idcard = this.state.idcard),
      (phone = this.state.phone),
      (idcustomer = this.state.idcustomer),
    );
    await this.getCustomers();
  };

  handlerefresh = async () => {
    this.setState({isrefreshing: true});
    await this.getCustomers;
    this.setState({isrefreshing: false});
  };

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  eToggleModal = (idcustomer, name, idcard, phone) => {
    this.setState({eModalVisible: !this.state.eModalVisible});
    this.setState({
      idcustomer,
      name,
      idcard,
      phone,
    });
  };

  render() {
    const profImg =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXNM88jFoywO7jEY_mM_dMtHLeCDpAr5O6qRI5bWbxgYX9sLC-';

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

    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Icon
              type="FontAwesome"
              name="id-card"
              size={20}
              style={{color: 'white'}}
            />
          </Left>
          <Body>
            <Title> Customer List </Title>
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
          data={this.props.customers.data}
          onRefresh={this.handlerefresh}
          refreshing={this.state.isrefreshing}
          renderItem={({item}) => (
            <View key={item.id} style={styles.customCon}>
              <List>
                <ListItem avatar>
                  <Left>
                    <Thumbnail
                      source={{
                        uri: `${profImg}`,
                      }}
                    />
                  </Left>
                  <Body>
                    <Text style={styles.txtname}>{item.name}</Text>
                    <Text note>{item.identity}</Text>
                    <Text note>{item.phone}</Text>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      onPress={() =>
                        this.eToggleModal(
                          (idcustomer = item.id),
                          (name = item.name),
                          (idcard = item.identity),
                          (phone = item.phone),
                        )
                      }>
                      <Icon type="FontAwesome5" name="user-edit" />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
              </List>
            </View>
          )}
          keyExtractor={item => item.id}
        />

        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.toggleModal()}>
          <View style={styles.modalcon}>
            <Text style={styles.modaltxt}> ADD CUSTOMERS FORMS </Text>
            <Item>
              <Icon type="FontAwesome5" name="users" />
              <Input
                placeholder="Name"
                onChangeText={name => this.setState({name})}
              />
            </Item>
            <Item>
              <Icon type="FontAwesome5" name="id-badge" />
              <Input
                placeholder="Identity Number"
                onChangeText={idcard => this.setState({idcard})}
              />
            </Item>
            <Item>
              <Icon type="FontAwesome5" name="phone" />
              <Input
                placeholder="Phone Number"
                onChangeText={phone => this.setState({phone})}
              />
            </Item>
            <Button
              info
              style={styles.btnmodal}
              onPress={() => this.postCustomer()}>
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
            <Text style={styles.modaltxt}> EDIT CUSTOMERS FORMS </Text>
            <Item>
              <Icon type="FontAwesome5" name="users" />
              <Input
                value={this.state.name}
                onChangeText={name => this.setState({name})}
              />
            </Item>
            <Item>
              <Icon type="FontAwesome5" name="id-badge" />
              <Input
                value={this.state.idcard}
                onChangeText={idcard => this.setState({idcard})}
              />
            </Item>
            <Item>
              <Icon type="FontAwesome5" name="phone" />
              <Input
                value={this.state.phone}
                onChangeText={phone => this.setState({phone})}
              />
            </Item>
            <Button
              info
              style={styles.btnmodal}
              onPress={() => this.putCustomer()}>
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

        <View>
          <Fab
            containerStyle={{}}
            style={{backgroundColor: color.orange}}
            position="bottomRight"
            onPress={() => this.toggleModal()}>
            <Icon type="FontAwesome5" name="plus" />
          </Fab>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetCustomers: token =>
      dispatch(actionsCustomers.handleGetCustomers(token)),
    handlePostCustomers: (token, name, idcard, phone) =>
      dispatch(
        actionsCustomers.handlePostCustomers(token, name, idcard, phone),
      ),
    handlePutCustomers: (token, name, idcard, phone, idcustomer) =>
      dispatch(
        actionsCustomers.handlePutCustomers(
          token,
          name,
          idcard,
          phone,
          idcustomer,
        ),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customers);

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.orange,
  },
  footer: {
    backgroundColor: '#2e7eff',
  },
  icon: {
    color: 'white',
  },
  customCon: {
    marginTop: 3,
  },
  txtname: {
    fontWeight: 'bold',
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
