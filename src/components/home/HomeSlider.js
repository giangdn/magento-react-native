import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Image, Text,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { magento } from '../../magento';
import Sizes from '../../constants/Sizes';

const HomeSlider = (props) => {
  const renderMediaItems = () => props.slider.map((slide, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <View key={index} style={styles.slide}>
      <Image
        style={styles.imageStyle}
        resizeMode="cover"
        source={{ uri: magento.getMediaUrl() + slide.image }}
      />
      <Text style={styles.slideTitle}>{slide.title}</Text>
    </View>
  ));

  return (
    <View style={[styles.imageContainer, props.style]}>
      <Swiper
        showsPagination
        pagingEnabled
        autoplay
        paginationStyle={{
          bottom: -25,
        }}
        activeDot={(
          <View style={{
            backgroundColor: '#59b58d', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,
          }}
          />
        )}
      >
        {renderMediaItems()}
      </Swiper>
    </View>
  );
};

HomeSlider.propTypes = {
  slider: PropTypes.array,
  style: PropTypes.object,
};

HomeSlider.defaultProps = {
  slider: [],
  style: {},
};

const styles = StyleSheet.create({
  imageContainer: {
    height: Sizes.WINDOW_HEIGHT * 0.3,
  },
  imageStyle: {
    height: Sizes.WINDOW_HEIGHT * 0.3,
    width: Sizes.WINDOW_WIDTH - 30,
    borderRadius: 6,
    overflow: 'hidden',
    top: 0,
  },
  slide: {
    alignItems: 'center',
  },
  slideTitle: {
    marginTop: Sizes.WINDOW_HEIGHT * 0.1,
    marginLeft: Sizes.WINDOW_WIDTH * 0.2,
    marginRight: Sizes.WINDOW_WIDTH * 0.2,
    position: 'absolute',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default HomeSlider;
