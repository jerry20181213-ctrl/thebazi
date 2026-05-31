export interface PairCompatibility {
  pairKey: string;
  signs: [string, string];
  relationship: "six-harmony" | "triad-harmony" | "clash" | "neutral";
  rating: number;
  love: string;
  career: string;
  friendship: string;
  challenges: string;
  advice: string;
}

function pk(a: string, b: string): string {
  return [a, b].sort().join("-");
}

const SIX_HARMONY: [string, string][] = [
  ["rat", "ox"], ["tiger", "pig"], ["rabbit", "dog"],
  ["dragon", "rooster"], ["snake", "monkey"], ["horse", "goat"],
];

const SIX_CLASH: [string, string][] = [
  ["rat", "horse"], ["ox", "goat"], ["tiger", "monkey"],
  ["rabbit", "rooster"], ["dragon", "dog"], ["snake", "pig"],
];

const TRIAD_GROUPS: [string, string, string][] = [
  ["rat", "dragon", "monkey"],
  ["ox", "snake", "rooster"],
  ["tiger", "horse", "dog"],
  ["rabbit", "goat", "pig"],
];

const ANIMALS = ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"];

const ANIMAL_NAMES: Record<string, string> = {
  rat: "Rat", ox: "Ox", tiger: "Tiger", rabbit: "Rabbit", dragon: "Dragon",
  snake: "Snake", horse: "Horse", goat: "Goat", monkey: "Monkey", rooster: "Rooster", dog: "Dog", pig: "Pig",
};

function getRelationshipType(a: string, b: string): { relationship: PairCompatibility["relationship"]; rating: number } {
  if (SIX_HARMONY.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) {
    return { relationship: "six-harmony", rating: 5 };
  }
  if (SIX_CLASH.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) {
    return { relationship: "clash", rating: 2 };
  }
  if (TRIAD_GROUPS.some((g) => g.includes(a) && g.includes(b))) {
    return { relationship: "triad-harmony", rating: 4 };
  }
  return { relationship: "neutral", rating: 3 };
}

