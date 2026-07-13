import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY } from "../constants/theme";
import BottomTabBar from "../components/BottomTabBar";
import { router, useFocusEffect } from "expo-router";
import { getHistory, deleteHistoryItem, clearHistory, HistoryItem } from "../utils/storage";

export default function HistoryScreen() {
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistoryList(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const handleClearAll = async () => {
    await clearHistory();
    setHistoryList([]);
  };

  const handleDeleteItem = async (id: string) => {
    const updated = await deleteHistoryItem(id);
    setHistoryList(updated);
  };

  const handleSelectHistory = (item: HistoryItem) => {
    router.replace({
      pathname: "/translate",
      params: { word: item.sourceText, sourceLang: item.sourceLang },
    });
  };

  const renderItem = ({ item }: { item: HistoryItem }) => {
    return (
      <View style={styles.historyCard}>
        <TouchableOpacity
          style={styles.cardClickableArea}
          onPress={() => handleSelectHistory(item)}
          activeOpacity={0.7}
        >
          <View style={styles.translationRow}>
            <View style={styles.wordBlock}>
              <Text style={styles.langLabel}>
                {item.sourceLang.toUpperCase()}
              </Text>
              <Text style={styles.wordText} numberOfLines={1}>
                {item.sourceText}
              </Text>
            </View>

            <Feather
              name="arrow-right"
              size={16}
              color={COLORS.primaryMedium}
              style={styles.arrowIcon}
            />

            <View style={styles.wordBlock}>
              <Text style={styles.langLabel}>
                {item.targetLang.toUpperCase()}
              </Text>
              <Text style={[styles.wordText, item.targetLang === "sanskrit" ? styles.sanskritText : undefined]} numberOfLines={1}>
                {item.targetText}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteItem(item.id)}
          activeOpacity={0.6}
        >
          <Feather name="trash-2" size={18} color="#c25353" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        {historyList.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {historyList.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Feather name="clock" size={48} color={COLORS.primaryMedium} />
          </View>
          <Text style={styles.emptyTitle}>Your history is empty</Text>
          <Text style={styles.emptySubtitle}>
            Words you translate will appear here.
          </Text>
          <TouchableOpacity
            style={styles.translateNowButton}
            onPress={() => router.replace("/translate")}
            activeOpacity={0.9}
          >
            <Text style={styles.translateNowText}>Translate Now</Text>
            <Feather name="globe" size={16} color="#ffffff" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={historyList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <BottomTabBar activeTab="history" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.serif,
    fontSize: 28,
    color: COLORS.primary,
  },
  clearAllText: {
    fontFamily: TYPOGRAPHY.sansSemiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  historyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  cardClickableArea: {
    flex: 1,
  },
  translationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  wordBlock: {
    flex: 1,
  },
  langLabel: {
    fontSize: 10,
    fontFamily: TYPOGRAPHY.sansBold,
    color: COLORS.textGray,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  wordText: {
    fontSize: 16,
    fontFamily: TYPOGRAPHY.sansSemiBold,
    color: COLORS.textDark,
  },
  sanskritText: {
    color: COLORS.primary,
  },
  arrowIcon: {
    marginHorizontal: 12,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 100,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: TYPOGRAPHY.serif,
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontFamily: TYPOGRAPHY.sans,
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
    marginBottom: 24,
  },
  translateNowButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  translateNowText: {
    fontFamily: TYPOGRAPHY.sansSemiBold,
    fontSize: 16,
    color: "#ffffff",
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
