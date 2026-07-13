import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY } from "../constants/theme";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";
import FeatureCard from "../components/FeatureCard";
import { router } from "expo-router";
import { getDictionary, fetchAndSaveDictionary } from "../utils/storage";

export default function OnboardingScreen() {
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");
  const [wordCount, setWordCount] = useState<number>(0);

  const handleSync = useCallback(async () => {
    if (syncStatus === "syncing") return;
    setSyncStatus("syncing");

    try {
      const data = await fetchAndSaveDictionary();
      setWordCount(data.length);
      setSyncStatus("success");
      setTimeout(() => {
        setSyncStatus("idle");
      }, 3000);
    } catch (error) {
      console.error(error);
      setSyncStatus("error");
      Alert.alert(
        "अद्यतनीकरणम् विफलम् (Sync Failed)",
        "Could not update the offline database. Please check your internet connection."
      );
    }
  }, [syncStatus]);

  useEffect(() => {
    const checkCache = async () => {
      const local = await getDictionary();
      setWordCount(local.length);
      if (local.length === 0) {
        handleSync();
      }
    };
    checkCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBeginJourney = () => {
    router.push("/translate");
  };

  return (
    <View style={styles.outerContainer}>
      <Header 
        variant="onboarding" 
        onRightPress={handleSync}
        isRightLoading={syncStatus === "syncing"}
      />
      
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
              {"\"विद्यैव सर्वधनम् प्रधानम्\""}
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

          {/* Offline Cache Status Badge */}
          {syncStatus === "syncing" && (
            <View style={styles.cacheBadge}>
              <ActivityIndicator size="small" color={COLORS.primaryMedium} style={{ marginRight: 4 }} />
              <Text style={styles.cacheBadgeText}>Syncing Sanskrit database...</Text>
            </View>
          )}

          {syncStatus === "success" && (
            <View style={styles.cacheBadge}>
              <Feather name="check-circle" size={14} color="green" />
              <Text style={[styles.cacheBadgeText, { color: "green" }]}>
                Database updated! {wordCount.toLocaleString()} words loaded.
              </Text>
            </View>
          )}

          {syncStatus === "error" && (
            <TouchableOpacity style={styles.cacheBadge} onPress={handleSync}>
              <Feather name="alert-circle" size={14} color="#d32f2f" />
              <Text style={[styles.cacheBadgeText, { color: "#d32f2f", textDecorationLine: "underline" }]}>
                Sync failed. Tap to retry.
              </Text>
            </TouchableOpacity>
          )}

          {syncStatus === "idle" && wordCount > 0 && (
            <View style={styles.cacheBadge}>
              <Feather name="check-circle" size={14} color={COLORS.primaryMedium} />
              <Text style={styles.cacheBadgeText}>
                {wordCount.toLocaleString()} Sanskrit words saved offline
              </Text>
            </View>
          )}
        </View>

        {/* Feature Grid Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featuresHeader}>
            <Text style={styles.featuresTitle}>KEY PILLARS</Text>
          </View>

          {/* Bento Grid layout */}
          <View style={styles.bentoGrid}>
            <FeatureCard
              title="अनुवाद और शब्दकोश"
              description="हिन्दी और संस्कृत शब्दों का आपस में सटीक और तीव्र अनुवाद करें।"
              iconName="globe"
              layout="horizontal"
              height={108}
            />
            
            <View style={styles.bentoRow}>
              <FeatureCard
                title="पसंदीदा शब्द"
                description="महत्वपूर्ण शब्दों को यहाँ सहेजें।"
                iconName="bookmark"
                layout="vertical"
                width="48%"
                height={160}
              />
              <FeatureCard
                title="खोज इतिहास"
                description="पिछली खोजें आसानी से देखें।"
                iconName="clock"
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

  cacheBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 20,
    opacity: 0.8,
  },
  cacheBadgeText: {
    fontFamily: TYPOGRAPHY.sans,
    fontSize: 13,
    color: COLORS.textMuted,
  },
});
