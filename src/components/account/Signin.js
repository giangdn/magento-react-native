import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import { Spinner } from '../common/Spinner';
import { signIn } from '../../actions';

class Signin extends Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  componentWillMount() {
    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }

  onCreateAccountPress = () => {
    const {
      email, password, firstname, lastname, confirmPassword,
    } = this.state;
    // TODO: add password check

    const customer = {
      customer: {
        email,
        firstname,
        lastname,
      },
      password,
    };

    this.props.signIn(customer);
  };

  renderButtons() {
    if (this.props.loading) {
      return <View style={styles.inputWrapper}><Spinner style={{ margin: 20 }} /></View>;
    }

    return (
      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={this.onCreateAccountPress} style={styles.btnLogin}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Create an Account</Text>
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
      <View style={styles.container}>
        {this.renderMessages()}
        <TextInput
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          placeholder="Firstname"
          autoCorrect={false}
          returnKeyType="next"
          style={styles.input}
          value={this.state.firstname}
          onChangeText={value => this.setState({ firstname: value })}
          onSubmitEditing={() => { this.lastnameInput.focus(); }}
        />
        <TextInput
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          placeholder="Lastname"
          autoCorrect={false}
          returnKeyType="next"
          style={styles.input}
          value={this.state.lastname}
          onChangeText={value => this.setState({ lastname: value })}
          ref={(input) => { this.lastnameInput = input; }}
          onSubmitEditing={() => { this.emailInput.focus(); }}
        />
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
          ref={(input) => { this.emailInput = input; }}
          onSubmitEditing={() => { this.passwordInput.focus(); }}
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
          ref={(input) => { this.passwordInput = input; }}
          onSubmitEditing={this.onCreateAccountPress}
        />
        <TextInput
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          secureTextEntry
          placeholder="Retype Password"
          autoCorrect={false}
          style={styles.input}
          value={this.state.confirmPassword}
          onChangeText={value => this.setState({ confirmPassword: value })}
          ref={(input) => { this.rePasswordInput = input; }}
          onSubmitEditing={this.onCreateAccountPress}
        />
        {this.renderButtons()}
        <View style={{ padding: 10, textAlign: 'center' }}>
          <Text style={{ color: 'gray', textAlign: 'center' }}>
            By signing up, you agree to our
            {' '}
            <Text style={{ fontWeight: 'bold', color: '#59b58d' }}>Terms</Text>
            {' '}
            and
            {' '}
            <Text style={{ fontWeight: 'bold', color: '#59b58d' }}>Privacy</Text>
          </Text>
        </View>
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
});

const mapStateToProps = ({ customerAuth }) => {
  const { error, success, loading } = customerAuth;

  return { error, success, loading };
};

export default connect(mapStateToProps, { signIn })(Signin);