const SPECIFIC_CONTENT: Record<string, Pick<PairCompatibility, "love" | "career" | "friendship" | "challenges" | "advice">> = {
  // ===== SIX HARMONY PAIRS (best matches) =====
  [pk("rat", "ox")]: {
    love: "A classic match built on mutual respect. Rat's wit and charm perfectly complement Ox's strength and reliability. Together they form a power couple where each fills what the other lacks. Rat brings social grace while Ox provides unwavering stability.",
    career: "A formidable business partnership. Rat generates creative ideas and Ox executes them with precision. Rat handles networking and strategy while Ox manages operations. Their combined skills can build an empire.",
    friendship: "A deeply loyal friendship. Rat admires Ox's work ethic and Ox appreciates Rat's cleverness. They balance each other — Rat pulls Ox out of rigidity, Ox grounds Rat's restlessness.",
    challenges: "Rat may find Ox too slow or stubborn; Ox may see Rat as too opportunistic. Communication styles differ — Rat is quick and adaptive, Ox is deliberate and set in ways.",
    advice: "Patience is key. Rat should respect Ox's need for stability and routine. Ox should appreciate Rat's resourcefulness rather than dismiss it as scheming.",
  },
  [pk("tiger", "pig")]: {
    love: "A warm, affectionate match. Pig's easygoing nature soothes Tiger's intensity, while Tiger's passion brings excitement to Pig's life. Both are generous and value deep emotional connection.",
    career: "Excellent creative synergy. Tiger leads boldly while Pig provides the supportive infrastructure. Tiger's vision combined with Pig's persistence creates sustainable success.",
    friendship: "A lighthearted yet deep friendship. They enjoy life's pleasures together — good food, adventure, and conversation. Pig's patience tempers Tiger's impulsiveness.",
    challenges: "Tiger's dominance may overwhelm easygoing Pig. Pig's love of comfort may frustrate ambitious Tiger. Financial habits differ — Tiger spends boldly, Pig indulges.",
    advice: "Tiger should appreciate Pig's steady support rather than push for more. Pig should gently assert needs instead of always yielding. Find shared goals to channel both energies.",
  },
  [pk("rabbit", "dog")]: {
    love: "A peaceful, harmonious match built on trust and shared values. Rabbit's diplomacy and Dog's loyalty create a safe, nurturing bond. Both value home and family above all.",
    career: "Excellent teamwork in service-oriented fields. Rabbit's social grace opens doors while Dog's integrity builds lasting trust. They excel in counseling, education, and community work.",
    friendship: "A calm, enduring friendship. They share deep conversations and quiet companionship. Dog protects Rabbit; Rabbit soothes Dog's anxieties. Neither seeks drama.",
    challenges: "Both can be worriers — Rabbit over-decides, Dog over-thinks. Rabbit's social butterfly nature may trigger Dog's insecurity. Dog's blunt honesty can hurt sensitive Rabbit.",
    advice: "Communicate openly about insecurities. Rabbit should reassure Dog of their loyalty. Dog should soften criticism with kindness. Build routines that create stability for both.",
  },
  [pk("dragon", "rooster")]: {
    love: "A dazzling power couple. Dragon's charisma and Rooster's precision create an unstoppable team. Both are ambitious, proud, and driven — they inspire each other to reach higher.",
    career: "A dream business partnership. Dragon provides bold vision and Rooster executes with meticulous detail. Rooster keeps Dragon grounded; Dragon pushes Rooster to think bigger.",
    friendship: "A mutually admiring friendship. Rooster respects Dragon's confidence; Dragon values Rooster's sharp mind. They challenge each other intellectually and push each other to improve.",
    challenges: "Egos can clash — both want to be right. Dragon's grandiosity may annoy detail-oriented Rooster. Rooster's criticism can wound Dragon's pride. Neither backs down easily.",
    advice: "Learn to share the spotlight. Dragon should listen to Rooster's practical advice. Rooster should praise Dragon's vision before offering critique. Celebrate each other's strengths.",
  },
  [pk("snake", "monkey")]: {
    love: "A magnetic, intellectually stimulating match. Snake's wisdom and mystery captivate clever Monkey. Both are sharp, strategic, and deeply intuitive. They finish each other's sentences.",
    career: "A brilliant strategic alliance. Snake sees long-term patterns while Monkey navigates short-term opportunities. Together they can outmaneuver any competition.",
    friendship: "A fun, witty friendship full of banter and inside jokes. They share a love of puzzles, strategy games, and deep conversations. They never bore each other.",
    challenges: "Both can be manipulative — their fights can turn into chess matches. Snake's possessiveness may clash with Monkey's flirtatious nature. Trust issues can arise if either plays games.",
    advice: "Be direct about feelings instead of playing mind games. Snake should give Monkey space to socialize. Monkey should be sensitive to Snake's need for depth and loyalty.",
  },
  [pk("horse", "goat")]: {
    love: "A tender, romantic match. Horse's freedom-loving spirit is gently anchored by Goat's nurturing care. Goat admires Horse's passion; Horse cherishes Goat's artistic soul. A complementary bond.",
    career: "Creative partnerships flourish — Horse brings energy and outreach while Goat brings artistry and attention to detail. They excel in design, entertainment, and hospitality.",
    friendship: "A nurturing friendship where Goat provides emotional support and Horse brings adventure. Horse encourages Goat to explore; Goat helps Horse slow down and appreciate beauty.",
    challenges: "Horse's need for freedom can make security-seeking Goat anxious. Goat's moodiness may confuse straightforward Horse. Financial styles differ — Horse spends, Goat saves.",
    advice: "Horse should check in regularly to reassure Goat. Goat should embrace spontaneity rather than cling to routine. Create a shared vision that balances adventure with security.",
  },

  // ===== TRIAD HARMONY PAIRS =====
  [pk("rat", "dragon")]: {
    love: "A dynamic, ambitious match. Rat's charm and Dragon's magnetism create electric chemistry. Both are ambitious and driven — they build an exciting life together, always reaching for more.",
    career: "A powerhouse business duo. Dragon's bold leadership combined with Rat's strategic cunning can conquer any market. Rat handles details while Dragon commands the big stage.",
    friendship: "A stimulating friendship where both challenge and inspire each other. They share grand dreams and schemes. Neither is boring — their conversations range from philosophy to business.",
    challenges: "Dragon's ego may overwhelm Rat, who prefers subtle influence. Rat's pragmatism may seem timid to bold Dragon. Both can be competitive rather than collaborative.",
    advice: "Rat should appreciate Dragon's vision without being overshadowed. Dragon should value Rat's strategic mind. Share credit and celebrate wins together.",
  },
  [pk("rat", "monkey")]: {
    love: "A playful, intellectually charged romance. Both are clever, social, and endlessly curious. They keep each other entertained for life. Their banter is legendary among friends.",
    career: "Innovation central. Rat's resourcefulness plus Monkey's creativity equals groundbreaking ideas. They excel in startups, tech, media, and any field that rewards clever thinking.",
    friendship: "The ultimate partners in crime. They share a mischievous sense of humor and love of adventure. Every outing becomes a story. They bring out each other's playful side.",
    challenges: "Both can be too clever for their own good — they may scheme rather than communicate directly. Monkey's restlessness may test Rat's patience. Neither likes being outsmarted.",
    advice: "Keep things honest and direct. Channel your combined cleverness toward shared goals rather than competing. Make time for adventure together — that's where you thrive.",
  },
  [pk("ox", "snake")]: {
    love: "A quiet, deep, and enduring love. Ox provides the stable foundation Snake craves; Snake brings wisdom and passion that melts Ox's reserve. Trust builds slowly but unbreakably.",
    career: "A methodical, strategic partnership. Ox's steady execution combined with Snake's deep insight creates unstoppable momentum. They excel in finance, research, and law.",
    friendship: "A thoughtful, meaningful friendship. They enjoy quiet evenings with deep conversation more than wild parties. Each values loyalty above all — they'd move mountains for each other.",
    challenges: "Both are reserved — silence can become distance. Snake's secretiveness may frustrate straightforward Ox. Ox's stubbornness may exasperate strategic Snake.",
    advice: "Make time for heart-to-heart conversations. Ox should gently draw Snake out of their shell. Snake should appreciate Ox's directness rather than find it dull.",
  },
  [pk("ox", "rooster")]: {
    love: "A match made in practical heaven. Both value hard work, loyalty, and family. Rooster's polish and Ox's solidity create a relationship that looks good and feels secure.",
    career: "A precision partnership. Rooster's organizational genius and Ox's tireless work ethic create exceptional results. They thrive in structured environments like finance, law, and management.",
    friendship: "A reliable, no-drama friendship. They share similar values and hold each other to high standards. They tell each other hard truths with love and expect the best.",
    challenges: "Both can be overly critical — of themselves and each other. Ox's stubbornness meets Rooster's perfectionism. Neither is naturally flexible or quick to apologize.",
    advice: "Learn to let small things go. Ox should appreciate Rooster's high standards; Rooster should value Ox's steady loyalty. Celebrate progress, not just perfection.",
  },
  [pk("tiger", "horse")]: {
    love: "A firecracker romance — passionate, adventurous, and never dull. Both love freedom, excitement, and living life to the fullest. They travel, explore, and grow together at lightning speed.",
    career: "A dynamic, action-oriented team. Tiger's bold initiatives and Horse's tireless energy make things happen fast. They excel in sales, entrepreneurship, entertainment, and sports.",
    friendship: "Best friends who are always up for an adventure. Whether it's a road trip or a new hobby, they dive in together. They push each other to be braver and live bigger.",
    challenges: "Two independent spirits may struggle to commit. Neither likes being tied down. Both can be impulsive — financially and emotionally. Their intensity can lead to explosive arguments.",
    advice: "Give each other plenty of freedom within a framework of trust. Channel your combined fire into shared projects. When arguments flare, take a breather rather than fueling the fire.",
  },
  [pk("tiger", "dog")]: {
    love: "A loyal, protective match built on mutual respect. Tiger's courage and Dog's devotion create a bond that faces any challenge together. They'd go to battle for each other.",
    career: "A purpose-driven partnership. Both care about justice and doing good. Tiger leads the charge while Dog ensures ethical grounding. They excel in law, activism, and leadership.",
    friendship: "A ride-or-die friendship. Dog's loyalty matches Tiger's intensity. They have each other's backs unconditionally. Deep conversations about life, justice, and meaning come naturally.",
    challenges: "Both can be stubborn and opinionated. Tiger's dominance may clash with Dog's principled nature. Dog's pessimism can dampen Tiger's optimism if unchecked.",
    advice: "Fight side by side, not against each other. Tiger should listen to Dog's concerns. Dog should support Tiger's big dreams. United, you're unstoppable.",
  },
  [pk("horse", "dog")]: {
    love: "A warm, stable yet exciting match. Horse's zest for life is balanced by Dog's steady loyalty. They build a home filled with both adventure and security — the best of both worlds.",
    career: "A balanced partnership. Horse's energy drives projects forward while Dog's integrity maintains quality. They work well in community service, sports, and team-oriented environments.",
    friendship: "A natural, easy friendship. They enjoy outdoor activities and shared causes. Dog's groundedness keeps Horse from burning out; Horse's optimism lifts Dog's spirits.",
    challenges: "Dog's anxiety can frustrate carefree Horse. Horse's restlessness can worry security-seeking Dog. Communication styles — Horse glosses over, Dog dwells on problems.",
    advice: "Horse should be patient with Dog's need for reassurance. Dog should trust Horse's commitment even when words are few. Build routines that give both freedom and stability.",
  },
  [pk("rabbit", "goat")]: {
    love: "A soft, romantic, deeply harmonious match. Both value peace, beauty, and emotional connection. They create a gentle, artistic home where feelings are honored and creativity flourishes.",
    career: "A creative dream team. Rabbit's diplomacy and Goat's artistic talent shine in design, arts, counseling, and hospitality. They create beauty and harmony wherever they work.",
    friendship: "A tender, nurturing friendship. They're each other's safe space — no judgment, only understanding. They share art, music, and quiet evenings. True soul friends.",
    challenges: "Both avoid conflict — issues get swept under the rug. Neither is naturally assertive. They can enable each other's indecisiveness. Financial disorganization may be an issue.",
    advice: "Practice having difficult conversations early. One of you needs to take the lead on decisions. Create a shared budget. Your gentleness is a strength — but don't let it become avoidance.",
  },
  [pk("rabbit", "pig")]: {
    love: "A cozy, affectionate match. Both enjoy life's comforts — good food, beautiful spaces, and loving companionship. Rabbit's grace and Pig's warmth create a truly nurturing home.",
    career: "A pleasant, productive partnership. Rabbit's social skills and Pig's diligence create a harmonious work environment. They excel in hospitality, education, and creative industries.",
    friendship: "A warm, indulgent friendship. They love cooking together, sharing meals, and enjoying life's simple pleasures. They never judge each other and provide genuine comfort.",
    challenges: "Both can be too comfortable — they may lack ambition or urgency. Rabbit's social demands may exhaust home-loving Pig. Both can overindulge in food and spending.",
    advice: "Set gentle goals together to avoid stagnation. Rabbit should include Pig in social plans. Pig should support Rabbit's social needs. Balance indulgence with healthy habits.",
  },
  [pk("goat", "pig")]: {
    love: "A sweet, gentle, deeply compatible romance. Both are soft-hearted, romantic, and family-oriented. They create a warm, artistic home where love and kindness are the foundation.",
    career: "A harmonious creative partnership. Goat's artistic vision and Pig's persistence create beautiful results. They thrive in art, design, music, and charitable organizations.",
    friendship: "The kind of friendship where you can sit in comfortable silence. They share a love of beauty, nature, and simple joys. Deeply empathetic and supportive of each other.",
    challenges: "Both can be overly sensitive — they may not handle criticism well. Neither is naturally disciplined with money or time. Indecision can stall important decisions.",
    advice: "Encourage each other's dreams with practical support. One of you handle finances while the other handles creative direction. Build structures that support your gentle natures.",
  },

  // ===== SIX CLASH PAIRS (most challenging) =====
  [pk("rat", "horse")]: {
    love: "A challenging but potentially growth-inducing match. Rat's caution and Horse's impulsiveness are fundamentally different. Attraction is intense but sustaining it requires extraordinary effort.",
    career: "Opposite approaches create friction. Rat plans meticulously while Horse charges ahead. Unless they divide responsibilities clearly, their working styles clash constantly.",
    friendship: "An unlikely friendship that either fizzles or becomes transformative. They see the world so differently that they either fascinate or frustrate each other.",
    challenges: "Fundamental incompatibility in pace and approach. Rat wants security, Horse wants freedom. Rat is detail-oriented, Horse is big-picture. Communication is an uphill battle.",
    advice: "This relationship requires exceptional patience and compromise. Find neutral ground in shared interests. Rat should loosen up; Horse should slow down. Not for the faint of heart.",
  },
  [pk("ox", "goat")]: {
    love: "A difficult match where core values diverge. Ox values structure and hard work; Goat values art and leisure. They can complement each other if they respect their differences.",
    career: "Working together is a struggle. Ox wants routine and efficiency; Goat wants creativity and flexibility. Finding common ground requires clear role separation.",
    friendship: "A challenging friendship. Ox's directness hurts sensitive Goat. Goat's emotional needs try Ox's patience. But they can learn from each other if both are willing.",
    challenges: "Ox sees Goat as impractical; Goat sees Ox as cold. Communication is the biggest hurdle — Ox is blunt, Goat is indirect. Priorities around work vs. pleasure diverge.",
    advice: "Respect your differences rather than trying to change each other. Ox should soften their approach; Goat should develop thicker skin. Find shared activities that bridge your worlds.",
  },
  [pk("tiger", "monkey")]: {
    love: "A high-drama match that's either explosive or electric. Tiger's directness confronts Monkey's cleverness. Both are strong-willed and competitive — power struggles are common.",
    career: "Intense competition rather than cooperation. Tiger forges ahead while Monkey navigates around. They may undermine each other rather than collaborate unless given separate domains.",
    friendship: "A love-hate dynamic. They're drawn to each other's wit and charisma but constantly spar. The friendship is exciting but exhausting. Trust is a recurring issue.",
    challenges: "Tiger's straightforward nature clashes with Monkey's indirect games. Both want to be in control. Tiger's temper meets Monkey's tricks — an explosive combination.",
    advice: "Radical honesty is essential. Tiger needs to be direct without dominating. Monkey needs to drop the games. Establish clear boundaries and respect each other's strengths.",
  },
  [pk("rabbit", "rooster")]: {
    love: "A challenging mismatch of temperaments. Rabbit craves peace and harmony; Rooster values precision and directness. Rooster's criticism wounds Rabbit; Rabbit's evasion frustrates Rooster.",
    career: "Diametrically opposed working styles. Rabbit's diplomacy clashes with Rooster's blunt efficiency. Rabbit prefers consensus; Rooster prefers direct orders. Conflict is frequent.",
    friendship: "An awkward fit. Rooster's sarcasm doesn't land well with sensitive Rabbit. Rabbit's indirectness drives practical Rooster crazy. Finding common ground takes real effort.",
    challenges: "Communication is the core issue. Rooster speaks their mind; Rabbit avoids conflict. Rooster sees Rabbit as evasive; Rabbit sees Rooster as cruel. Daily friction is likely.",
    advice: "Both need to stretch beyond their comfort zones. Rabbit must learn to address issues directly. Rooster must learn the art of gentle feedback. Meet in the middle or not at all.",
  },
  [pk("dragon", "dog")]: {
    love: "A clash of worldviews. Dragon's grand ambitions meet Dog's grounded skepticism. Dragon finds Dog pessimistic; Dog finds Dragon arrogant. Respect is possible but romance is rocky.",
    career: "Fundamental disagreement on approach. Dragon takes bold risks while Dog advocates caution. Dog questions Dragon's plans; Dragon dismisses Dog's concerns. Trust is hard to build.",
    friendship: "An uneasy dynamic. Dog's loyalty is to principles rather than personas, which means Dog won't blindly support Dragon. Dragon sees Dog as a killjoy; Dog sees Dragon as egotistical.",
    challenges: "Dragon's self-confidence reads as arrogance to Dog. Dog's questioning reads as disloyalty to Dragon. They trigger each other's insecurities. Power struggles are common.",
    advice: "Dragon needs to earn Dog's trust through consistent integrity rather than grand gestures. Dog needs to support Dragon's vision once convinced. Find shared principles to unite around.",
  },
  [pk("snake", "pig")]: {
    love: "A deeply challenging match of opposites. Snake is intense and penetrating; Pig is easygoing and pleasure-seeking. Snake's depth overwhelms Pig; Pig's simplicity bores Snake.",
    career: "Different priorities make collaboration difficult. Snake strategizes long-term while Pig focuses on present enjoyment. Snake's intensity can be draining for Pig.",
    friendship: "An unlikely connection. Snake craves deep conversation; Pig prefers lighthearted fun. Snake's secretiveness troubles openhearted Pig. They struggle to find common wavelength.",
    challenges: "Snake sees Pig as naive; Pig sees Snake as paranoid. Emotional depth mismatch — Snake wants to analyze everything, Pig wants to enjoy life. Trust is hard to establish.",
    advice: "Snake should appreciate Pig's genuine warmth rather than dismiss it. Pig should try to engage with Snake's depth. If you can bridge this gap, you'll both grow immensely.",
  },

  // ===== NEUTRAL PAIRS (varied compatibility) =====
  [pk("rat", "tiger")]: {
    love: "An exciting but cautious match. Rat's strategic mind meets Tiger's bold heart. They can build something great if Rat plans and Tiger leads. Mutual admiration is possible.",
    career: "Complementary if roles are clear. Tiger provides the vision and courage; Rat provides the strategy and caution. Tiger pushes, Rat plans — a balanced team.",
    friendship: "A dynamic friendship where Rat admires Tiger's bravery and Tiger values Rat's cleverness. They enjoy different things but respect each other's strengths.",
    challenges: "Rat's risk-aversion frustrates bold Tiger. Tiger's impulsiveness terrifies cautious Rat. Pace of life and decision-making styles differ significantly.",
    advice: "Define clear roles — Tiger leads bold initiatives while Rat manages the details. Tiger should consult Rat before charging ahead. Rat should support Tiger's vision.",
  },
  [pk("rat", "rabbit")]: {
    love: "A gentle, polite match. Rat's charm and Rabbit's grace create pleasant chemistry. Both are social and enjoy the finer things. Passion may be moderate but comfort is high.",
    career: "Good teamwork in social and creative fields. Rat's networking and Rabbit's diplomacy open doors. They work well in client-facing roles and collaborative environments.",
    friendship: "A pleasant, low-drama friendship. They enjoy social gatherings, cultural events, and good conversation. Neither is confrontational, so conflicts are rare.",
    challenges: "Rat's intensity may unsettle peace-loving Rabbit. Rabbit's indirectness may frustrate direct Rat. Rat's occasional opportunism may conflict with Rabbit's ethics.",
    advice: "Rat should moderate their intensity around Rabbit. Rabbit should communicate concerns openly rather than avoiding. Find shared social activities to bond over.",
  },
  [pk("rat", "snake")]: {
    love: "An intellectually intense match. Both are shrewd, strategic, and perceptive. They understand each other's minds deeply. Chemistry is either magnetic or warily cautious.",
    career: "A strategic powerhouse. Rat's resourcefulness and Snake's deep insight create formidable planning. They excel in finance, research, and competitive industries.",
    friendship: "A fascinating friendship of mutual observation. They read each other well and enjoy deep conversation. Both appreciate wit and intelligence. Trust builds slowly.",
    challenges: "Both can be calculating — neither shows their full hand. Snake's intensity may feel heavy to social Rat. Rat's restlessness may unsettle Snake's need for depth.",
    advice: "Build trust through transparency — both tend to hold back. Rat should honor Snake's need for meaningful connection. Snake should appreciate Rat's social energy.",
  },
  [pk("rat", "goat")]: {
    love: "A caring but mismatched-paced romance. Rat's quick energy and Goat's gentle nature can complement if they're patient. Rat provides practical support; Goat provides emotional warmth.",
    career: "Moderate compatibility. Rat's strategic thinking and Goat's creativity can work well in creative industries. Rat handles business, Goat handles artistry.",
    friendship: "A kind but not deeply connected friendship. They appreciate each other's good qualities but may not have much in common. Pleasant but not profound.",
    challenges: "Rat's pragmatism can feel cold to emotional Goat. Goat's indecisiveness frustrates efficient Rat. Their pace of life and priorities differ significantly.",
    advice: "Rat should be gentle with Goat's sensitive heart. Goat should respect Rat's practical nature. Find balance between efficiency and emotional connection.",
  },
  [pk("rat", "rooster")]: {
    love: "A practical, orderly match. Both are sharp and observant. Rat's charm balances Rooster's critical edge. They can build a stable, prosperous life together with mutual respect.",
    career: "A detail-oriented dream team. Rat sees opportunities; Rooster ensures quality. They excel in business, finance, and any field requiring both strategy and precision.",
    friendship: "A mutually beneficial friendship. They respect each other's intelligence and drive. Conversations are stimulating. They help each other improve and succeed.",
    challenges: "Rooster's criticism stings sensitive Rat. Rat's flexibility may seem like slipperiness to principled Rooster. Both can be competitive rather than collaborative.",
    advice: "Rooster should offer praise before critique. Rat should appreciate Rooster's high standards. Focus on shared goals and celebrate each other's contributions.",
  },
  [pk("rat", "dog")]: {
    love: "A loyal if cautious match. Rat's warmth and Dog's devotion create a caring bond. Both value loyalty once trust is built. Rat brings fun; Dog brings depth.",
    career: "Balanced partnership. Rat's networking skills and Dog's integrity make a trustworthy team. They work well in service, nonprofit, and community-oriented fields.",
    friendship: "A warm, loyal friendship. Dog's unwavering support gives Rat security. Rat's cheerfulness lifts Dog's spirits. They may not have the deepest connection but enjoy each other.",
    challenges: "Rat's opportunism may trouble principled Dog. Dog's anxiety can exhaust social Rat. Dog's directness may clash with Rat's subtle approach.",
    advice: "Rat should be transparent about intentions. Dog should trust Rat's good nature. Find common values to build your connection on — loyalty is a shared strength.",
  },
  [pk("rat", "pig")]: {
    love: "A fun, affectionate match. Both enjoy life's pleasures and socializing. Rat's wit and Pig's warmth create a jovial, comfortable romance. Not deeply intense but genuinely pleasant.",
    career: "Good teamwork where Rat handles strategy and Pig handles execution. Rat's ideas plus Pig's persistence create steady progress. Strong in hospitality and creative fields.",
    friendship: "An easy, enjoyable friendship. They share a love of good food, good company, and good times. Neither is judgmental. A comfortable, low-pressure bond.",
    challenges: "Rat's ambition may exceed Pig's easygoing nature. Pig's indulgence may clash with Rat's financial caution. Rat may manipulate generous Pig if not careful.",
    advice: "Rat should appreciate Pig's generosity without taking advantage. Pig should support Rat's goals without losing their own peace. Build financial plans together.",
  },

  // Tiger neutral pairs (excluding tiger-rat done, tiger-monkey clash, tiger-pig harmony, tiger-horse triad, tiger-dog triad)
  [pk("tiger", "rabbit")]: {
    love: "A complementary match where Tiger's boldness meets Rabbit's grace. Tiger protects; Rabbit soothes. Tiger brings excitement to Rabbit's peaceful world. Good balance if egos don't interfere.",
    career: "Decent teamwork. Tiger's leadership and Rabbit's diplomacy create a balanced approach. Tiger drives, Rabbit smoothes relationships. Effective in client-facing and creative fields.",
    friendship: "An enjoyable dynamic. Tiger's adventurous spirit draws Rabbit out of their shell. Rabbit helps Tiger slow down and appreciate life's finer moments. They balance each other.",
    challenges: "Tiger's directness can overwhelm sensitive Rabbit. Rabbit's indirectness frustrates straightforward Tiger. Tiger wants action; Rabbit wants harmony.",
    advice: "Tiger should soften their approach with Rabbit. Rabbit should be direct about needs. Appreciate your differences — Tiger brings adventure, Rabbit brings peace.",
  },
  [pk("tiger", "snake")]: {
    love: "An intense, challenging attraction. Tiger's bold frontal approach meets Snake's subtle strategy. Passion can be powerful but trust is difficult. Both are strong-willed.",
    career: "Difficult synergy. Tiger wants to charge ahead; Snake wants to plan and observe. Tiger's transparency clashes with Snake's secrecy. Clear role separation is essential.",
    friendship: "A complex dynamic. Tiger finds Snake mysterious; Snake finds Tiger fascinating but exhausting. They intrigue each other but may never fully trust each other.",
    challenges: "Tiger's directness threatens secretive Snake. Snake's manipulation triggers Tiger's temper. Both are proud and neither backs down easily.",
    advice: "Radical honesty is the only path. Tiger needs to curb their temper; Snake needs to drop the games. If you can build trust, you'll have a powerful bond.",
  },
  [pk("tiger", "goat")]: {
    love: "A tender but challenging match. Tiger's intensity can overwhelm gentle Goat. Goat's sensitivity may frustrate direct Tiger. With care, Tiger can protect and Goat can nurture.",
    career: "Mixed synergy. Tiger's drive and Goat's creativity can work in artistic fields if Tiger doesn't bulldoze Goat's process. Goat needs encouragement, not pressure.",
    friendship: "A caring but imbalanced friendship. Tiger naturally leads; Goat follows. Tiger's boldness can either inspire or intimidate Goat. Gentle patience is required.",
    challenges: "Tiger's bluntness wounds sensitive Goat. Goat's indecisiveness tries Tiger's patience. Tiger goes fast; Goat goes slow. Emotional needs are very different.",
    advice: "Tiger must be exceptionally gentle with Goat's feelings. Goat should stand their ground rather than always yielding. Patience and softness are the keys.",
  },
  [pk("tiger", "rooster")]: {
    love: "A loud, clashing match. Both are proud and outspoken. Tiger roars; Rooster crows. Neither naturally defers. Passion exists but so do power struggles. Not an easy fit.",
    career: "Competitive rather than cooperative. Both want to lead. Tiger's big-picture approach conflicts with Rooster's detail focus. Respect is possible but collaboration is hard.",
    friendship: "A sparring partnership. They enjoy debating and challenging each other. Respect is earned through strength. Neither is sensitive, so conflicts are honest if loud.",
    challenges: "Both need to be right. Tiger's dominance challenges Rooster's pride. Rooster's criticism wounds Tiger's ego. Neither is naturally compromising.",
    advice: "Learn to take turns leading. Tiger should respect Rooster's expertise; Rooster should honor Tiger's vision. Channel competitive energy toward shared external goals.",
  },

  // Rabbit neutral pairs (excluding rabbit-rat done, rabbit-tiger done, rabbit-dog harmony, rabbit-rooster clash, rabbit-goat triad, rabbit-pig triad)
  [pk("rabbit", "snake")]: {
    love: "A calm, sophisticated match. Both appreciate beauty, peace, and intellectual conversation. Rabbit's social grace complements Snake's depth. A refined, harmonious pairing.",
    career: "Smooth collaboration in thoughtful fields. Rabbit's diplomacy and Snake's strategic insight create excellent results in counseling, design, and research.",
    friendship: "A quiet, meaningful friendship. They enjoy deep conversations and shared cultural interests. Both value privacy. A low-drama, high-trust connection.",
    challenges: "Snake's intensity may be too much for lighthearted Rabbit. Rabbit's social butterfly nature may seem frivolous to deep Snake. Both avoid direct confrontation.",
    advice: "Rabbit should engage with Snake's depth. Snake should appreciate Rabbit's social gifts. Don't let conflict avoidance let issues fester — communicate gently but honestly.",
  },
  [pk("rabbit", "horse")]: {
    love: "A pleasant but mismatched romance. Rabbit wants peace and home; Horse wants adventure and freedom. Attraction exists but sustaining it requires bridging different worlds.",
    career: "Moderate synergy. Rabbit's relationship skills and Horse's energy work in customer-facing roles. But Horse's pace may overwhelm Rabbit's methodical approach.",
    friendship: "A friendly but not deep connection. They enjoy each other's company in groups but may not seek each other out one-on-one. Different priorities and rhythms.",
    challenges: "Horse's restlessness unsettles security-loving Rabbit. Rabbit's need for routine bores freedom-loving Horse. Pace of life is fundamentally different.",
    advice: "Rabbit should embrace some spontaneity. Horse should appreciate the value of quiet home time. Compromise on schedule — active adventures PLUS cozy evenings.",
  },
  [pk("rabbit", "monkey")]: {
    love: "A playful but uneasy match. Monkey's cleverness entertains Rabbit, but Monkey's restlessness worries Rabbit. Rabbit's need for stability conflicts with Monkey's love of variety.",
    career: "Mixed results. Monkey's innovation and Rabbit's diplomacy can work if Monkey doesn't disrupt Rabbit's systems. Good in creative and media fields with clear roles.",
    friendship: "An entertaining but not deeply bonded friendship. Monkey brings fun and games; Rabbit brings charm. They enjoy each other in doses but may not be soulmates.",
    challenges: "Monkey's mischief can cross Rabbit's ethical lines. Rabbit's routine bores Monkey. Monkey's flirtatiousness may trouble Rabbit. Different values around commitment.",
    advice: "Monkey should respect Rabbit's boundaries. Rabbit should loosen up and enjoy Monkey's humor. Don't expect each other to change core nature — appreciate the variety.",
  },

  // Dragon neutral pairs (excluding dragon-rat triad, dragon-rooster harmony, dragon-dog clash, dragon-monkey triad)
  [pk("dragon", "tiger")]: {
    love: "An explosive, powerful match. Two alpha personalities create fireworks. Passion is intense, but so are power struggles. They either build an empire together or burn out.",
    career: "Powerhouse potential if egos align. Both are natural leaders. Dragon's vision plus Tiger's courage can conquer anything. The challenge: who leads?",
    friendship: "A dynamic, competitive friendship. They respect strength and push each other to excel. They may compete more than cooperate. Neither accepts weakness.",
    challenges: "Both want to be in charge. Dragon's grandiosity may annoy practical Tiger. Tiger's directness may bruise Dragon's pride. Neither backs down.",
    advice: "Check egos at the door. Define separate domains of leadership. Celebrate each other's wins rather than competing. Together you're a force of nature.",
  },
  [pk("dragon", "rabbit")]: {
    love: "A challenging balance. Dragon's boldness and Rabbit's gentleness are opposites. Dragon may overwhelm Rabbit; Rabbit may bore Dragon. Respect is possible but romance is work.",
    career: "Complementary if roles are clear. Dragon leads; Rabbit maintains harmony. Dragon's vision needs Rabbit's diplomatic execution. Works in creative and service industries.",
    friendship: "An unlikely but potentially rewarding friendship. Dragon brings excitement; Rabbit brings peace. They learn from each other's different approaches to life.",
    challenges: "Dragon's intensity frightens peace-loving Rabbit. Rabbit's indirectness frustrates direct Dragon. Social needs differ — Dragon wants grand events, Rabbit wants intimate gatherings.",
    advice: "Dragon must temper their intensity around Rabbit. Rabbit should be direct about needs. Appreciate your differences as strengths rather than flaws.",
  },
  [pk("dragon", "snake")]: {
    love: "A magnetic, intense match of wit and charisma. Dragon's brilliance and Snake's wisdom create a captivating pair. Both are powerful in their own ways — chemistry is strong.",
    career: "A formidable strategic alliance. Dragon's grand vision combined with Snake's deep insight can dominate any field. Dragon leads publicly; Snake advises behind the scenes.",
    friendship: "A fascinating connection of mutual respect. Snake appreciates Dragon's power; Dragon values Snake's wisdom. Deep conversations and shared ambitions bond them.",
    challenges: "Dragon's ego may dismiss Snake's subtle counsel. Snake's possessiveness may clash with Dragon's need for admiration. Both can be manipulative.",
    advice: "Dragon should listen to Snake's wisdom. Snake should support Dragon's vision without trying to control it. Trust and respect are your foundation.",
  },
  [pk("dragon", "goat")]: {
    love: "A difficult but growth-oriented match. Dragon's grand ambitions confuse gentle Goat. Goat's emotional needs try Dragon's patience. Attraction exists but sustaining it is hard work.",
    career: "Poor natural synergy. Dragon wants rapid growth; Goat wants steady creativity. Dragon's intensity overwhelms Goat. Separate career paths are advisable.",
    friendship: "A kind but mismatched friendship. Goat admires Dragon's confidence. Dragon appreciates Goat's gentleness. But they have little in common and different social needs.",
    challenges: "Dragon's bluntness wounds sensitive Goat. Goat's indecisiveness frustrates direct Dragon. Life goals and pace are fundamentally different.",
    advice: "Dragon must be exceptionally gentle with Goat. Goat should develop more assertiveness. This relationship requires more patience and understanding than most.",
  },
  [pk("dragon", "pig")]: {
    love: "A warm but mismatched romance. Dragon's ambition and Pig's easygoing nature are very different. Pig's warmth softens Dragon; Dragon's drive can exhaust Pig.",
    career: "Moderate synergy. Dragon leads; Pig supports. Pig's diligence executes Dragon's vision. But Dragon's intensity may drain Pig's energy over time.",
    friendship: "A pleasant but not deeply connected friendship. They enjoy each other's company but may not share core interests. Dragon's grand plans don't interest simple-pleasures Pig.",
    challenges: "Dragon sees Pig as unmotivated; Pig sees Dragon as never satisfied. Social energy differs greatly. Dragon's criticism hurts sensitive Pig.",
    advice: "Dragon should appreciate Pig's steady warmth rather than push for more. Pig should support Dragon's dreams without getting overwhelmed. Find joy in your differences.",
  },

  // Snake neutral pairs (excluding snake-ox triad, snake-rooster triad, snake-monkey harmony, snake-pig clash, snake-dragon neutral done, snake-rabbit neutral done, snake-tiger neutral done)
  [pk("snake", "horse")]: {
    love: "A challenging attraction of fire and water. Snake's depth and Horse's freedom-seeking nature pull in opposite directions. Intense but hard to sustain long-term.",
    career: "Difficult synergy. Snake strategizes patiently; Horse wants immediate action. Snake's caution frustrates Horse; Horse's impulsiveness alarms Snake.",
    friendship: "An intriguing but uneasy friendship. Snake fascinates Horse with wisdom; Horse entertains Snake with stories. But their rhythms are fundamentally different.",
    challenges: "Snake's need for depth exhausts lighthearted Horse. Horse's restlessness triggers Snake's insecurity. Trust is hard to build — Snake holds back, Horse runs free.",
    advice: "Snake needs to give Horse freedom. Horse needs to offer Snake depth. Create space for both adventure and intimacy. A challenging but growth-filled pairing.",
  },
  [pk("snake", "goat")]: {
    love: "A complex emotional match. Snake's intensity and Goat's sensitivity create deep emotional waters. Both are creative and intuitive but need careful communication.",
    career: "Good synergy in creative fields. Snake's strategic depth and Goat's artistic talent produce meaningful work. Snake directs; Goat creates. Works in arts and design.",
    friendship: "A deep, empathetic friendship. Both are intuitive and understand unspoken feelings. They share a love of art, beauty, and meaningful conversation. A soulful connection.",
    challenges: "Snake's directness can wound sensitive Goat. Goat's moodiness may try Snake's patience. Both can be passive-aggressive rather than addressing issues directly.",
    advice: "Snake should handle Goat's heart with care. Goat should be direct about needs rather than hinting. Your shared intuition can make this a deeply understanding pair.",
  },

  // Horse neutral pairs (excluding horse-rat clash, horse-tiger triad, horse-dog triad, horse-goat harmony, horse-snake neutral done, horse-rabbit neutral done)
  [pk("horse", "monkey")]: {
    love: "A fun, lively match. Horse's energy and Monkey's wit create an entertaining, never-dull romance. Both love freedom and socializing. Commitment may be a challenge.",
    career: "Dynamic creative partnership. Horse's drive and Monkey's innovation spark great ideas. They move fast and adapt quickly. Excellent in startups, media, and sales.",
    friendship: "A blast of fun. They laugh, play, and explore together. Both are social and love new experiences. A friendship full of adventure and inside jokes.",
    challenges: "Two free spirits struggle with commitment. Horse's directness may clash with Monkey's indirectness. Neither is naturally grounded or organized.",
    advice: "If you want this to last, create gentle structures without feeling caged. Horse should appreciate Monkey's cleverness; Monkey should honor Horse's need for honesty.",
  },
  [pk("horse", "rooster")]: {
    love: "A lively but challenging match. Horse's free spirit clashes with Rooster's need for order. Both are hardworking but in very different ways. Attraction exists but daily life is work.",
    career: "Mixed results. Horse's big-picture energy and Rooster's detail focus can complement if roles are clear. Horse sells; Rooster delivers. Respect is possible.",
    friendship: "A respectful but not cozy friendship. They admire each other's work ethic but may not understand each other's motivations. Frank and honest interactions.",
    challenges: "Rooster's criticism stings sensitive Horse. Horse's messiness offends organized Rooster. Rooster's routine bores spontaneous Horse. Different standards of order.",
    advice: "Horse should respect Rooster's systems. Rooster should loosen up and let Horse be free. Divide responsibilities based on strengths rather than trying to match styles.",
  },
  [pk("horse", "pig")]: {
    love: "A warm, comfortable match. Horse's passion meets Pig's affection. Both enjoy life's pleasures. Horse brings adventure; Pig brings cozy comfort. A pleasant, balanced pairing.",
    career: "Good collaboration. Horse's energy drives projects; Pig's diligence maintains quality. They work well in hospitality, entertainment, and team environments.",
    friendship: "An easy, enjoyable friendship. They share a love of good food, socializing, and fun. Horse pushes Pig to try new things; Pig helps Horse relax.",
    challenges: "Horse's restlessness may exhaust home-loving Pig. Pig's indulgence may clash with Horse's financial impulses. Pace and priorities differ.",
    advice: "Horse should make time for quiet domesticity. Pig should join Horse on occasional adventures. Balance going out with staying in. Appreciate your complementary natures.",
  },

  // Goat neutral pairs (excluding goat-ox clash, goat-rabbit triad, goat-pig triad, goat-horse harmony, goat-snake neutral done, goat-dragon neutral done, goat-tiger neutral done, goat-rat neutral done)
  [pk("goat", "monkey")]: {
    love: "A playful, creative match. Goat's artistic soul and Monkey's wit create a fun, imaginative romance. Monkey makes Goat laugh; Goat softens Monkey's edge.",
    career: "Good creative synergy. Goat's artistic vision and Monkey's innovative ideas spark beautifully. They thrive in creative industries, design, and entertainment.",
    friendship: "An entertaining, lighthearted friendship. They enjoy creative projects, games, and social activities. Monkey brings out Goat's playful side; Goat brings out Monkey's gentleness.",
    challenges: "Monkey's mischief may cross Goat's sensitive boundaries. Goat's emotional needs may exhaust playful Monkey. Stability vs. variety is a recurring tension.",
    advice: "Monkey should handle Goat's heart with care. Goat should develop a sense of humor about Monkey's tricks. Build a creative life together that honors both your natures.",
  },
  [pk("goat", "rooster")]: {
    love: "A challenging but growth-oriented match. Rooster's critical nature wounds sensitive Goat. Goat's emotional needs frustrate practical Rooster. But they can learn from each other.",
    career: "Mixed results. Rooster's organization and Goat's creativity can work in design and arts. Rooster handles logistics; Goat handles aesthetics. Clear roles are essential.",
    friendship: "A difficult but potentially rewarding friendship. Rooster helps Goat develop structure; Goat helps Rooster access emotions. They grow through their differences.",
    challenges: "Rooster's bluntness devastates Goat. Goat's indirectness frustrates Rooster. Rooster wants efficiency; Goat wants emotional connection. Communication is the main hurdle.",
    advice: "Rooster must learn gentleness. Goat must develop a thicker skin. Appreciate what you teach each other — Rooster brings order, Goat brings heart.",
  },
  [pk("goat", "dog")]: {
    love: "A gentle, caring match. Goat's tenderness and Dog's loyalty create a nurturing bond. Both are devoted to home and family. A quiet, loving relationship.",
    career: "Good teamwork in helping professions. Dog's integrity and Goat's creativity work well in education, counseling, and community service. Both are motivated by purpose.",
    friendship: "A deeply loyal, supportive friendship. Dog protects Goat; Goat comforts Dog. They share values and trust each other completely. A safe harbor for both.",
    challenges: "Both are worriers — they can amplify each other's anxiety. Dog's bluntness can hurt Goat. Goat's indirectness frustrates Dog. Neither is naturally adventurous.",
    advice: "Encourage each other to face fears rather than enabling worry. Dog should soften their delivery; Goat should be more direct. Build a peaceful, loving life together.",
  },

  // Monkey neutral pairs (excluding monkey-rat triad, monkey-dragon triad, monkey-snake harmony, monkey-tiger clash, monkey-horse neutral done, monkey-goat neutral done, monkey-rabbit neutral done)
  [pk("monkey", "rooster")]: {
    love: "A lively, intelligent match. Both are sharp, witty, and communicative. Monkey's spontaneity and Rooster's precision can complement. A stimulating, entertaining romance.",
    career: "A strong strategic partnership. Monkey's innovative ideas and Rooster's meticulous execution create excellent results. They excel in business, media, and technology.",
    friendship: "A fun, intellectually stimulating friendship. They love debate, games, and witty banter. They push each other to improve and succeed. Mutual respect is strong.",
    challenges: "Monkey's flexibility may seem like unreliability to principled Rooster. Rooster's criticism may wound Monkey's pride. Both can be competitive.",
    advice: "Rooster should appreciate Monkey's creativity. Monkey should respect Rooster's standards. Channel your combined intelligence toward shared goals rather than competing.",
  },
  [pk("monkey", "dog")]: {
    love: "A challenging but interesting match. Monkey's cleverness meets Dog's loyalty. Monkey finds Dog too serious; Dog finds Monkey too flighty. Trust is the central issue.",
    career: "Mixed results. Monkey's adaptability and Dog's integrity can work if they respect each other's strengths. Good in fields needing both innovation and ethics.",
    friendship: "An uneasy but potentially rewarding friendship. Dog keeps Monkey grounded; Monkey helps Dog lighten up. They learn from each other's different virtues.",
    challenges: "Dog's suspicion clashes with Monkey's playful nature. Monkey's tricks offend Dog's principles. Dog sees Monkey as dishonest; Monkey sees Dog as rigid.",
    advice: "Monkey must earn Dog's trust through consistency. Dog should give Monkey the benefit of the doubt. Build on shared values rather than focusing on differences.",
  },
  [pk("monkey", "pig")]: {
    love: "A fun, easygoing match. Monkey's wit and Pig's warmth create a cheerful, affectionate romance. Both enjoy life's pleasures and don't take things too seriously.",
    career: "Good collaboration in creative and social fields. Monkey generates ideas; Pig executes with persistence. Strong in entertainment, hospitality, and creative industries.",
    friendship: "A lighthearted, enjoyable friendship. They laugh together, share meals, and enjoy social activities. Neither is judgmental. A comfortable, fun bond.",
    challenges: "Monkey's mischievousness may cross Pig's boundaries. Pig's indulgence may be enabled by Monkey's cleverness. Monkey's restlessness may hurt loyal Pig.",
    advice: "Monkey should be careful with Pig's trusting heart. Pig should enjoy Monkey's humor without being taken advantage of. Build fun, honest adventures together.",
  },

  // Rooster neutral pairs (excluding rooster-ox triad, rooster-snake triad, rooster-dragon harmony, rooster-rabbit clash, rooster-horse neutral done, rooster-goat neutral done, rooster-monkey neutral done, rooster-rat neutral done)
  [pk("rooster", "dog")]: {
    love: "A loyal but prickly match. Both are principled and dedicated. Rooster's criticism clashes with Dog's sensitivity. But both are deeply loyal once committed. Hard work but can last.",
    career: "Effective if roles are clear. Rooster's precision and Dog's integrity create quality work. Both are hardworking and reliable. Strong in law, medicine, and service.",
    friendship: "A respectful, honest friendship. They tell each other hard truths. No fluff, no games. They trust each other's word. A no-nonsense bond.",
    challenges: "Rooster's bluntness hurts anxious Dog. Dog's pessimism frustrates optimistic Rooster. Rooster wants perfection; Dog wants security. Different emotional needs.",
    advice: "Rooster should soften criticism with warmth. Dog should trust Rooster's good intentions. Focus on shared values — you both care deeply about doing the right thing.",
  },
  [pk("rooster", "pig")]: {
    love: "A challenging but complementary match. Rooster's precision and Pig's easygoing nature are opposites. Rooster organizes; Pig enjoys. With acceptance, they balance each other.",
    career: "Moderate synergy. Rooster's organizational skills and Pig's people skills can work in hospitality and service. Rooster manages; Pig serves with warmth.",
    friendship: "An unlikely but balanced friendship. Rooster helps Pig get organized; Pig helps Rooster relax. They appreciate each other's different gifts.",
    challenges: "Rooster's criticism wounds sensitive Pig. Pig's messiness offends neat Rooster. Rooster's schedule conflicts with Pig's go-with-the-flow style.",
    advice: "Rooster should appreciate Pig's warmth rather than criticizing their lack of order. Pig should make an effort to meet Rooster's standards. Balance structure with ease.",
  },

  // Dog neutral pairs (excluding dog-tiger triad, dog-horse triad, dog-rabbit harmony, dog-dragon clash, dog-goat neutral done, dog-monkey neutral done, dog-rooster neutral done, dog-rat neutral done, dog-pig triad)
  // Dog-pig is NOT a triad. Let me re-check: Triad groups are:
  // Group 1: Rat, Dragon, Monkey
  // Group 2: Ox, Snake, Rooster
  // Group 3: Tiger, Horse, Dog
  // Group 4: Rabbit, Goat, Pig
  // So Dog+Pig is NOT triad.
  [pk("dog", "pig")]: {
    love: "A warm, loyal match. Dog's devotion and Pig's affection create a loving home. Both value family and commitment. Dog protects; Pig nurtures. A solid pair.",
    career: "Good teamwork in service-oriented fields. Dog's integrity and Pig's diligence make a reliable team. Strong in healthcare, education, and community services.",
    friendship: "A loyal, comforting friendship. Dog stands up for Pig; Pig soothes Dog's worries. They trust each other completely. A steady, dependable bond.",
    challenges: "Dog's anxiety can bring down easygoing Pig. Pig's indulgence may concern principled Dog. Dog's bluntness may hurt sensitive Pig.",
    advice: "Dog should lean on Pig's optimism when anxiety strikes. Pig should respect Dog's principles. Build a stable, loving life focused on family and home.",
  },
};

