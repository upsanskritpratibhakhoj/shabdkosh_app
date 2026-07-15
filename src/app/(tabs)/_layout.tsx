import React from "react";
import { Tabs } from "expo-router";
import BottomTabBar from "../../components/BottomTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => {
        const routeName = props.state.routes[props.state.index].name;
        const activeTab = routeName === "index" ? "library" : (routeName as any);
        return <BottomTabBar activeTab={activeTab} navigation={props.navigation} />;
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="translate" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="bookmarks" />
    </Tabs>
  );
}
