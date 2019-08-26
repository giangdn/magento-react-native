import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native';
import { getProductThumbnailFromAttribute } from '../../helper/product';

class ProductListItem extends Component {
  image() {
    return getProductThumbnailFromAttribute(this.props.product);
  }

  render() {
    const {
      imageStyle,
      containerStyle,
      textStyle,
      infoStyle,
      priceStyle,
    } = styles;


    return (
      <View style={this.props.viewContainerStyle}>
        <TouchableOpacity
          style={[containerStyle, this.props.columnContainerStyle]}
          onPress={() => { this.props.onRowPress(this.props.product); }}
        >

          <Image
            style={[imageStyle, this.props.imageStyle]}
            resizeMode="contain"
            source={{ uri: this.image() }}
          />
          <View style={[infoStyle, this.props.infoStyle]}>
            <Text style={[textStyle, this.props.textStyle]}>{this.props.product.name}</Text>
            <Text style={[priceStyle, this.props.priceStyle]}>
              {`${this.props.currencySymbol} ${this.props.product.price}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

ProductListItem.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    margin: 1,
  },
  infoStyle: {
    flexDirection: 'column',
    flex: 2,
  },
  textStyle: {
    marginTop: 30,
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.8,
  },
  priceStyle: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  imageStyle: {
    height: 100,
    margin: 10,
    borderWidth: 3,
    borderColor: '#f4f6f6',
    borderRadius: 6,
    overflow: 'hidden',
    width: null,
  },
};

export { ProductListItem };
