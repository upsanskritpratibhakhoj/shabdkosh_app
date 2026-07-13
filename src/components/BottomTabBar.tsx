import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

interface BottomTabBarProps {
  activeTab: "translate" | "history" | "bookmarks" | "library";
}

export default function BottomTabBar({ activeTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Onboarding screen style has all-caps 10px text and library highlighted.
  // Translation screen style has Title Case 14px text and translate highlighted.
  const isLibraryActive = activeTab === "library";

  const tabs = [
    {
      id: "translate" as const,
      label: isLibraryActive ? "TRANSLATE" : "Translate",
      icon: "globe" as const,
      route: "/translate",
    },
    {
      id: "history" as const,
      label: isLibraryActive ? "HISTORY" : "History",
      icon: "clock" as const,
      route: "/history",
    },
    {
      id: "bookmarks" as const,
      label: isLibraryActive ? "BOOKMARKS" : "Bookmarks",
      icon: "bookmark" as const,
      route: "/bookmarks",
    },
  ];

  const handlePress = (route: any, id: string) => {
    router.replace(route);
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 12 },
      ]}
    >
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          // Determine styles based on which design variant is active (Library Onboarding vs Translation page)
          let tabStyle = {};
          let textStyle = {};
          let iconColor = COLORS.textGray;

          if (isLibraryActive) {
            // Onboarding style (Library Active)
            if (isActive) {
              tabStyle = styles.libraryActiveTab;
              textStyle = styles.libraryActiveText;
              iconColor = COLORS.primary;
            } else {
              tabStyle = styles.inactiveTab;
              textStyle = styles.libraryInactiveText;
              iconColor = COLORS.textGray;
            }
          } else {
            // Translation style (Translate Active)
            if (isActive) {
              tabStyle = styles.translateActiveTab;
              textStyle = styles.translateActiveText;
              iconColor = COLORS.secondaryDark;
            } else {
              tabStyle = styles.inactiveTab;
              textStyle = styles.translateInactiveText;
              iconColor = COLORS.textGray;
            }
          }

          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, tabStyle]}
              onPress={() => handlePress(tab.route, tab.id)}
              activeOpacity={0.8}
            >
              <Feather name={tab.icon} size={isLibraryActive ? 18 : 20} color={iconColor} />
              <Text
                style={[
                  isLibraryActive ? styles.capsLabel : styles.titleCaseLabel,
                  textStyle,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(251, 249, 248, 0.95)", // #fbf9f8f2
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tabBar: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    minWidth: 85,
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  // Onboarding Active Styles
  libraryActiveTab: {
    backgroundColor: COLORS.primaryLight, // #8f4e000d
    borderRadius: 12,
  },
  libraryActiveText: {
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.sansSemiBold,
  },
  libraryInactiveText: {
    color: COLORS.textGray,
    fontFamily: TYPOGRAPHY.sansSemiBold,
  },
  // Translation Active Styles
  translateActiveTab: {
    backgroundColor: COLORS.secondaryLight, // soft translucent secondary fill
    borderRadius: 12, // modern rounded rectangle instead of oval pill
  },
  translateActiveText: {
    color: COLORS.secondaryDark, // #693800
    fontFamily: TYPOGRAPHY.sansSemiBold,
  },
  translateInactiveText: {
    color: COLORS.textGray,
    fontFamily: TYPOGRAPHY.sansSemiBold,
  },
  // Typography variants
  capsLabel: {
    fontSize: 10,
    fontWeight: "700",
    marginTop: 4,
    letterSpacing: 0.5,
  },
  titleCaseLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
});
