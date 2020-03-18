import React from 'react';
import {View, Button, Text} from 'react-native';
import {AuthContext} from './Context';

function BaseCenterView({children}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </View>
  );
}

export function HomeScreen({navigation}) {
  return (
    <BaseCenterView>
      <Text>首页</Text>
      <Button
        title="go Details"
        onPress={() => {
          navigation.navigate('Details');
        }}
      />
    </BaseCenterView>
  );
}
export function DetailsScreen() {
  return (
    <BaseCenterView>
      <Text>详情</Text>
    </BaseCenterView>
  );
}
export function MineScreen() {
  return (
    <BaseCenterView>
      <Text>我的</Text>
    </BaseCenterView>
  );
}
export function SettingScreen() {
  const {signOut} = React.useContext(AuthContext);
  return (
    <BaseCenterView>
      <Text>设置</Text>
      <Button
        title="退出登录"
        onPress={() => {
          signOut();
        }}
      />
    </BaseCenterView>
  );
}
export function SignInScreen() {
  const {signIn} = React.useContext(AuthContext);
  return (
    <BaseCenterView>
      <Text>登录页面</Text>
      <Button
        title="登录"
        onPress={() => {
          signIn();
        }}
      />
    </BaseCenterView>
  );
}
export function SplashScreen() {
  return (
    <BaseCenterView>
      <Text>loading...</Text>
    </BaseCenterView>
  );
}
