import { PERSONALITIES } from "@/lib/personalities";
import ResultClient from "@/components/result/ResultClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return PERSONALITIES.map((p) => ({ id: p.id }));
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const personality = PERSONALITIES.find((p) => p.id === id);
  if (!personality) return notFound();
  return <ResultClient personality={personality} />;
}