export function getPairCompatibility(a: string, b: string): PairCompatibility {
  const key = pk(a, b);
  const { relationship, rating } = getRelationshipType(a, b);
  const specific = SPECIFIC_CONTENT[key];
  const an = ANIMAL_NAMES;
  const fallback = {
    love: `${an[a]} and ${an[b]} have a moderate connection. With mutual understanding and effort, they can build a comfortable relationship. Their different approaches to life can either complement or frustrate — the choice is theirs.`,
    career: `${an[a]} and ${an[b]} can work together effectively with clear role definition. Their different strengths can complement each other if they communicate well and respect each other's contributions.`,
    friendship: `${an[a]} and ${an[b]} can enjoy a pleasant friendship based on mutual respect. They may not be the closest of friends, but they can appreciate each other's positive qualities.`,
    challenges: `${an[a]} and ${an[b]} have different natural rhythms and priorities. Communication requires effort as their default styles differ. Patience and understanding are essential.`,
    advice: `Focus on your shared values rather than your differences. Communicate clearly and appreciate what each person brings to the relationship. Meet each other halfway.`,
  };

  const content = specific ?? fallback;
  return {
    pairKey: key,
    signs: [a, b],
    relationship,
    rating,
    ...content,
  };
}

export function getCompatibilitiesForSign(sign: string): PairCompatibility[] {
  return ANIMALS.filter((a) => a !== sign).map((other) => getPairCompatibility(sign, other));
}

