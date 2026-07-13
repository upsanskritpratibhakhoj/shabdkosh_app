import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY } from "../constants/theme";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";
import { router, useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard";
import dictionary from "../data/dictionary.json";
import { addHistory, toggleBookmark, isBookmarked } from "../utils/storage";

export default function TranslateScreen() {
  const params = useLocalSearchParams<{ word?: string; sourceLang?: "hindi" | "sanskrit" }>();

  const [sourceLang, setSourceLang] = useState<"hindi" | "sanskrit">("hindi");
  const [targetLang, setTargetLang] = useState<"hindi" | "sanskrit">("sanskrit");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastOpacity] = useState(() => new Animated.Value(0));
  const [toastTranslateY] = useState(() => new Animated.Value(15));
  const toastTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Clean up toast timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToastNotification = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    
    setToastMessage(message);
    setToastVisible(true);
    
    // Reset/Stop animation values
    toastOpacity.setValue(0);
    toastTranslateY.setValue(15);
    
    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(toastTranslateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      toastTimeoutRef.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(toastOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(toastTranslateY, {
            toValue: 15,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setToastVisible(false);
        });
      }, 1500);
    });
  };

  // Sync with route params (if navigating from bookmarks or history)
  useEffect(() => {
    if (params.word) {
      const sLang = params.sourceLang || "hindi";
      const tLang = sLang === "hindi" ? "sanskrit" : "hindi";
      /* eslint-disable react-hooks/set-state-in-effect */
      setSourceLang(sLang);
      setTargetLang(tLang);
      setInputText(params.word);
      
      const match = dictionary.find(
        (item) => item[sLang].toLowerCase() === params.word?.toLowerCase()
      );
      if (match) {
        setTranslatedText(match[tLang]);
      } else {
        setTranslatedText("");
      }
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [params.word, params.sourceLang]);

  // Sync bookmark state
  useEffect(() => {
    const checkBookmark = async () => {
      if (!inputText.trim() || !translatedText.trim()) {
        setIsSaved(false);
        return;
      }
      const hindi = sourceLang === "hindi" ? inputText.trim() : translatedText.trim();
      const sanskrit = sourceLang === "sanskrit" ? inputText.trim() : translatedText.trim();
      const bookmarked = await isBookmarked(hindi, sanskrit);
      setIsSaved(bookmarked);
    };
    checkBookmark();
  }, [inputText, translatedText, sourceLang]);

  const performTranslation = (text: string, currentSource: "hindi" | "sanskrit", currentTarget: "hindi" | "sanskrit") => {
    const trimmed = text.trim();
    if (!trimmed) {
      setTranslatedText("");
      return;
    }
    const match = dictionary.find(
      (item) => item[currentSource].toLowerCase() === trimmed.toLowerCase()
    );
    if (match) {
      const translation = match[currentTarget];
      setTranslatedText(translation);
      addHistory(trimmed, translation, currentSource, currentTarget);
    } else {
      setTranslatedText("");
    }
  };

  const handleBack = () => {
    router.replace("/");
  };

  const handleSwap = () => {
    const newSource = targetLang;
    const newTarget = sourceLang;
    setSourceLang(newSource);
    setTargetLang(newTarget);
    setInputText(translatedText);
    setTranslatedText(inputText);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setInputText("");
    setTranslatedText("");
    setShowDropdown(false);
  };

  const handleToggleBookmark = async () => {
    if (!inputText.trim() || !translatedText.trim()) return;
    const hindi = sourceLang === "hindi" ? inputText.trim() : translatedText.trim();
    const sanskrit = sourceLang === "sanskrit" ? inputText.trim() : translatedText.trim();
    const added = await toggleBookmark(hindi, sanskrit);
    setIsSaved(added);
    showToastNotification(added ? "Added to bookmarks!" : "Removed from bookmarks!");
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    await Clipboard.setStringAsync(translatedText);
    setIsCopied(true);
    showToastNotification("Copied translation to clipboard!");
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const suggestions = inputText.trim()
    ? dictionary.filter((item) => {
        const val = item[sourceLang];
        return (
          val.toLowerCase().startsWith(inputText.trim().toLowerCase()) &&
          val.toLowerCase() !== inputText.trim().toLowerCase()
        );
      }).slice(0, 5)
    : [];

  return (
    <View style={styles.outerContainer}>
      <Header variant="translation" onLeftPress={handleBack} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* SOURCE INPUT CARD */}
          <View
            style={[
              styles.translationCard,
              {
                zIndex: (showDropdown && suggestions.length > 0) ? 50 : 10,
                elevation: (showDropdown && suggestions.length > 0) ? 10 : 0,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.langIndicator}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: sourceLang === "hindi" ? COLORS.secondary : COLORS.primary },
                  ]}
                />
                <Text
                  style={
                    sourceLang === "hindi" ? styles.langTextHindi : styles.langTextSanskrit
                  }
                >
                  {sourceLang === "hindi" ? "HINDI" : "SANSKRIT"}
                </Text>
              </View>

              {inputText.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.closeButton}>
                  <Feather name="x" size={16} color="#8f4e0099" />
                </TouchableOpacity>
              )}
            </View>

            <TextInput
              style={styles.textInput}
              multiline
              value={inputText}
              onChangeText={(text) => {
                setInputText(text);
                performTranslation(text, sourceLang, targetLang);
                setShowDropdown(true);
              }}
              placeholder={
                sourceLang === "hindi"
                  ? "यहाँ हिन्दी शब्द लिखें..."
                  : "यहाँ संस्कृत शब्द लिखें..."
              }
              placeholderTextColor={COLORS.textMuted}
            />

            {showDropdown && suggestions.length > 0 && (
              <View style={styles.dropdownContainer}>
                {suggestions.map((item, idx) => {
                  const word = item[sourceLang];
                  const trans = item[targetLang];
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setInputText(word);
                        setTranslatedText(trans);
                        setShowDropdown(false);
                        addHistory(word, trans, sourceLang, targetLang);
                      }}
                    >
                      <View style={styles.suggestionRow}>
                        <Feather name="search" size={14} color={COLORS.primaryMedium} style={styles.searchIcon} />
                        <Text style={styles.suggestionText}>{word}</Text>
                      </View>
                      <Feather name="arrow-up-left" size={16} color={COLORS.textGray} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* SWAP DIVIDER */}
          <View style={styles.swapDividerContainer}>
            <View style={styles.dividerLine} />
            <TouchableOpacity
              style={styles.swapButton}
              onPress={handleSwap}
              activeOpacity={0.8}
            >
              <Feather name="refresh-cw" size={18} color={COLORS.secondaryDark} />
            </TouchableOpacity>
            <View style={styles.dividerLine} />
          </View>

          {/* TARGET OUTPUT CARD */}
          <View style={[styles.translationCard, { zIndex: 1 }]}>
            <View style={styles.cardHeader}>
              <View style={styles.langIndicator}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: targetLang === "hindi" ? COLORS.secondary : COLORS.primary },
                  ]}
                />
                <Text
                  style={
                    targetLang === "hindi" ? styles.langTextHindi : styles.langTextSanskrit
                  }
                >
                  {targetLang === "hindi" ? "HINDI" : "SANSKRIT"}
                </Text>
              </View>

              {translatedText.length > 0 && (
                <View style={styles.headerRightActions}>
                  <TouchableOpacity onPress={handleCopy} style={styles.headerActionButton}>
                    <Feather
                      name={isCopied ? "check" : "copy"}
                      size={16}
                      color={isCopied ? COLORS.primary : "#8f4e0099"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleToggleBookmark} style={styles.headerActionButton}>
                    <Feather
                      name="bookmark"
                      size={18}
                      color={isSaved ? COLORS.primary : "#8f4e0099"}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TextInput
              style={[
                styles.textInput,
                targetLang === "sanskrit" ? styles.sanskritText : undefined,
              ]}
              multiline
              editable={false}
              value={translatedText}
              placeholder={
                targetLang === "sanskrit"
                  ? "संस्कृत अनुवाद यहाँ दिखेगा..."
                  : "हिन्दी अनुवाद यहाँ दिखेगा..."
              }
              placeholderTextColor={COLORS.primaryMedium}
            />

            {translatedText.length > 0 && (
              <View style={styles.cardFooterSanskrit}>
                <View style={styles.formalTag}>
                  <Text style={styles.formalTagText}>FORMAL</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {toastVisible && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslateY }],
            },
          ]}
        >
          <Feather name="check-circle" size={16} color={COLORS.secondary} style={styles.toastIcon} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}

      <BottomTabBar activeTab="translate" />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
  },
  translationCard: {
    backgroundColor: COLORS.cardMuted,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.02)",
    padding: 24,
    minHeight: 180,
    position: "relative",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  langIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  langTextHindi: {
    fontFamily: TYPOGRAPHY.serif,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textOrange,
    letterSpacing: 0.7,
  },
  langTextSanskrit: {
    fontFamily: TYPOGRAPHY.serif,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textGray,
    letterSpacing: 0.7,
  },
  closeButton: {
    padding: 4,
  },
  headerRightActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerActionButton: {
    padding: 4,
  },
  textInput: {
    fontFamily: TYPOGRAPHY.sans,
    fontSize: 24,
    color: COLORS.textMuted,
    lineHeight: 32,
    minHeight: 80,
    textAlignVertical: "top",
    padding: 0,
  },
  sanskritText: {
    color: COLORS.primary,
  },
  cardFooterSanskrit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  formalTag: {
    backgroundColor: COLORS.tagFormalBg,
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  formalTagText: {
    fontFamily: TYPOGRAPHY.serif,
    fontSize: 12,
    color: COLORS.tagFormalText,
    letterSpacing: 0.6,
  },
  swapDividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    zIndex: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  swapButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: 6,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(143, 78, 0, 0.15)",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 999,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  suggestionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 8,
  },
  suggestionText: {
    fontFamily: TYPOGRAPHY.sansSemiBold,
    fontSize: 16,
    color: COLORS.textDark,
  },
  toastContainer: {
    position: "absolute",
    bottom: 96,
    left: 24,
    right: 24,
    backgroundColor: "rgba(27, 28, 28, 0.95)",
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 9999,
  },
  toastIcon: {
    marginRight: 8,
  },
  toastText: {
    fontFamily: TYPOGRAPHY.sansSemiBold,
    fontSize: 14,
    color: COLORS.textLight,
  },
});
