import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, TouchableOpacity, View, Image,
} from 'react-native';
import Sizes from '../../constants/Sizes';
import { getProductThumbnailFromAttribute } from '../../helper/product';

const FeaturedProductItem = ({
  onPress,
  currencySymbol,
  ...props
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.containerStyle}
      onPress={() => { onPress(props); }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={{ uri: getProductThumbnailFromAttribute(props) }}
        />
      </View>
      <View style={styles.infoStyle}>
        <Text style={styles.textStyle} ellipsizeMode="tail" numberOfLines={1}>{props.name}</Text>
        {console.log(props)}
        <Text style={styles.priceStyle}>
          {`${currencySymbol + props.price}`}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

FeaturedProductItem.propTypes = {
  name: PropTypes.string,
  currencySymbol: PropTypes.string.isRequired,
  price: PropTypes.number,
  onPress: PropTypes.func,
};

FeaturedProductItem.defaultProps = {
  products: {},
  style: {},
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: (Sizes.WINDOW_WIDTH - 48) / 2,
  },
  containerStyle: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    margin: 8,
  },
  infoStyle: {
    flexDirection: 'column',
    width: (Sizes.WINDOW_WIDTH - 48) / 2,
  },
  textStyle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.8,
  },
  priceStyle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '600',
    color: '#59b58d',
  },
  imageStyle: {
    height: 140,
    width: 140,
  },
  imageContainer: {
    flex: 1,
    borderWidth: 3,
    borderColor: '#f4f6f6',
    borderRadius: 6,
    overflow: 'hidden',
    width: (Sizes.WINDOW_WIDTH - 48) / 2,
    height: 142,
    alignItems: 'center',
  },
});

export default FeaturedProductItem;