export function getAllPairs(): PairCompatibility[] {
  const pairs: PairCompatibility[] = [];
  for (let i = 0; i < ANIMALS.length; i++) {
    for (let j = i + 1; j < ANIMALS.length; j++) {
      pairs.push(getPairCompatibility(ANIMALS[i], ANIMALS[j]));
    }
  }
  return pairs;
}

export function getSixHarmonies(): PairCompatibility[] {
  return SIX_HARMONY.map(([a, b]) => getPairCompatibility(a, b));
}

export function getTriadGroups(): { group: string[]; pairs: PairCompatibility[] }[] {
  return TRIAD_GROUPS.map((g) => ({
    group: g,
    pairs: [
      getPairCompatibility(g[0], g[1]),
      getPairCompatibility(g[0], g[2]),
      getPairCompatibility(g[1], g[2]),
    ],
  }));
}

export function getClashes(): PairCompatibility[] {
  return SIX_CLASH.map(([a, b]) => getPairCompatibility(a, b));
}

export function getRelationshipEmoji(rel: PairCompatibility["relationship"]): string {
  switch (rel) {
    case "six-harmony": return "💖";
    case "triad-harmony": return "💚";
    case "neutral": return "💛";
    case "clash": return "💔";
  }
}

export function getRelationshipLabel(rel: PairCompatibility["relationship"]): string {
  switch (rel) {
    case "six-harmony": return "Six Harmony";
    case "triad-harmony": return "Triad Harmony";
    case "neutral": return "Neutral";
    case "clash": return "Six Clash";
  }
}

export function ratingToStars(rating: number): string {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

export { ANIMAL_NAMES, ANIMALS };
