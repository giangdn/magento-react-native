import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, FlatList, Text,
  TouchableOpacity,
} from 'react-native';
import Sizes from '../../constants/Sizes';
import FeaturedProductItem from './FeaturedProductItem';


const FeaturedProducts = (props) => {
  const keyExtractor = item => item.id.toString();

  return (
    <View style={[styles.container, props.style]}>
      <View style={{
        padding: 15, paddingBottom: 0, flexDirection: 'row',
      }}
      >
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity style={{ justifyContent: 'center' }}><Text>xem tất cả</Text></TouchableOpacity>
      </View>
      <FlatList
        data={props.products.items}
        style={{ paddingLeft: 5, paddingRight: 5 }}
        numColumns={2}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => <FeaturedProductItem {...item} currencySymbol={props.currencySymbol} onPress={props.onPress} />}
      />
    </View>
  );
};

FeaturedProducts.propTypes = {
  products: PropTypes.object,
  onPress: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.object,
  currencySymbol: PropTypes.string.isRequired,
};

FeaturedProducts.defaultProps = {
  products: {},
  style: {},
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    opacity: 0.8,
    fontWeight: 'bold',
    color: '#006900',
    flex: 1,
  },
});

export default FeaturedProducts;
