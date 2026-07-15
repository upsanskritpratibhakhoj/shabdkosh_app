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
import { COLORS, TYPOGRAPHY } from "../../constants/theme";
import { router, useFocusEffect } from "expo-router";
import { getBookmarks, toggleBookmark, BookmarkItem } from "../../utils/storage";

export default function BookmarksScreen() {
  const [bookmarksList, setBookmarksList] = useState<BookmarkItem[]>([]);

  const loadBookmarks = async () => {
    const data = await getBookmarks();
    setBookmarksList(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const handleRemoveBookmark = async (item: BookmarkItem) => {
    await toggleBookmark(item.hindi, item.sanskrit);
    // Refresh the list
    loadBookmarks();
  };

  const handleSelectBookmark = (item: BookmarkItem) => {
    router.replace({
      pathname: "/translate",
      params: { word: item.hindi, sourceLang: "hindi" },
    });
  };

  const renderItem = ({ item }: { item: BookmarkItem }) => {
    return (
      <View style={styles.bookmarkCard}>
        <TouchableOpacity
          style={styles.cardClickableArea}
          onPress={() => handleSelectBookmark(item)}
          activeOpacity={0.7}
        >
          <View style={styles.translationRow}>
            <View style={styles.wordBlock}>
              <Text style={styles.langLabel}>HINDI</Text>
              <Text style={styles.wordText} numberOfLines={1}>
                {item.hindi}
              </Text>
            </View>

            <Feather
              name="arrow-right"
              size={16}
              color={COLORS.primaryMedium}
              style={styles.arrowIcon}
            />

            <View style={styles.wordBlock}>
              <Text style={styles.langLabel}>SANSKRIT</Text>
              <Text style={[styles.wordText, styles.sanskritText]} numberOfLines={1}>
                {item.sanskrit}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveBookmark(item)}
          activeOpacity={0.6}
        >
          <Feather name="bookmark" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Words</Text>
      </View>

      {bookmarksList.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Feather name="bookmark" size={48} color={COLORS.primaryMedium} />
          </View>
          <Text style={styles.emptyTitle}>No saved words yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the bookmark icon on translation results to save words here.
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
          data={bookmarksList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40, // Reduced bottom padding since native TabBar takes it
  },
  bookmarkCard: {
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
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 40, // Reduced bottom padding since native TabBar takes it
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
