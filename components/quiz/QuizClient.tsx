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
  const progress = ((currentIndex) / total) * 100;

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
      }, 280);
    } else {
      // Quiz complete
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
      }, 600);
    }
  }, [selectedOption, isAnimating, currentQuestion, answers, currentIndex, total, router]);

  const handleBack = useCallback(() => {
    if (currentIndex === 0 || isAnimating) return;
    setCurrentIndex((prev) => prev - 1);
    setAnswers((prev) => prev.slice(0, -1));
    setSelectedOption(null);
  }, [currentIndex, isAnimating]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg)" }}
    >
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1" style={{ background: "var(--surface)" }}>
        <div
          className="h-full progress-fill"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--violet-dim), var(--violet))",
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-2xl mx-auto w-full">
        <button
          onClick={currentIndex > 0 ? handleBack : () => router.push("/")}
          className="flex items-center gap-2 text-sm font-ui transition-opacity hover:opacity-70"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft size={16} />
          {currentIndex === 0 ? "Back" : "Previous"}
        </button>
        <span
          className="font-display text-base"
          style={{ color: "var(--text-primary)" }}
        >
          Cine<span style={{ color: "var(--violet)" }}>Type</span>
        </span>
        <span
          className="text-sm font-ui"
          style={{ color: "var(--text-muted)" }}
        >
          {currentIndex + 1}/{total}
        </span>
      </nav>

      {/* Quiz area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {isComplete ? (
            <div className="text-center fade-up">
              <div className="text-4xl mb-6">🎬</div>
              <h2
                className="font-display text-2xl mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Calculating your type…
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                This'll just take a second.
              </p>
            </div>
          ) : (
            <div key={currentIndex} className="quiz-card-enter">
              {/* Question */}
              <div className="mb-10 text-center">
                <p
                  className="text-xs font-ui uppercase tracking-widest mb-4"
                  style={{ color: "var(--text-dim)" }}
                >
                  Question {currentIndex + 1}
                </p>
                <h1
                  className="font-display text-2xl md:text-3xl leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {currentQuestion.question}
                </h1>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      className="w-full text-left rounded-2xl p-4 md:p-5 border transition-all duration-200 group"
                      style={{
                        background: isSelected
                          ? "rgba(167, 139, 250, 0.15)"
                          : "var(--surface)",
                        borderColor: isSelected
                          ? "var(--violet)"
                          : "var(--border)",
                        color: isSelected ? "var(--text-primary)" : "var(--text-muted)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                          style={{
                            borderColor: isSelected ? "var(--violet)" : "var(--border)",
                            background: isSelected ? "var(--violet)" : "transparent",
                          }}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-sm md:text-base leading-relaxed">
                          {option.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-ui font-medium text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: selectedOption ? "var(--violet)" : "var(--surface)",
                    color: selectedOption ? "#0D0F1A" : "var(--text-dim)",
                    borderColor: "var(--border)",
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
