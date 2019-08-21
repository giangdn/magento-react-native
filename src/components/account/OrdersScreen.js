import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import {
  getOrdersForCustomer,
  setCurrentProduct,
} from '../../actions';
import OrderListItem from './OrderListItem';

import { NAVIGATION_HOME_SCREEN_PATH } from '../../navigation/routes';

const StrOrder = 'Your Bookings';
const EmptyOrder = require('../../../resources/docs.png');

class OrdersScreen extends Component {
  static navigationOptions = () => ({
    title: StrOrder,
    headerBackTitle: ' ',
  });

  componentDidMount() {
    this.props.getOrdersForCustomer(this.props.customerId);
  }

  onRefresh = () => {
    this.props.getOrdersForCustomer(this.props.customerId, true);
  };

  renderItem = orderItem => (
    <OrderListItem item={orderItem.item} currencySymbol={this.props.currencySymbol} />
  );

  renderOrderList = () => {
    const data = this.props.orders.sort((b, a) => moment(a.created_at).diff(b.created_at));

    return (
      <FlatList
        refreshControl={(
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.onRefresh}
          />
        )}
        data={data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  renderEmptyOrderList = () => {
    const { navigate } = this.props.navigation;
    const {
      emptyListContainerStyle,
      textStyle,
      buttonTextStyle,
    } = styles;


    return (
      <View style={emptyListContainerStyle}>
        <Image source={EmptyOrder} style={{ width: 98, height: 116, marginBottom: 20 }} />
        <Text style={{ color: '#999', fontSize: 16 }}>
          there is no booking now...
        </Text>
        <TouchableOpacity
          onPress={() => navigate(NAVIGATION_HOME_SCREEN_PATH)}
        >
          <Text style={buttonTextStyle}>
            Continue shopping
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { orders } = this.props;

    if (orders && orders.length) {
      return (
        <View style={styles.containerStyle}>
          {this.renderOrderList()}
        </View>
      );
    }
    return this.renderEmptyOrderList();
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyListContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textStyle: {
    fontSize: 20,
    paddingTop: 7,
  },
  buttonTextStyle: {
    padding: 14,
    fontSize: 16,
    top: 0,
    color: '#59b58d',
  },
};

const mapStateToProps = ({ account, magento }) => {
  const customerId = account.customer ? account.customer.id : null;
  const { default_display_currency_symbol: currencySymbol } = magento.currency;
  const orders = account.orderData ? account.orderData.items : [];
  return {
    customerId,
    orders,
    refreshing: account.refreshing,
    currencySymbol,
  };
};

export default connect(mapStateToProps, {
  getOrdersForCustomer,
  setCurrentProduct,
})(OrdersScreen);
