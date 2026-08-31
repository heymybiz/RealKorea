import type { ContentBlock } from "@/lib/content/types";

/**
 * Renders the content blocks from the CMS boundary. Sanity's portable text
 * replaces `ContentBlock` later; only this file has to learn the new shape.
 */
export function Prose({ blocks }: { blocks: readonly ContentBlock[] }) {
  if (blocks.length === 0) return null;

  return (
    <div className="max-w-[68ch]">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level === 2 ? "h2" : "h3";

          return (
            <Tag
              key={`${block.type}-${index}`}
              className={
                block.level === 2
                  ? "mt-10 mb-3 text-2xl font-semibold"
                  : "mt-8 mb-2 text-xl font-semibold"
              }
            >
              {block.text}
            </Tag>
          );
        }

        return (
          <p
            key={`${block.type}-${index}`}
            className="text-ink mt-5 text-[17px] leading-7"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
