import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY } from "../constants/theme";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";
import FeatureCard from "../components/FeatureCard";
import { router } from "expo-router";

export default function OnboardingScreen() {
  const handleBeginJourney = () => {
    router.push("/translate");
  };

  return (
    <View style={styles.outerContainer}>
      <Header variant="onboarding" />
      
      {/* Background Decorative Blur/Outline Element */}
      <View style={styles.decoratorCircle} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card Container */}
        <View style={styles.heroCard}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/shabd_logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Sanskrit Quote Section */}
          <View style={styles.quoteSection}>
            <Text style={styles.quoteText}>
              "विद्यैव सर्वधनम् प्रधानम्"
            </Text>
            
            {/* Ornament Separator */}
            <View style={styles.ornamentContainer}>
              <View style={styles.ornamentLine} />
              <Feather name="minus" size={16} color="#8f4e004d" />
              <View style={styles.ornamentLine} />
            </View>

            <Text style={styles.quoteTranslation}>
              Knowledge is the supreme of all{"\n"}wealth.
            </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleBeginJourney}
            activeOpacity={0.9}
          >
            <Text style={styles.actionButtonText}>Begin Your Journey</Text>
            <Feather name="arrow-right" size={18} color="#ffffff" style={styles.actionButtonIcon} />
          </TouchableOpacity>
        </View>

        {/* Feature Grid Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featuresHeader}>
            <Text style={styles.featuresTitle}>KEY PILLARS</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.exploreAllText}>Explore All</Text>
            </TouchableOpacity>
          </View>

          {/* Bento Grid layout */}
          <View style={styles.bentoGrid}>
            <FeatureCard
              title="Vedic Etymology"
              description="Trace sacred roots across centuries."
              iconName="layers"
              layout="horizontal"
              height={108}
            />
            
            <View style={styles.bentoRow}>
              <FeatureCard
                title="Classic Texts"
                description="Context from the Puranas."
                iconName="file-text"
                layout="vertical"
                width="48%"
                height={160}
              />
              <FeatureCard
                title="Pronunciation"
                description="Master the holy chanting."
                iconName="volume-2"
                layout="vertical"
                width="48%"
                height={160}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar activeTab="library" />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  decoratorCircle: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: 250,
    borderWidth: 1,
    borderColor: "rgba(143, 78, 0, 0.08)", // subtle primary stroke
    left: -55,
    top: 192,
    zIndex: -1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120, // margin to scroll clear of bottom navigation bar
  },
  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
  },
  logoContainer: {
    width: 128,
    height: 128,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 128,
    height: 128,
  },
  quoteSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  quoteText: {
    fontFamily: TYPOGRAPHY.serifItalic,
    fontSize: 26,
    color: COLORS.primary,
    textAlign: "center",
    lineHeight: 36,
  },
  ornamentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    width: 120,
    justifyContent: "space-between",
  },
  ornamentLine: {
    height: 1,
    backgroundColor: "#8f4e004d",
    flex: 1,
    marginHorizontal: 8,
  },
  quoteTranslation: {
    fontFamily: TYPOGRAPHY.sans,
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 22,
  },
  actionButton: {
    width: "100%",
    height: 60,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  actionButtonText: {
    fontFamily: TYPOGRAPHY.sansSemiBold,
    fontSize: 18,
    color: COLORS.textLight,
  },
  actionButtonIcon: {
    marginLeft: 12,
  },
  featuresSection: {
    marginTop: 40,
  },
  featuresHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  featuresTitle: {
    fontFamily: TYPOGRAPHY.sans,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textMuted,
    letterSpacing: 1.6,
  },
  exploreAllText: {
    fontFamily: TYPOGRAPHY.sansSemiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
  bentoGrid: {
    gap: 16,
  },
  bentoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
