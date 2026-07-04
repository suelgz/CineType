"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import { QuizAnswer, QuizOption } from "@/lib/types";
import { determinePersonality } from "@/lib/scoring";
import { saveProfile, saveMediaPreference, MediaPreference } from "@/lib/storage";
import { ArrowLeft, ArrowRight, Film, Tv, Shuffle } from "lucide-react";

const MEDIA_OPTIONS: {
  id: MediaPreference;
  label: string;
  joke: string;
  icon: typeof Film;
}[] = [
  {
    id: "movie",
    label: "Movies",
    joke: "Two hours, one commitment, zero cliffhangers ruining my sleep schedule.",
    icon: Film,
  },
  {
    id: "tv",
    label: "Series",
    joke: "I have the emotional bandwidth for eight seasons and a spinoff.",
    icon: Tv,
  },
  {
    id: "both",
    label: "Surprise me",
    joke: "I contain multitudes. Also I can't decide. Just give me everything.",
    icon: Shuffle,
  },
];

const LOADING_LINES = [
  "Reading between the lines…",
  "Diagnosing your taste, gently.",
  "Consulting the group chat in our head.",
  "Cross-referencing with everyone who's ever ghosted a finale.",
];

export default function QuizClient() {
  const router = useRouter();
  const [mediaChoice, setMediaChoice] = useState<MediaPreference | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [loadingLine] = useState(
    () => LOADING_LINES[Math.floor(Math.random() * LOADING_LINES.length)]
  );

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const total = QUIZ_QUESTIONS.length;
  const progress = showQuestions ? (currentIndex / total) * 100 : 0;

  const handlePickMedia = (choice: MediaPreference) => {
    setMediaChoice(choice);
  };

  const handleStartQuiz = () => {
    if (!mediaChoice) return;
    saveMediaPreference(mediaChoice);
    setShowQuestions(true);
  };

  const handleSelect = useCallback(
    (option: QuizOption) => {
      if (isAnimating) return;
      setSelectedOption(option.id);
    },
    [isAnimating]
  );

  const handleNext = useCallback(() => {
    if (!selectedOption || isAnimating) return;

    const option = currentQuestion.options.find((o) => o.id === selectedOption);
    if (!option) return;

    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: selectedOption,
      tags: option.tags,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setIsAnimating(true);

    if (currentIndex < total - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnimating(false);
      }, 380);
    } else {
      setIsComplete(true);
      const { personality, tagWeights } = determinePersonality(newAnswers);
      const profile = {
        personality,
        tagWeights,
        answers: newAnswers,
        takenAt: new Date().toISOString(),
      };
      saveProfile(profile);
      setTimeout(() => {
        router.push(`/result/${personality.id}`);
      }, 900);
    }
  }, [selectedOption, isAnimating, currentQuestion, answers, currentIndex, total, router]);

  const handleBack = useCallback(() => {
    if (currentIndex === 0 || isAnimating) return;
    setCurrentIndex((prev) => prev - 1);
    setAnswers((prev) => prev.slice(0, -1));
    setSelectedOption(null);
  }, [currentIndex, isAnimating]);

  const handleTopBack = () => {
    if (showQuestions && currentIndex > 0) {
      handleBack();
    } else if (showQuestions && currentIndex === 0) {
      setShowQuestions(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]" style={{ background: "var(--surface)" }}>
        <div
          className="h-full progress-fill"
          style={{ width: `${progress}%`, background: "var(--coral)" }}
        />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-6 max-w-2xl mx-auto w-full">
        <button
          onClick={handleTopBack}
          className="flex items-center gap-2 text-sm font-ui transition-opacity hover:opacity-70"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <span className="font-display text-base" style={{ color: "var(--text-primary)" }}>
          Cine<span style={{ color: "var(--coral)" }}>Type</span>
        </span>
        <span className="text-sm font-ui" style={{ color: "var(--text-dim)" }}>
          {showQuestions
            ? `${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
            : "Step 00"}
        </span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {!showQuestions ? (
            <div className="quiz-card-enter">
              <div className="mb-10">
                <p
                  className="text-xs font-ui uppercase tracking-[0.2em] mb-4"
                  style={{ color: "var(--text-dim)" }}
                >
                  Before we get personal
                </p>
                <h1
                  className="font-display text-2xl md:text-4xl leading-snug mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Movies, series, or are we not putting limits on this relationship?
                </h1>
                <p className="text-sm md:text-base" style={{ color: "var(--text-muted)" }}>
                  No wrong answer. Well — there might be one. We'll know soon.
                </p>
              </div>

              <div className="space-y-3">
                {MEDIA_OPTIONS.map((opt) => {
                  const isSelected = mediaChoice === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handlePickMedia(opt.id)}
                      className="press w-full text-left rounded-2xl p-4 md:p-5 border"
                      style={{
                        background: isSelected ? "rgba(193, 117, 90, 0.12)" : "var(--surface)",
                        borderColor: isSelected ? "var(--coral)" : "var(--border)",
                        color: isSelected ? "var(--text-primary)" : "var(--text-muted)",
                      }}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300"
                          style={{
                            background: isSelected ? "var(--coral)" : "var(--elevated)",
                            color: isSelected ? "var(--ink)" : "var(--text-muted)",
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="font-display text-lg mb-0.5" style={{ color: "var(--text-primary)" }}>
                            {opt.label}
                          </p>
                          <p className="text-sm leading-relaxed">{opt.joke}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleStartQuiz}
                  disabled={!mediaChoice}
                  className="press flex items-center gap-2 px-6 py-3 rounded-xl font-ui font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: mediaChoice ? "var(--coral)" : "var(--surface)",
                    color: mediaChoice ? "var(--ink)" : "var(--text-dim)",
                    border: mediaChoice ? "none" : "1px solid var(--border)",
                  }}
                >
                  Alright, interrogate me
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : isComplete ? (
            <div className="text-center fade-up">
              <p className="font-display italic text-3xl mb-3" style={{ color: "var(--coral)" }}>
                {loadingLine}
              </p>
              <p className="text-sm font-ui" style={{ color: "var(--text-muted)" }}>
                This will only be a little embarrassing.
              </p>
            </div>
          ) : (
            <div key={currentIndex} className="quiz-card-enter">
              <div className="mb-10">
                <p
                  className="text-xs font-ui uppercase tracking-[0.2em] mb-4"
                  style={{ color: "var(--text-dim)" }}
                >
                  Question {String(currentIndex + 1).padStart(2, "0")}
                </p>
                <h1
                  className="font-display text-2xl md:text-4xl leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {currentQuestion.question}
                </h1>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      className="press w-full text-left rounded-2xl p-4 md:p-5 border"
                      style={{
                        background: isSelected ? "rgba(193, 117, 90, 0.12)" : "var(--surface)",
                        borderColor: isSelected ? "var(--coral)" : "var(--border)",
                        color: isSelected ? "var(--text-primary)" : "var(--text-muted)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-300"
                          style={{
                            borderColor: isSelected ? "var(--coral)" : "var(--border)",
                            background: isSelected ? "var(--coral)" : "transparent",
                          }}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full" style={{ background: "var(--ink)" }} />}
                        </div>
                        <span className="text-sm md:text-base leading-relaxed">{option.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="press flex items-center gap-2 px-6 py-3 rounded-xl font-ui font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: selectedOption ? "var(--coral)" : "var(--surface)",
                    color: selectedOption ? "var(--ink)" : "var(--text-dim)",
                    border: selectedOption ? "none" : "1px solid var(--border)",
                  }}
                >
                  {currentIndex === total - 1 ? "Diagnose me" : "Next"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
