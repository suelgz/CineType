"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import { QuizAnswer, QuizOption } from "@/lib/types";
import { determinePersonality } from "@/lib/scoring";
import { saveProfile } from "@/lib/storage";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function QuizClient() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const total = QUIZ_QUESTIONS.length;
  const progress = (currentIndex / total) * 100;

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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Top progress — a thin warm line, not a violet gradient */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]" style={{ background: "var(--surface)" }}>
        <div
          className="h-full progress-fill"
          style={{ width: `${progress}%`, background: "var(--coral)" }}
        />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-6 max-w-2xl mx-auto w-full">
        <button
          onClick={currentIndex > 0 ? handleBack : () => router.push("/")}
          className="flex items-center gap-2 text-sm font-ui transition-opacity hover:opacity-70"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={16} />
          {currentIndex === 0 ? "Back" : "Previous"}
        </button>
        <span className="font-display text-base" style={{ color: "var(--text-primary)" }}>
          Cine<span style={{ color: "var(--coral)" }}>Type</span>
        </span>
        <span className="text-sm font-ui" style={{ color: "var(--text-dim)" }}>
          {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {isComplete ? (
            <div className="text-center fade-up">
              <p
                className="font-display italic text-3xl mb-3"
                style={{ color: "var(--coral)" }}
              >
                Reading between the lines&hellip;
              </p>
              <p className="text-sm font-ui" style={{ color: "var(--text-muted)" }}>
                Putting a name to it.
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
                  {currentIndex === total - 1 ? "See my type" : "Next"}
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
