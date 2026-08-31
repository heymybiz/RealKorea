import {
  FieldLabel,
  FormNotice,
  HoneypotField,
  SubmitButton,
  TextArea,
  TextField,
} from "@/components/site/form-parts";
import { VerifiedMark } from "@/components/site/verified-mark";
import type { CommentTarget, PublicComment } from "@/lib/content/types";
import { formatFullDate, toDateTimeAttribute } from "@/lib/format";
import { ERROR_MESSAGE, COMMENT_MAX, type ErrorCode } from "@/lib/validation";

/**
 * PRD 02 §3.3 and FR-020/FR-022.
 *
 * A quiet list, not a forum: no avatars, no upvotes, and no reply trees deeper
 * than one level (PRD 04 §1). An editor endorsement shows the crimson Verified
 * mark on that comment.
 *
 * `emphasis="secondary"` is for Place and Tip pages, where PRD 02 §3.9 requires
 * comments to sit below the editorial content and stay visually subordinate.
 */
export function CommentSection({
  target,
  comments,
  error,
  submitted,
  emphasis = "primary",
}: {
  target: CommentTarget;
  comments: readonly PublicComment[];
  error: ErrorCode | null;
  submitted: boolean;
  emphasis?: "primary" | "secondary";
}) {
  const headingSize =
    emphasis === "primary" ? "text-2xl font-semibold" : "text-lg font-semibold";

  return (
    <section
      id="comments"
      aria-labelledby="comments-heading"
      className="border-rule mt-16 border-t pt-10"
    >
      <h2 id="comments-heading" className={headingSize}>
        Comments
      </h2>

      {submitted ? (
        <div className="mt-4">
          <FormNotice tone="success">
            Posted. An editor reads every comment.
          </FormNotice>
        </div>
      ) : null}

      {error ? (
        <div className="mt-4">
          <FormNotice tone="error">{ERROR_MESSAGE[error]}</FormNotice>
        </div>
      ) : null}

      {comments.length > 0 ? (
        <ul className="divide-rule mt-8 divide-y">
          {comments.map((comment) => {
            const posted = formatFullDate(comment.createdAt);

            return (
              <li key={comment.id} className="py-5">
                <div className="text-ink-soft flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="text-ink tracking-[0.12em] uppercase">
                    {comment.name}
                  </span>
                  {posted ? (
                    <time dateTime={toDateTimeAttribute(comment.createdAt)}>
                      {posted}
                    </time>
                  ) : null}
                  {comment.editorEndorsed ? <VerifiedMark /> : null}
                </div>
                <p className="text-ink mt-2 text-[15px] leading-6">
                  {comment.body}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-ink-soft mt-6 text-[15px]">No comments yet.</p>
      )}

      <form
        action="/api/comment"
        method="post"
        className="border-rule bg-paper-warm relative mt-8 border p-5"
      >
        <HoneypotField />

        <input type="hidden" name="targetType" value={target.type} />
        <input type="hidden" name="targetSlug" value={target.slug} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="comment-name">Name</FieldLabel>
            <TextField
              id="comment-name"
              name="name"
              type="text"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <FieldLabel htmlFor="comment-email" hint="never published">
              Email
            </FieldLabel>
            <TextField
              id="comment-email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div className="mt-4">
          <FieldLabel htmlFor="comment-body">Comment</FieldLabel>
          <TextArea
            id="comment-body"
            name="body"
            rows={4}
            required
            maxLength={COMMENT_MAX}
          />
        </div>

        <div className="mt-5">
          <SubmitButton>Post comment</SubmitButton>
        </div>
      </form>
    </section>
  );
}
