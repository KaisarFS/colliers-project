import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function EmployeeList() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (clear = false) => {
    try {
      setLoading(true);
      let token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      token = token.replace(/^"|"$/g, '');

      const response = await fetch(`https://employee-api-kappa.vercel.app/employee?size=10&page=${clear ? 0 : page}&search=${input}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.length === 0) {
        setHasMore(false);
      } else {
        setData(prevData => clear ? result : [...prevData, ...result]);
        setPage(prevPage => clear ? 1 : prevPage + 1);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(true);
    }, [])
  );

  useEffect(() => {
    fetchData();
  }, [input]);

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isNearBottom && hasMore && !loading) {
      fetchData();
    }
  };

  const filteredRows = useMemo(() => {
    const query = input.toLowerCase();
    return data.filter(item => item.first_name.toLowerCase().includes(query));
  }, [input, data]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Welcome, User 👋</Text>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <FeatherIcon
                color="#848484"
                name="search"
                size={17} />
            </View>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={val => setInput(val)}
              placeholder="Start typing.."
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              value={input} />
          </View>
        </View>

        {loading && page === 0 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ScrollView
            contentContainerStyle={styles.searchContent}
            onScroll={handleScroll}
            scrollEventThrottle={16}>
            {filteredRows.length ? (
              filteredRows.map((item, index) => {
                const { first_name, last_name, phone1 } = item;
                const id = `${index}`;

                return (
                  <View key={id} style={styles.cardWrapper}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('EmployeeDetail', { id, ...item });
                      }}>
                      <View style={styles.card}>
                        <View style={[styles.cardImg, styles.cardAvatar]}>
                          <Text style={styles.cardAvatarText}>{first_name[0]}</Text>
                        </View>
                        <View style={styles.cardBody}>
                          <Text style={styles.cardTitle}>{first_name} {last_name}</Text>
                          <Text style={styles.cardPhone}>{phone1}</Text>
                        </View>
                        <View style={styles.cardAction}>
                          <FeatherIcon
                            color="#9ca3af"
                            name="chevron-right"
                            size={22} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <Text style={styles.searchEmpty}>No results</Text>
            )}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight - 15 : 0,
  },
  container: {
    paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
    marginTop: 6,
  },
  search: {
    position: 'relative',
    backgroundColor: '#efefef',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchWrapper: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#efefef',
  },
  searchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
  },
  searchContent: {
    paddingLeft: 24,
  },
  searchEmpty: {
    textAlign: 'center',
    paddingTop: 16,
    fontWeight: '500',
    fontSize: 15,
    color: '#9ca1ac',
  },
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    borderColor: '#d6d6d6',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#616d79',
    // marginTop: 3,
  },
  cardAction: {
    paddingRight: 16,
  },
  errorText: {
    textAlign: 'center',
    paddingTop: 16,
    fontWeight: '500',
    fontSize: 15,
    color: 'red',
  },
});
