import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { cartItemProduct, getCart } from '../../actions';
import CartListItem from './CartListItem';
import NavigationService from '../../navigation/NavigationService';
import {
  NAVIGATION_CHECKOUT_PATH,
  NAVIGATION_HOME_SCREEN_PATH,
} from '../../navigation/routes';
import { Button } from '../common';
import Sizes from '../../constants/Sizes';

const EmptyCart = require('../../../resources/noapps.png');

const StrCart = 'Shopping Cart';

class Cart extends Component {
  static navigationOptions = {
    title: StrCart,
    headerBackTitle: ' ',
  };

  static propTypes = {
    cart: PropTypes.object,
    products: PropTypes.object,
    cartItemProduct: PropTypes.func,
    getCart: PropTypes.func,
    refreshing: PropTypes.bool,
  };

  static defaultProps = {
    cart: {},
    products: {},
    refreshing: false,
  };

  componentDidMount() {
    this.updateCartItemsProducts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.cart.items
      && this.props.cart.items
      && prevProps.cart.items.length !== this.props.cart.items.length
    ) {
      this.updateCartItemsProducts();
    }
  }

  onPressAddToCheckout = () => {
    NavigationService.navigate(NAVIGATION_CHECKOUT_PATH, {
      title: StrCart,
    });
  };

  onRefresh = () => {
    this.props.getCart(true);
  };

  updateCartItemsProducts = () => {
    const { items } = this.props.cart;

    if (!items) {
      return;
    }

    const { products } = this.props;

    items.forEach((item) => {
      if (!item.thumbnail) {
        if (!products[item.sku]) {
          this.props.cartItemProduct(item.sku);
        }
      }
    });
  };

  renderTotals() {
    const { items } = this.props.cart;
    const { totals } = styles;

    let sum = 0;
    if (items) {
      items.forEach((item) => {
        sum += item.price * item.qty;
      });
    }

    if (sum > 0) {
      return (
        <Text style={totals}>
          Totals
          {' '}
          {sum.toFixed(2)}
        </Text>
      );
    }
  }

  renderEmptyCart = () => {
    const { navigate } = this.props.navigation;
    const {
      containerStyle,
      totals,
      buttonTextStyle,
    } = styles;


    return (
      <View style={containerStyle}>
        <Image source={EmptyCart} />
        <Text style={{ color: 'gray' }}>
          your shopping cart is empty now...
        </Text>
        <TouchableOpacity
          onPress={() => navigate(NAVIGATION_HOME_SCREEN_PATH)}
        >
          <Text style={buttonTextStyle}>
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderItem = items => <CartListItem item={items.item} expanded={false} />

  renderCart = () => {
    const { items } = this.props.cart;
    const {
      container,
      content,
      footer,
      buttonStyle,
    } = styles;

    return (
      <View style={container}>
        <View style={content}>
          <FlatList
            refreshControl={(
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={this.onRefresh}
              />
            )}
            data={[...items]}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={footer}>
          <View style={{ flex: 1 }}>
            {this.renderTotals()}
          </View>
          <TouchableOpacity
            onPress={this.onPressAddToCheckout}
            style={buttonStyle}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { items } = this.props.cart;

    if (items && items.length) {
      return this.renderCart();
    }
    return this.renderEmptyCart();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
  },
  content: {
    flex: 1,
  },
  totals: {
    color: '#59b58d',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 15,
    margin: 15,
    marginRight: 0,
  },
  buttonTextStyle: {
    padding: 14,
    fontSize: 16,
    top: 0,
    color: '#59b58d',
  },
  footer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    backgroundColor: '#59b58d',
    borderRadius: 6,
    padding: 15,
    alignSelf: 'stretch',
    alignItems: 'center',
    margin: 16,
  },
});

const mapStateToProps = ({ cart }) => {
  const { products } = cart;
  return {
    cart: cart.quote,
    refreshing: cart.refreshing,
    products,
  };
};

export default connect(mapStateToProps, { cartItemProduct, getCart })(Cart);
