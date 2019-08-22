import React from 'react';
import {
  FlatList, TouchableOpacity, StyleSheet, View, Text,
} from 'react-native';
import Image from 'react-native-scalable-image';

import Sizes from '../../constants/Sizes';

const icons = [
  {
    id: 1,
    src: require('../../../resources/icons/icon-cider.png'),
    label: 'Cider',
  },
  {
    id: 2,
    src: require('../../../resources/icons/icon-beer.png'),
    label: 'Beer',
  },
  {
    id: 3,
    src: require('../../../resources/icons/icon-snacks.png'),
    label: 'Snack',
  },
  {
    id: 4,
    src: require('../../../resources/icons/icon-softdrink.png'),
    label: 'Soft Drink',
  },
];
// eslint-disable-next-line react/prefer-stateless-function
const HomeIcon = props => (
  <FlatList
    style={styles.container}
    data={icons}
    numColumns={2}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity style={styles.icon} key={`icon${item.id}`}>
        <View style={styles.iconCircle}>
          <Image source={item.src} style={styles.iconImg} height={70} />
        </View>
        <Text style={{ fontWeight: 'bold', margin: 5 }}>{item.label}</Text>
      </TouchableOpacity>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  icon: {
    width: (Sizes.WINDOW_WIDTH - 30) / 2,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  iconCircle: {
    backgroundColor: '#f4f6f6',
    borderRadius: 55,
    padding: 20,
    alignItems: 'center',
    width: 110,
    height: 110,
  },
  iconImg: {

  },
});

export default HomeIcon;
