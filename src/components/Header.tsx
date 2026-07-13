import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  variant: "onboarding" | "translation";
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightIconName?: keyof typeof Feather.glyphMap;
  isRightLoading?: boolean;
}

export default function Header({ 
  variant, 
  onLeftPress, 
  onRightPress,
  rightIconName = "refresh-cw",
  isRightLoading = false 
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const isOnboarding = variant === "onboarding";

  return (
    <View
      style={[
        styles.headerContainer,
        { paddingTop: insets.top > 0 ? insets.top : 12 },
      ]}
    >
      <View style={styles.content}>
        {isOnboarding ? (
          // Onboarding Layout: Brand Left-Aligned, Refresh/Action on the right
          <>
            <View style={styles.leftSection}>
              <Text style={styles.brandTitleOnboarding}>Shabdkosh</Text>
            </View>
            
            {onRightPress && (
              <TouchableOpacity 
                onPress={onRightPress} 
                style={styles.iconButton}
                disabled={isRightLoading}
                activeOpacity={0.6}
              >
                {isRightLoading ? (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                  <Feather name={rightIconName} size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            )}
          </>
        ) : (
          // Translation Layout: Back Button Left, Centered Title, Info Button Right
          <>
            <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
              <Feather name="arrow-left" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            
            <View style={styles.centerSection}>
              <Text style={styles.brandTitleTranslation}>Shabdkosh</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: "rgba(251, 249, 248, 0.8)", // #fbf9f8cc
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight, // #dbc2b01a
  },
  content: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  centerSection: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
  },
  iconButton: {
    padding: 8,
    marginHorizontal: -8,
  },
  brandTitleOnboarding: {
    fontFamily: TYPOGRAPHY.serif,
    fontSize: 24,
    color: COLORS.primary,
    lineHeight: 32,
  },
  brandTitleTranslation: {
    fontFamily: TYPOGRAPHY.sansBold,
    fontSize: 24,
    color: COLORS.primary,
    lineHeight: 32,
  },
});
