import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING } from "../constants/theme";

export default function AboutDictionary() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.paragraph}>
        संस्कृत भारतीय ज्ञान-परम्परा, दर्शन, साहित्य, विज्ञान तथा संस्कृति की आधारभूत भाषा है। यद्यपि संस्कृत का साहित्य अत्यन्त समृद्ध एवं व्यापक है, तथापि सामान्य जन, विद्यार्थी, अध्यापक, शोधार्थी तथा अनुवादक प्रायः इस कठिनाई का अनुभव करते हैं कि किसी हिन्दी शब्द के लिए उपयुक्त एवं प्रसंगानुकूल संस्कृत शब्द का चयन सहजता से उपलब्ध नहीं हो पाता। एक ही हिन्दी शब्द के अनेक अर्थ तथा उनके अनुरूप संस्कृत में भिन्न-भिन्न पर्याय होने के कारण यह आवश्यकता और भी अधिक अनुभव की जाती है।
      </Text>

      <Text style={styles.paragraph}>
        इसी आवश्यकता की पूर्ति के उद्देश्य से इस हिन्दी संस्कृत शब्दकोश का निर्माण किया गया है। इसमें हिन्दी के प्रचलित शब्दों के लिए यथासम्भव शुद्ध, प्रामाणिक एवं व्यवहारोपयोगी संस्कृत पर्याय संकलित किए गए हैं। जहाँ किसी शब्द के एकाधिक अर्थ या प्रयोग प्रचलित हैं, वहाँ उनके अनुरूप अनेक संस्कृत शब्द प्रस्तुत किए गए हैं, जिससे उपयोगकर्ता प्रसंगानुसार उपयुक्त शब्द का चयन कर सके।
      </Text>

      <Text style={styles.paragraph}>
        इस शब्दकोश की एक महत्त्वपूर्ण विशेषता यह है कि केवल शब्दों की सूची प्रस्तुत करने तक ही इसे सीमित नहीं रखा गया है। प्रत्येक प्रविष्टि के साथ आवश्यकतानुसार उसके पद-प्रकार—जैसे संज्ञा, विशेषण, अव्यय आदि—का उल्लेख किया गया है। अनेक क्रियार्थक शब्दों के साथ उनकी <Text style={styles.boldText}>धातु</Text>, उपसर्ग, णिच् अथवा अन्य व्याकरणिक संकेत भी दिए गए हैं। इससे यह शब्दकोश केवल सामान्य उपयोगकर्ताओं के लिए ही नहीं, अपितु संस्कृत के अध्येताओं, अध्यापकों, शोधकर्ताओं, अनुवादकों तथा प्रतियोगी परीक्षाओं की तैयारी करने वाले विद्यार्थियों के लिए भी समान रूप से उपयोगी सिद्ध होगा।
      </Text>

      <Text style={styles.paragraph}>
        शब्दों का चयन करते समय संस्कृत साहित्य, कोश-परम्परा तथा प्रचलित व्यवहार—इन तीनों का यथासम्भव समन्वय करने का प्रयास किया गया है। जहाँ आवश्यक हुआ है, वहाँ एक ही हिन्दी शब्द के लिए अनेक संस्कृत पर्याय दिए गए हैं, क्योंकि भाषा में शब्द का चयन सदैव प्रसंग, शैली तथा अभिप्रेत अर्थ पर निर्भर करता है। अतः इस शब्दकोश में प्रदत्त सभी पर्याय प्रत्येक प्रसंग में समान रूप से प्रयोज्य हों, ऐसा आवश्यक नहीं है। उपयोगकर्ता को प्रसंगानुकूल शब्द का विवेकपूर्वक चयन करना अपेक्षित है।
      </Text>

      <Text style={styles.paragraph}>
        इस शब्दकोश के परिमार्जन एवं मानकीकरण में पाणिनीय व्याकरण के सिद्धान्तों का यथासम्भव पालन किया गया है। शब्दों के चयन एवं प्रमाणीकरण हेतु <Text style={styles.italicText}>अमरकोश</Text>, <Text style={styles.italicText}>आप्टे संस्कृत-हिन्दी कोश</Text>, <Text style={styles.italicText}>अभिधानचिन्तामणि</Text>, <Text style={styles.italicText}>त्रिकाण्डशेष</Text>, <Text style={styles.italicText}>हारावली</Text>, <Text style={styles.italicText}>निरुक्त</Text>, <Text style={styles.italicText}>निघण्टु</Text>, <Text style={styles.italicText}>शब्दकल्पद्रुम</Text>, <Text style={styles.italicText}>वाचस्पत्यम्</Text> आदि पारम्परिक कोशों एवं ग्रन्थों के साथ-साथ भारत सरकार के वैज्ञानिक एवं तकनीकी शब्दावली आयोग (CSTT), संस्कृत भारती की <Text style={styles.italicText}>व्यावहारिक संस्कृत शब्दावली</Text> तथा अन्य प्रमाणभूत आधुनिक स्रोतों का भी समुचित उपयोग किया गया है।
      </Text>

      <Text style={styles.paragraph}>
        डिजिटल युग की आवश्यकताओं को दृष्टिगत रखते हुए इस शब्दकोश को मोबाइल एवं अन्य डिजिटल उपकरणों पर सरलतापूर्वक उपयोग करने योग्य बनाया गया है। तीव्र खोज (Search), देवनागरी यूनिकोड का प्रयोग तथा सुव्यवस्थित शब्द-प्रविष्टियाँ इसकी उपयोगिता को और अधिक बढ़ाती हैं। हमारा उद्देश्य केवल मुद्रित शब्दकोश का डिजिटल रूप प्रस्तुत करना नहीं, बल्कि संस्कृत-अध्ययन एवं हिन्दी–संस्कृत अनुवाद को अधिक सुगम, सरल तथा सर्वसुलभ बनाना है।
      </Text>

      <Text style={styles.paragraph}>
        डिजिटल माध्यम की विशेषता यह है कि ज्ञान निरन्तर विकसित होता रहता है। अतः यह शब्दकोश भी एक सतत् विकसित होने वाली परियोजना है। समय-समय पर इसमें नवीन शब्द, आधुनिक पारिभाषिक शब्दावली, संशोधन तथा उपयोगकर्ताओं के उपयोगी सुझावों का समावेश किया जाता रहेगा, जिससे यह अधिकाधिक समृद्ध एवं प्रामाणिक बन सके।
      </Text>

      <Text style={styles.paragraph}>
        शब्दों की खोज के लिए मुख्य पृष्ठ पर उपलब्ध खोज सुविधा का उपयोग किया जा सकता है। इच्छित हिन्दी अथवा संस्कृत शब्द लिखते ही उससे सम्बन्धित प्रविष्टियाँ तत्काल प्रदर्शित हो जाती हैं। खोज की सुविधा को अधिक सरल बनाने के उद्देश्य से नुक्तायुक्त अक्षरों (जैसे— क़, ख़, ग़, ज़, फ़ आदि) को सामान्य अक्षरों के साथ भी खोजा जा सकता है, जिससे वर्तनी के कारण खोज में किसी प्रकार की कठिनाई न हो। ऐप में उपलब्ध द्वि-दिशात्मक (⇄) सुविधा के माध्यम से हिन्दी से संस्कृत तथा संस्कृत से हिन्दी—दोनों प्रकार की खोज सहजता से की जा सकती है। उपयोगकर्ता अपनी आवश्यकता के अनुसार महत्त्वपूर्ण शब्दों को पसंदीदा शब्द सूची में सुरक्षित रखकर पुनः शीघ्रता से देख सकता है। पूर्व में खोजे गए शब्द खोज इतिहास में भी सुरक्षित रहता है।
      </Text>

      <Text style={styles.paragraph}>
        आशा है कि यह हिन्दी–संस्कृत शब्दकोश विद्यार्थियों, अध्यापकों, शोधार्थियों, लेखकों, अनुवादकों तथा संस्कृत-प्रेमियों के लिए एक विश्वसनीय सहायक सिद्ध होगा तथा संस्कृत भाषा के अध्ययन, अध्यापन, लेखन और व्यवहार में महत्त्वपूर्ण योगदान देगा। यदि इस कार्य के सम्बन्ध में विद्वानों एवं उपयोगकर्ताओं से कोई सुझाव अथवा संशोधन प्राप्त होते हैं, तो उनका स्वागत किया जाएगा और आगामी संस्करणों में उन पर यथोचित विचार किया जाएगा।
      </Text>

      {/* Creator section */}
      <View style={styles.creatorCard}>
        <Text style={styles.creatorLabel}>निर्माता एवं भाषा-विशेषज्ञ</Text>
        <View style={styles.ornamentContainer}>
          <View style={styles.ornamentLine} />
          <Feather name="shield" size={14} color={COLORS.primaryMedium} />
          <View style={styles.ornamentLine} />
        </View>
        <Text style={styles.creatorName}>जगदानन्द झा एवं जयेश कृष्ण</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  headerContainer: {
    marginBottom: SPACING.md,
  },
  title: {
    fontFamily: TYPOGRAPHY.serif,
    fontSize: 20,
    color: COLORS.primary,
    textAlign: "center",
  },
  titleDivider: {
    height: 2,
    backgroundColor: COLORS.primaryLight,
    width: "40%",
    alignSelf: "center",
    marginTop: SPACING.sm,
  },
  paragraph: {
    fontFamily: TYPOGRAPHY.sans,
    fontSize: 15,
    color: COLORS.textMuted,
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: SPACING.md,
  },
  boldText: {
    fontFamily: TYPOGRAPHY.sansBold,
    color: COLORS.textDark,
  },
  italicText: {
    fontFamily: TYPOGRAPHY.serifItalic,
    color: COLORS.primary,
  },
  creatorCard: {
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.cardMuted,
    borderRadius: 12,
    alignItems: "center",
  },
  creatorLabel: {
    fontFamily: TYPOGRAPHY.sansSemiBold,
    fontSize: 12,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  creatorName: {
    fontFamily: TYPOGRAPHY.serif,
    fontSize: 16,
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  ornamentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.xs,
    width: "60%",
    justifyContent: "space-between",
  },
  ornamentLine: {
    height: 1,
    backgroundColor: "#8f4e0033",
    flex: 1,
    marginHorizontal: 8,
  },
});
