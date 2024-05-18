import type {
  NavigatorScreenParams,
  CompositeScreenProps,
} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Tab: NavigatorScreenParams<TabParamList>;
  Login: undefined | {userName: string};
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Message: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;
