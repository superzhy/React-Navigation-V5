import React from 'react';
import {View} from 'react-native';
import {AuthContext} from './Context';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  DetailsScreen,
  SettingScreen,
  MineScreen,
  SignInScreen,
  SplashScreen,
} from './Screen';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
  </AuthStack.Navigator>
);

const MainStack = createStackNavigator();
function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      {/* <MainStack.Screen name="Drawer" component={DrawerScreen} /> */}
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Details" component={DetailsScreen} />
    </MainStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tab" component={TabScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TabBarIcon = (focused, color) => {
  return (
    <View
      style={{
        width: focused ? 24 : 18,
        height: focused ? 24 : 18,
        backgroundColor: color,
      }}
    />
  );
};

function TabScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{activeTintColor: '#FD7328', inactiveTintColor: '#999'}}
      screenOptions={{
        tabBarIcon: ({focused, color}) => {
          return TabBarIcon(focused, color);
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: '首页'}}
      />
      <Tab.Screen
        name="Mine"
        component={MineScreen}
        options={{title: '我的'}}
      />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken = false}) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={MainStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('asdf');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
