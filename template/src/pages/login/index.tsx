import {View, Text} from 'react-native';
import React from 'react';
import type {RootStackScreenProps} from '@/types';

export default ({route}: RootStackScreenProps<'Login'>) => {
  const userName = route.params?.userName;
  return (
    <View>
      <Text>{userName}</Text>
    </View>
  );
};
