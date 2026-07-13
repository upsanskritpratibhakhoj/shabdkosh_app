import React from "react";
import { View, Text, StyleSheet, DimensionValue } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY } from "../constants/theme";

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: keyof typeof Feather.glyphMap;
  layout: "horizontal" | "vertical";
  width?: DimensionValue;
  height?: number;
}

export default function FeatureCard({
  title,
  description,
  iconName,
  layout,
  width,
  height,
}: FeatureCardProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <View
      style={[
        styles.card,
        {
          width: width || "100%",
          height: height || "auto",
          flexDirection: isHorizontal ? "row" : "column",
          alignItems: isHorizontal ? "center" : "flex-start",
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          isHorizontal ? styles.horizontalIcon : styles.verticalIcon,
        ]}
      >
        <Feather name={iconName} size={isHorizontal ? 22 : 16} color={COLORS.textDark} />
      </View>
      
      <View style={[styles.textContainer, isHorizontal ? styles.horizontalText : styles.verticalText]}>
        <Text style={[styles.title, { fontSize: isHorizontal ? 18 : 14 }]}>
          {title}
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardMuted, // #f6f3f2
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border, // #dbc2b04d
    padding: 24,
  },
  iconContainer: {
    backgroundColor: COLORS.primaryLight, // #8f4e000d
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalIcon: {
    width: 48,
    height: 48,
  },
  verticalIcon: {
    width: 40,
    height: 40,
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  horizontalText: {
    marginLeft: 24,
  },
  verticalText: {
    marginLeft: 0,
  },
  title: {
    fontFamily: TYPOGRAPHY.serif,
    color: COLORS.textDark,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontFamily: TYPOGRAPHY.sans,
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 16,
  },
});
