export const meta = {
  name: 'translate-horoscope',
  description: 'Generate Chinese and Japanese translations for 2026 horoscope data',
  phases: [
    { title: 'Generate ZH-TW', detail: 'Translate 12 zodiac 2026 horoscopes to Chinese' },
    { title: 'Generate JA', detail: 'Translate 12 zodiac 2026 horoscopes to Japanese' },
  ],
}

const ANIMALS = ['rat','ox','tiger','rabbit','dragon','snake','horse','goat','monkey','rooster','dog','pig']

const ZH_NAMES = {
  rat: '鼠', ox: '牛', tiger: '虎', rabbit: '兔', dragon: '龍',
  snake: '蛇', horse: '馬', goat: '羊', monkey: '猴', rooster: '雞',
  dog: '狗', pig: '豬',
}
const JA_NAMES = {
  rat: '子（ねずみ）', ox: '丑（うし）', tiger: '寅（とら）', rabbit: '卯（うさぎ）',
  dragon: '辰（たつ）', snake: '巳（へび）', horse: '午（うま）', goat: '未（ひつじ）',
  monkey: '申（さる）', rooster: '酉（とり）', dog: '戌（いぬ）', pig: '亥（いのしし）',
}

phase('Generate ZH-TW')

const zhResult = {}
for (const animal of ANIMALS) {
  const result = await agent(`Translate the following 2026 Chinese zodiac horoscope text for ${animal} (${ZH_NAMES[animal]}) from English to Traditional Chinese (zh-TW). Provide natural Traditional Chinese that sounds originally written in the language.

FOR ALL 7 FIELDS listed below, output ONLY the Chinese text for each, using this exact format:
overall: [Chinese]
career: [Chinese]
love: [Chinese]
health: [Chinese]
finance: [Chinese]
keyMonths: [Chinese]
advice: [Chinese]

Original English:
overall: 2026 is a year of dynamic change for Rat. The Fire Horse energy ignites your social skills and ambition. You will feel pulled in many directions as opportunities arise. Rat's Water element is challenged by the Fire Horse, creating a year where you must stay grounded while reaching for the stars. Your adaptability will be your superpower this year.
career: Major career developments are on the horizon. Your networking skills shine. A job change or promotion is possible mid-year. Strategic patience wins the race this year.
love: A sizzling year for romance. Singles will attract partners easily. Existing couples should plan adventures together. Watch for jealousy issues around August.
health: Your energy levels are good but scattered. The Fire element puts stress on your heart and circulatory system. Regular exercise is essential.
finance: Income opportunities flow in, but so do expenses. Multiple income streams will serve you well. Set a budget to prevent impulse spending.
keyMonths: February (career opportunities), June (romance peaks), October (financial gains)
advice: Stay adaptable but maintain your core values. Trust your instincts. Build a support network.`, { label: `zh-TW: ${animal}`, phase: 'Generate ZH-TW' })
  zhResult[animal] = result
}

phase('Generate JA')

const jaResult = {}
for (const animal of ANIMALS) {
  const result = await agent(`Translate the following 2026 Chinese zodiac horoscope text for ${animal} (${JA_NAMES[animal]}) from English to Japanese (ja). Provide natural Japanese that sounds originally written in the language.

FOR ALL 7 FIELDS listed below, output ONLY the Japanese text for each, using this exact format:
overall: [Japanese]
career: [Japanese]
love: [Japanese]
health: [Japanese]
finance: [Japanese]
keyMonths: [Japanese]
advice: [Japanese]

Original English:
overall: 2026 is a year of dynamic change for Rat. The Fire Horse energy ignites your social skills and ambition. You will feel pulled in many directions as opportunities arise. Rat's Water element is challenged by the Fire Horse, creating a year where you must stay grounded while reaching for the stars. Your adaptability will be your superpower this year.
career: Major career developments are on the horizon. Your networking skills shine. A job change or promotion is possible mid-year. Strategic patience wins the race this year.
love: A sizzling year for romance. Singles will attract partners easily. Existing couples should plan adventures together. Watch for jealousy issues around August.
health: Your energy levels are good but scattered. The Fire element puts stress on your heart and circulatory system. Regular exercise is essential.
finance: Income opportunities flow in, but so do expenses. Multiple income streams will serve you well. Set a budget to prevent impulse spending.
keyMonths: February (career opportunities), June (romance peaks), October (financial gains)
advice: Stay adaptable but maintain your core values. Trust your instincts. Build a support network.`, { label: `JA: ${animal}`, phase: 'Generate JA' })
  jaResult[animal] = result
}

return { zhResult, jaResult }
