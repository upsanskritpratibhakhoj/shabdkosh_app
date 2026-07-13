import AsyncStorage from "@react-native-async-storage/async-storage";

export interface HistoryItem {
  id: string;
  sourceText: string;
  targetText: string;
  sourceLang: "hindi" | "sanskrit";
  targetLang: "hindi" | "sanskrit";
  timestamp: number;
}

export interface BookmarkItem {
  id: string;
  hindi: string;
  sanskrit: string;
  timestamp: number;
}

const HISTORY_KEY = "sabdkosh_history_v1";
const BOOKMARKS_KEY = "sabdkosh_bookmarks_v1";

// HISTORY MANAGEMENT
export async function getHistory(): Promise<HistoryItem[]> {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading history:", error);
    return [];
  }
}

export async function addHistory(
  sourceText: string,
  targetText: string,
  sourceLang: "hindi" | "sanskrit",
  targetLang: "hindi" | "sanskrit"
): Promise<HistoryItem[]> {
  if (!sourceText.trim() || !targetText.trim()) return [];
  try {
    const history = await getHistory();
    
    // Deduplicate: remove if existing search already exists for the same translation
    const filtered = history.filter(
      (item) =>
        !(
          item.sourceText.toLowerCase() === sourceText.toLowerCase() &&
          item.sourceLang === sourceLang
        )
    );

    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random()}`,
      sourceText,
      targetText,
      sourceLang,
      targetLang,
      timestamp: Date.now(),
    };

    // Keep only last 50 items
    const updated = [newItem, ...filtered].slice(0, 50);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Error saving history:", error);
    return [];
  }
}

export async function deleteHistoryItem(id: string): Promise<HistoryItem[]> {
  try {
    const history = await getHistory();
    const updated = history.filter((item) => item.id !== id);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("Error deleting history item:", error);
    return [];
  }
}

export async function clearHistory(): Promise<void> {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Error clearing history:", error);
  }
}

// BOOKMARKS MANAGEMENT
export async function getBookmarks(): Promise<BookmarkItem[]> {
  try {
    const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading bookmarks:", error);
    return [];
  }
}

export async function isBookmarked(hindi: string, sanskrit: string): Promise<boolean> {
  if (!hindi.trim() || !sanskrit.trim()) return false;
  try {
    const bookmarks = await getBookmarks();
    return bookmarks.some(
      (item) =>
        item.hindi.toLowerCase() === hindi.toLowerCase() &&
        item.sanskrit.toLowerCase() === sanskrit.toLowerCase()
    );
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    return false;
  }
}

export async function toggleBookmark(hindi: string, sanskrit: string): Promise<boolean> {
  if (!hindi.trim() || !sanskrit.trim()) return false;
  try {
    const bookmarks = await getBookmarks();
    const index = bookmarks.findIndex(
      (item) =>
        item.hindi.toLowerCase() === hindi.toLowerCase() &&
        item.sanskrit.toLowerCase() === sanskrit.toLowerCase()
    );

    let isAdded = false;
    if (index >= 0) {
      // Remove bookmark
      bookmarks.splice(index, 1);
    } else {
      // Add bookmark
      const newItem: BookmarkItem = {
        id: `${Date.now()}-${Math.random()}`,
        hindi,
        sanskrit,
        timestamp: Date.now(),
      };
      bookmarks.unshift(newItem);
      isAdded = true;
    }

    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return isAdded;
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return false;
  }
}
