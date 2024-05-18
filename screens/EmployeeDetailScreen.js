// EmployeeDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmployeeDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      token = token.replace(/^"|"$/g, '');
      
      const response = await fetch(`https://employee-api-kappa.vercel.app/employee?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result, "<== result detail")
      setData(result);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FeatherIcon
            color="#000"
            name="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerText}>Employee Detail</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>{data.first_name} {data.last_name}</Text>
          <Text style={styles.detailItem}>Company: {data.company_name}</Text>
          <Text style={styles.detailItem}>Address: {data.address}</Text>
          <Text style={styles.detailItem}>City: {data.city}</Text>
          <Text style={styles.detailItem}>County: {data.county}</Text>
          <Text style={styles.detailItem}>State: {data.state}</Text>
          <Text style={styles.detailItem}>ZIP: {data.zip}</Text>
          <Text style={styles.detailItem}>Phone 1: {data.phone1}</Text>
          <Text style={styles.detailItem}>Phone 2: {data.phone2}</Text>
          <Text style={styles.detailItem}>Email: {data.email}</Text>
          <Text style={styles.detailItem}>Website: {data.web}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  detailContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  errorText: {
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
    color: 'red',
  },
});
