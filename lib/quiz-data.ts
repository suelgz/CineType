import { QuizQuestion } from "./types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question:
      "When a show ends and you feel genuinely empty inside — what caused that?",
    options: [
      {
        id: "q1a",
        text: "The characters felt like people I actually knew",
        tags: ["emotional", "comfort", "slowburn"],
      },
      {
        id: "q1b",
        text: "The world was so detailed I forgot ours existed",
        tags: ["aesthetic", "supernatural", "prestige"],
      },
      {
        id: "q1c",
        text: "I didn't want the tension to finally be over",
        tags: ["psychological", "chaos", "mystery"],
      },
      {
        id: "q1d",
        text: "The ending was emotionally devastating in the best way",
        tags: ["dark", "romance", "emotional"],
      },
    ],
  },
  {
    id: "q2",
    question:
      "You're 10 minutes in and you already know you're going to love it. What gave it away?",
    options: [
      {
        id: "q2a",
        text: "The atmosphere — the vibe was made for me",
        tags: ["aesthetic", "supernatural", "dark"],
      },
      {
        id: "q2b",
        text: "A character said something uncomfortably true",
        tags: ["psychological", "prestige", "villain"],
      },
      {
        id: "q2c",
        text: "The pacing was immediately sharp and I felt locked in",
        tags: ["fast_paced", "action", "mystery"],
      },
      {
        id: "q2d",
        text: "There was already dramatic tension I couldn't look away from",
        tags: ["chaos", "rich_drama", "romance"],
      },
    ],
  },
  {
    id: "q3",
    question: "Pick the sentence that most describes your ideal watch:",
    options: [
      {
        id: "q3a",
        text: "I want to feel safe in a world I'd never survive",
        tags: ["comfort", "supernatural", "cozy"],
      },
      {
        id: "q3b",
        text: "I want a story that makes me question everyone's motives",
        tags: ["psychological", "villain", "mystery"],
      },
      {
        id: "q3c",
        text: "I want to fall slightly in love with someone who is clearly a red flag",
        tags: ["romance", "dark", "villain"],
      },
      {
        id: "q3d",
        text: "I want to watch someone's life fall apart beautifully",
        tags: ["chaos", "rich_drama", "prestige"],
      },
    ],
  },
  {
    id: "q4",
    question: "A character does something genuinely awful. Your reaction?",
    options: [
      {
        id: "q4a",
        text: "I understand their logic even if I hate what they did",
        tags: ["villain", "psychological", "prestige"],
      },
      {
        id: "q4b",
        text: "I need them to face consequences — but I still want them to win",
        tags: ["chaos", "romance", "villain"],
      },
      {
        id: "q4c",
        text: "I immediately lose interest — I need someone to root for",
        tags: ["comfort", "cozy", "emotional"],
      },
      {
        id: "q4d",
        text: "I root for them to get worse before they get better",
        tags: ["dark", "female_rage", "chaos"],
      },
    ],
  },
  {
    id: "q5",
    question: "What do you usually hate in a movie or show?",
    options: [
      {
        id: "q5a",
        text: "Nothing happens for 40 minutes and the director thinks that's art",
        tags: ["fast_paced", "brain_off", "action"],
      },
      {
        id: "q5b",
        text: "The ending wraps everything up too neatly",
        tags: ["chaos", "psychological", "dark"],
      },
      {
        id: "q5c",
        text: "The love interest is the most boring person in the cast",
        tags: ["romance", "villain", "female_rage"],
      },
      {
        id: "q5d",
        text: "Trauma is used as decoration without real emotional payoff",
        tags: ["emotional", "prestige", "slowburn"],
      },
    ],
  },
  {
    id: "q6",
    question: "How long do you like your stories?",
    options: [
      {
        id: "q6a",
        text: "Six seasons and a movie — I want to commit",
        tags: ["slowburn", "comfort", "emotional"],
      },
      {
        id: "q6b",
        text: "Two or three tight seasons, then a graceful exit",
        tags: ["prestige", "mystery", "psychological"],
      },
      {
        id: "q6c",
        text: "One great season beats three mediocre ones",
        tags: ["prestige", "fast_paced", "chaos"],
      },
      {
        id: "q6d",
        text: "A 90-minute film with zero filler is the perfect unit",
        tags: ["fast_paced", "action", "brain_off"],
      },
    ],
  },
  {
    id: "q7",
    question: "What kind of antagonist actually fascinates you?",
    options: [
      {
        id: "q7a",
        text: "The one who's right about everything but goes too far",
        tags: ["villain", "psychological", "prestige"],
      },
      {
        id: "q7b",
        text: "The one who clearly enjoys it a little too much",
        tags: ["dark", "chaos", "villain"],
      },
      {
        id: "q7c",
        text: "The one who was the hero in a different story",
        tags: ["psychological", "romance", "slowburn"],
      },
      {
        id: "q7d",
        text: "I prefer moral complexity with no clear antagonist at all",
        tags: ["prestige", "emotional", "mystery"],
      },
    ],
  },
  {
    id: "q8",
    question: "What do you want to feel after finishing something great?",
    options: [
      {
        id: "q8a",
        text: "Emotionally wrecked but somehow grateful",
        tags: ["dark", "emotional", "romance"],
      },
      {
        id: "q8b",
        text: "Like I need to immediately tell someone about it",
        tags: ["chaos", "prestige", "psychological"],
      },
      {
        id: "q8c",
        text: "Cozy and satisfied, like a warm meal",
        tags: ["comfort", "cozy", "mystery"],
      },
      {
        id: "q8d",
        text: "Slightly unsettled, like something is still unresolved",
        tags: ["supernatural", "psychological", "dark"],
      },
    ],
  },
  {
    id: "q9",
    question: "Pick the watch scenario you're most likely to be in:",
    options: [
      {
        id: "q9a",
        text: "Alone, at midnight, emotionally available for damage",
        tags: ["dark", "romance", "emotional"],
      },
      {
        id: "q9b",
        text: "With someone who has taste — we pause constantly to discuss",
        tags: ["prestige", "psychological", "mystery"],
      },
      {
        id: "q9c",
        text: "Background-watching — engaging but not demanding",
        tags: ["brain_off", "comfort", "comedy"],
      },
      {
        id: "q9d",
        text: "Finally starting something I've been building up to for weeks",
        tags: ["slowburn", "prestige", "chaos"],
      },
    ],
  },
  {
    id: "q10",
    question: "Which of these sounds most like something you'd actually say?",
    options: [
      {
        id: "q10a",
        text: "\"I've defended a morally reprehensible character for 20 minutes and I stand by it\"",
        tags: ["villain", "psychological", "chaos"],
      },
      {
        id: "q10b",
        text: "\"I've cried at this scene six times and I'll do it again\"",
        tags: ["emotional", "romance", "slowburn"],
      },
      {
        id: "q10c",
        text: "\"I started watching this because of a TikTok edit and I'm not ashamed\"",
        tags: ["brain_off", "teen_drama", "fast_paced"],
      },
      {
        id: "q10d",
        text: "\"It's not for everyone. That's kind of the point.\"",
        tags: ["prestige", "aesthetic", "dark"],
      },
    ],
  },
];
