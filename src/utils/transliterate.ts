/**
 * Utility to fetch transliteration suggestions from Google Input Tools API.
 * Supports phonetic English-to-Hindi and English-to-Sanskrit transliteration.
 */

export async function fetchTransliteration(
  text: string,
  lang: "hindi" | "sanskrit"
): Promise<string[]> {
  const trimmed = text.trim();
  if (!trimmed) return [];

  // Don't call API if there are no Latin/English characters
  if (!/[a-zA-Z]/.test(trimmed)) {
    return [];
  }

  // Google Input Tools codes:
  // hi-t-i0-und = Hindi transliteration
  // sa-t-i0-und = Sanskrit transliteration
  const itc = lang === "hindi" ? "hi-t-i0-und" : "sa-t-i0-und";
  const url = `https://inputtools.google.com/request?text=${encodeURIComponent(
    trimmed
  )}&itc=${itc}&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8&app=sabdkosh`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (
      data &&
      data[0] === "SUCCESS" &&
      data[1] &&
      data[1][0] &&
      data[1][0][1]
    ) {
      return data[1][0][1] as string[];
    }
    return [];
  } catch (error) {
    console.error("Transliteration fetch error:", error);
    return [];
  }
}
