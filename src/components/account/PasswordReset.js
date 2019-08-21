import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Spinner } from '../common';
import { buttonStyles, inputStyles } from '../../constants/Styles';
import { initiatePasswordReset } from '../../actions';

class PasswordReset extends Component {
  static navigationOptions = {
    title: 'Reset Password',
  };

  componentWillMount() {
    this.setState({
      email: '',
    });
  }

  onResetPress = () => {
    this.props.initiatePasswordReset(this.state.email);
  };

  renderButtons() {
    if (this.props.loading) {
      return <View style={styles.inputWrapper}><Spinner style={{ margin: 20 }} /></View>;
    }

    return (
      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={this.onResetPress} style={styles.btnLogin}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Reset my Password</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'gray', marginBottom: 20, marginTop: 20 }}>
            Please enter your email address below to receive a password reset link
        </Text>
        <TextInput
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          keyboardType="email-address"
          placeholder="Email"
          autoCorrect={false}
          style={styles.input}
          value={this.state.email}
          onSubmitEditing={this.onResetPress}
          onChangeText={email => this.setState({ email })}
        />
        {this.renderButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 26,
  },
  inputWrapper: {
    alignItems: 'center',
    display: 'flex',
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    padding: 15,
    borderRadius: 6,
    backgroundColor: '#f4f6f6',
    alignSelf: 'stretch',
    marginBottom: 15,
  },
  btnLogin: {
    backgroundColor: '#59b58d',
    borderRadius: 6,
    padding: 15,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});

const mapStateToProps = ({ customerAuth }) => {
  const { reset_email, reset_loading } = customerAuth;

  return { email: reset_email, loading: reset_loading };
};

export default connect(mapStateToProps, {
  initiatePasswordReset,
})(PasswordReset);
