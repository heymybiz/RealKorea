import { getQuestionBySlug } from "@/lib/cms";
import { isIndexableQuestion } from "@/lib/content/types";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Real Korea question";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = await getQuestionBySlug(slug);

  return renderOgImage({
    kicker: "From the desk",
    title: question?.title ?? "Question",
    footnote:
      question && !isIndexableQuestion(question)
        ? "Awaiting editor"
        : undefined,
  });
}
