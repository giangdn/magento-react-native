import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, Alert, TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { magento } from '../../magento';
import { getProductThumbnailFromAttribute } from '../../helper/product';
import { Spinner } from '../common';
import { removeFromCartLoading, removeFromCart } from '../../actions';

class CartListItem extends Component {
  image() {
    const { products, item } = this.props;
    if (products && products[item.sku]) {
      return getProductThumbnailFromAttribute(products[item.sku]);
    }
  }

  onPressRemoveItem = () => {
    Alert.alert(
      'You sure?',
      `Just double-checking you wanted to remove the item: ${this.props.item.name}`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Remove it', onPress: () => this.performRemoveItem() },
      ],
      { cancelable: true },
    );
  };

  performRemoveItem() {
    this.props.removeFromCartLoading(this.props.item.item_id);

    this.props.removeFromCart({
      cart: this.props.cart,
      item: this.props.item,
    });
  }

  render() {
    const {
      imageStyle,
      containerStyle,
      textStyle,
      infoStyle,
      priceStyle,
      container,
    } = styles;
    const imageUri = this.image();
    const attrs = this.props.item.sku.split('-');
    return (
      <View style={container}>
        <View style={containerStyle}>
          <Image style={imageStyle} resizeMode="contain" source={{ uri: imageUri }} />
          <View style={infoStyle}>
            <Text style={textStyle} numberOfLines={1} ellipsizeMode="tail">{this.props.item.name}</Text>
            <Text style={priceStyle}>
              {this.props.item.currencySymbol}
              {' '}
              {this.props.item.price}
              {' '}
              <Text style={{ fontSize: 14, textDecorationLine: 'line-through', opacity: 0.8 }}>{this.props.item.price + 12}</Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', padding: 8, paddingTop: 0 }}>
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <TextInput value={`${this.props.item.qty}`} style={styles.quantity} />
            <TextInput value={attrs[1]} style={styles.quantity} />
            <TextInput value={attrs[2]} style={styles.quantity} />
          </View>
          <View style={styles.removeContainer}>
            {this.props.cart.removingItemId === this.props.item.item_id
              ? (
                <View style={styles.spinnerWrapper}>
                  <Spinner />
                </View>
              )
              : (
                <TouchableOpacity
                  style={styles.iconStyle}
                  onPress={this.onPressRemoveItem}
                >
                  <View style={styles.iconWrapper}>
                    <Icon
                      name="trash"
                      type="feather"
                    />
                  </View>

                </TouchableOpacity>
              )
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    borderColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  quantity: {
    margin: 3,
    backgroundColor: '#f4f6f6',
    borderRadius: 6,
    padding: 10,
    height: 35,
    fontSize: 16,
    color: 'gray',
    flex: 1,
  },
  infoStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 2,
  },
  textStyle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
    opacity: 0.8,
  },
  priceStyle: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  imageStyle: {
    height: 80,
    margin: 10,
    borderWidth: 3,
    borderColor: '#f4f6f6',
    borderRadius: 6,
    overflow: 'hidden',
    width: null,
    flex: 1,
  },
  iconWrapper: {
    alignSelf: 'flex-end',
    backgroundColor: '#f4f6f6',
    padding: 8,
    borderRadius: 20,
  },
  removeContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  spinnerWrapper: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
};

const mapStateToProps = ({ cart }) => {
  const { products } = cart;
  return { products, cart };
};

export default connect(mapStateToProps, { removeFromCartLoading, removeFromCart })(CartListItem);
