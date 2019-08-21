import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from '../common';
import { logout, currentCustomer } from '../../actions';
import { NAVIGATION_ORDERS_PATH, NAVIGATION_ADDRESS_SCREEN_PATH } from '../../navigation/routes';

const StrAccont = 'My Account';
const avatar = require('../../../resources/avatar.png');

const ListItems = [
  {
    label: 'Loyalty Programs',
  },
  {
    label: 'Your Bookings',
  },
  {
    label: 'Your Vouchers',
  },
  {
    label: 'Address List',
  },
  {
    label: 'Signup for E-Newsletter',
  },
  {
    label: 'Support Center',
  },
  {
    label: 'About Drinkies',
  },
  {
    label: 'Sign Out',
  },
];

class Account extends Component {
  static navigationOptions = {
    title: StrAccont,
  };

  componentDidMount() {
    if (!this.props.customer) {
      this.props.currentCustomer();
    }
  }

  onLogoutPress = () => {
    this.props.logout();
  };

  renderCustomerData() {
    if (!this.props.customer) {
      return <ActivityIndicator size="large" style={styles.activity} />;
    }

    const { email, firstname, lastname } = this.props.customer;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
          <View style={{
            width: 60, height: 60, backgroundColor: '#59b58d', borderRadius: 6, alignItems: 'center', justifyContent: 'center',
          }}
          >
            <Text style={{
              color: 'white', fontSize: 30, fontWeight: 'bold',
            }}
            >
              {firstname.charAt(0)}
            </Text>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ ...styles.text, fontWeight: 'bold' }}>{`${lastname} ${firstname}`}</Text>
            <Text style={styles.text}>{email}</Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1, paddingTop: 10 }}>
          <TouchableOpacity style={{ ...styles.listItem, borderTopWidth: 0.5, borderTopColor: '#eeeeee' }}>
            <Text style={{ ...styles.text, flex: 1 }}>{ListItems[0].label}</Text>
            <Icon name="keyboard-arrow-right" color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={this.openOrders}>
            <Text style={{ ...styles.text, flex: 1 }}>{ListItems[1].label}</Text>
            <Icon name="keyboard-arrow-right" color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={{ ...styles.text, flex: 1 }}>{ListItems[2].label}</Text>
            <Icon name="keyboard-arrow-right" color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={this.openAddAddress}>
            <Text style={{ ...styles.text, flex: 1 }}>{ListItems[3].label}</Text>
            <Icon name="keyboard-arrow-right" color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={{ ...styles.text, flex: 1 }}>{ListItems[4].label}</Text>
            <Icon name="checksquareo" type="antdesign" color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={{ ...styles.text, flex: 1 }}>{ListItems[5].label}</Text>
            <Icon name="phone-square" type="font-awesome" color="#999999" />
            <View style={{ marginLeft: 10 }}><Icon name="mail" type="antdesign" color="#999999" /></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={{ ...styles.text, flex: 1 }}>{ListItems[6].label}</Text>
            <Icon name="keyboard-arrow-right" color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.listItem, borderBottomWidth: 0 }} onPress={this.onLogoutPress}>
            <Text style={{ ...styles.text, flex: 1 }}>{ListItems[7].label}</Text>
            <Icon name="power-settings-new" color="#999999" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  openOrders = () => {
    this.props.navigation.navigate(NAVIGATION_ORDERS_PATH);
  };

  openAddAddress = () => {
    this.props.navigation.navigate(NAVIGATION_ADDRESS_SCREEN_PATH);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderCustomerData()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  activity: {
    padding: 10,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dddddd',
  },
  textContainer: {
    marginBottom: 15,
  },
  buttonMargin: {
    marginTop: 20,
  },
});

const mapStateToProps = ({ account }) => {
  const { customer } = account;
  return { customer };
};

export default connect(mapStateToProps, { logout, currentCustomer })(Account);
