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
              <View style={styles.titleContainer}>
                <Text style={styles.brandSubtitleOnboarding}>
                  <Text style={{ color: COLORS.secondaryDark }}>हिन्दी</Text>
                  <Text style={{ color: COLORS.textGray }}> • </Text>
                  <Text style={{ color: COLORS.primary }}>संस्कृत</Text>
                </Text>
                <Text style={styles.brandTitleOnboarding}>शब्दकोश</Text>
              </View>
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
              <View style={styles.titleContainerCenter}>
                <Text style={styles.brandSubtitleTranslation}>
                  <Text style={{ color: COLORS.secondaryDark }}>हिन्दी</Text>
                  <Text style={{ color: COLORS.textGray }}> • </Text>
                  <Text style={{ color: COLORS.primary }}>संस्कृत</Text>
                </Text>
                <Text style={styles.brandTitleTranslation}>शब्दकोश</Text>
              </View>
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
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titleContainerCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  brandSubtitleOnboarding: {
    fontFamily: TYPOGRAPHY.sansSemiBold,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  brandSubtitleTranslation: {
    fontFamily: TYPOGRAPHY.sansSemiBold,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 2,
    textAlign: "center",
  },
  brandTitleOnboarding: {
    fontFamily: TYPOGRAPHY.serif,
    fontSize: 25,
    color: COLORS.primary,
    lineHeight: 24,
  },
  brandTitleTranslation: {
    fontFamily: TYPOGRAPHY.sansBold,
    fontSize: 20,
    color: COLORS.primary,
    lineHeight: 24,
  },
});
