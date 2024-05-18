// LoginScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token !== null) {
        console.log('Token found:', token);
        // Do something with the token if needed
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };
  

const handleLogin = async () => {
  const { email, password } = form;

  try {
    const response = await fetch('https://employee-api-kappa.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    const data = await response.json(); // Parse response as JSON

    if (response.ok) {
      // Save the JWT token to AsyncStorage
      await AsyncStorage.setItem('token', data.token);

      // Login successful, navigate to Home (or EmployeeList)
      navigation.navigate('Home'); // Change 'Home' to the appropriate screen name
    } else {
      // Login failed, show an error message
      Alert.alert('Login Failed', data.message || 'Please check your credentials and try again.');
    }
  } catch (error) {
    Alert.alert('Error', 'An error occurred. Please try again.');
  }
};


  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={{
                uri: 'https://assets.withfra.me/SignIn.2.png',
              }} />

            <Text style={styles.title}>
              Sign in to <Text style={{ color: '#075eec' }}>MyApp</Text>
            </Text>

            <Text style={styles.subtitle}>
              Get access to your portfolio and more
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password} />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleLogin}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLink}>Forgot password?</Text>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => {
            // handle link
          }}
          style={{ marginTop: 'auto' }}>
          <Text style={styles.formFooter}>
            Don't have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImg: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 5,
  },
  inputControl: {
    height: 40,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  formAction: {
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#075eec',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formLink: {
    marginTop: 20,
    fontSize: 14,
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
