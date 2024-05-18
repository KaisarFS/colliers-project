// CreateEmployeeScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateEmployeeScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [email, setEmail] = useState('');
  const [web, setWeb] = useState('');

  const handleCreateEmployee = async () => {
    // Validate input
    if (!firstName || !lastName || !companyName || !address || !city || !county || !state || !zip || !phone1 || !email || !web) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('https://employee-api-kappa.vercel.app/employee/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.replace(/^"|"$/g, '')}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          address,
          city,
          county,
          state,
          zip: parseInt(zip, 10),
          phone1,
          phone2,
          email,
          web,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      Alert.alert('Success', 'Employee created successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('EmployeeList', { refresh: true }); // Navigate back and refresh the list
          },
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

          <Text style={styles.label}>Company Name</Text>
          <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} />

          <Text style={styles.label}>Address</Text>
          <TextInput style={styles.input} value={address} onChangeText={setAddress} />

          <Text style={styles.label}>City</Text>
          <TextInput style={styles.input} value={city} onChangeText={setCity} />

          <Text style={styles.label}>County</Text>
          <TextInput style={styles.input} value={county} onChangeText={setCounty} />

          <Text style={styles.label}>State</Text>
          <TextInput style={styles.input} value={state} onChangeText={setState} />

          <Text style={styles.label}>ZIP</Text>
          <TextInput style={styles.input} value={zip} onChangeText={setZip} keyboardType="numeric" />

          <Text style={styles.label}>Phone 1</Text>
          <TextInput style={styles.input} value={phone1} onChangeText={setPhone1} />

          <Text style={styles.label}>Phone 2</Text>
          <TextInput style={styles.input} value={phone2} onChangeText={setPhone2} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

          <Text style={styles.label}>Website</Text>
          <TextInput style={styles.input} value={web} onChangeText={setWeb} />

          <Button title="Create Employee" onPress={handleCreateEmployee} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 16,
  },
  form: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
