import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import {RootStackScreenProps, TabParamList} from '@/types/navigation';

import Home from '@/pages/home';
import Profile from '@/pages/profile';
import Message from '@/pages/message';

const Tab = createBottomTabNavigator<TabParamList>();

const tabsData: {
  name: keyof TabParamList;
  label: string;
  icon: string;
  component: () => JSX.Element;
}[] = [
  {
    name: 'Home',
    component: Home,
    label: '主页',
    icon: 'home',
  },
  {
    name: 'Profile',
    component: Profile,
    label: '个人中心',
    icon: 'user',
  },
  {
    name: 'Message',
    component: Message,
    label: '消息',
    icon: 'message1',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (props: RootStackScreenProps<'Tab'>) => {
  return (
    <React.Fragment>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        {tabsData.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarLabel: ({focused}) => {
                  return (
                    <Text
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{fontSize: 12, color: focused ? '#f00' : '#FF0'}}>
                      {item.label}
                    </Text>
                  );
                },
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({focused}) => (
                  <Icon
                    name={item.icon}
                    size={20}
                    color={focused ? '#f00' : '#FF0'}
                  />
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
    </React.Fragment>
  );
};
