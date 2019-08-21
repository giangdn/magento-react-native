import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import { Spinner, Button } from '../common';
import { auth } from '../../actions/CustomerAuthActions';
import {
  NAVIGATION_SIGNIN_PATH,
  NAVIGATION_RESET_PASSWORD_PATH,
} from '../../navigation/routes';

const StrLogin = 'Login';
const StrSignin = 'Sign Up';
const StrForget = 'Forget password?';

const drinkies = require('../../../resources/drinkies.png');

class Login extends Component {
  static navigationOptions = {
    title: StrLogin,
  };

  componentWillMount() {
    this.setState({
      email: '',
      password: '',
      number: '',
    });
  }

  onLoginPress = () => {
    const { email, password } = this.state;
    this.props.auth(email, password);
  };

  onSigninPress = () => {
    this.props.navigation.navigate(NAVIGATION_SIGNIN_PATH);
  };

  passwordForget = () => {
    this.props.navigation.navigate(NAVIGATION_RESET_PASSWORD_PATH);
  };

  passwordInputFocus = () => {
    this.passwordInput.focus();
  };

  renderButtons() {
    if (this.props.loading) {
      return <View style={styles.inputWrapper}><Spinner style={{ margin: 20 }} /></View>;
    }

    return (
      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={this.onLoginPress} style={styles.btnLogin}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{StrLogin}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.passwordForget} style={styles.link}>
          <Text style={styles.linkTitle}>{StrForget}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onSigninPress}
          style={styles.btnSignup}
        >
          <Text style={{
            color: 'gray', fontWeight: 'bold', lineHeight: 22, flex: 1,
          }}
          >
            {StrSignin}
          </Text>
          <Icon name="keyboard-arrow-right" color="#999999" />
        </TouchableOpacity>
      </View>
    );
  }

  renderMessages() {
    const { error, success } = this.props;
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }

    if (success) {
      return <Text style={styles.success}>{success}</Text>;
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image source={drinkies} style={styles.logo} />
        <View style={styles.inputWrapper}>
          {this.renderMessages()}
          <TextInput
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            autoCorrect={false}
            style={styles.input}
            value={this.state.email}
            onChangeText={value => this.setState({ email: value })}
            onSubmitEditing={this.passwordInputFocus}
          />
          <TextInput
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            secureTextEntry
            placeholder="Password"
            autoCorrect={false}
            style={styles.input}
            value={this.state.password}
            onChangeText={value => this.setState({ password: value })}
            onSubmitEditing={this.onLoginPress}
            ref={(input) => { this.passwordInput = input; }}
          />
        </View>
        {this.renderButtons()}
        <View />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 49,
    marginTop: 60,
    marginBottom: 40,
  },
  inputWrapper: {
    alignItems: 'center',
    display: 'flex',
    alignSelf: 'stretch',
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    alignSelf: 'stretch',
    backgroundColor: '#f4f6f6',
    borderRadius: 6,
    marginBottom: 10,
    padding: 15,
  },
  btnLogin: {
    backgroundColor: '#59b58d',
    borderRadius: 6,
    padding: 15,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  btnSignup: {
    backgroundColor: '#f4f6f6',
    borderRadius: 6,
    padding: 15,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    justifyContent: 'center',
    marginBottom: 20,
  },
  error: {
    color: '#cd0930',
    textAlign: 'center',
    marginBottom: 20,
  },
  success: {
    color: '#01640B',
    textAlign: 'center',
    backgroundColor: '#E5EFE5',
    marginBottom: 20,
  },
  link: {
    marginTop: 30,
    marginBottom: 50,
    alignSelf: 'stretch',
  },
  linkTitle: {
    color: '#59b58d',
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({ customerAuth }) => {
  const { error, success, loading } = customerAuth;

  return { error, success, loading };
};

export default connect(mapStateToProps, { auth })(Login);
