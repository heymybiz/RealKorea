import {
  FieldLabel,
  FormNotice,
  HoneypotField,
  SelectField,
  SubmitButton,
  TextArea,
  TextField,
} from "@/components/site/form-parts";
import type { Neighborhood } from "@/lib/content/types";
import {
  ERROR_MESSAGE,
  QUESTION_MAX,
  QUESTION_TOPICS,
  TOPIC_LABEL,
  type ErrorCode,
} from "@/lib/validation";

/**
 * PRD 02 §3.3 — the desk composer: a 140-character question, topic chips, an
 * optional neighborhood, a name, and an email labelled "never published".
 *
 * A plain POST form. No account, no OAuth, no sign-in chrome (FR-023): the email
 * is a field, not an identity.
 *
 * Topics are radio inputs rather than buttons so the single-select rule holds
 * without JavaScript, styled to read as the chips in the mockups.
 */
export function AskComposer({
  neighborhoods,
  error,
  submitted,
  questionValue,
  topicValue,
}: {
  neighborhoods: readonly Neighborhood[];
  error: ErrorCode | null;
  submitted: boolean;
  questionValue: string;
  topicValue: string | null;
}) {
  return (
    <section
      id="ask-the-desk"
      aria-labelledby="ask-the-desk-heading"
      className="border-rule bg-paper-warm border p-6"
    >
      <h2
        id="ask-the-desk-heading"
        className="text-crimson text-xs tracking-[0.12em] uppercase"
      >
        Ask the desk
      </h2>

      {submitted ? (
        <div className="mt-4">
          <FormNotice tone="success">
            The desk has it. We publish when an editor can stand behind the
            answer.
          </FormNotice>
        </div>
      ) : null}

      {error ? (
        <div className="mt-4">
          <FormNotice tone="error">{ERROR_MESSAGE[error]}</FormNotice>
        </div>
      ) : null}

      <form action="/api/ask" method="post" className="relative mt-5">
        <HoneypotField />

        <div>
          <FieldLabel htmlFor="question" hint={`up to ${QUESTION_MAX} characters`}>
            Your question
          </FieldLabel>
          <TextArea
            id="question"
            name="question"
            rows={3}
            required
            maxLength={QUESTION_MAX}
            defaultValue={questionValue}
            placeholder="Ask something tourists never get a straight answer to"
          />
        </div>

        <fieldset className="mt-5">
          <legend className="text-ink mb-2 text-xs tracking-[0.12em] uppercase">
            Topic
          </legend>
          <div className="flex flex-wrap gap-2">
            {QUESTION_TOPICS.map((topic, index) => (
              <label
                key={topic}
                className="border-rule text-ink has-checked:border-crimson has-checked:bg-crimson cursor-pointer rounded-full border px-4 py-1.5 text-[13px] transition-colors duration-[180ms] ease-out has-checked:text-white hover:border-ink"
              >
                <input
                  type="radio"
                  name="topic"
                  value={topic}
                  required
                  defaultChecked={
                    topicValue ? topicValue === topic : index === 0
                  }
                  className="sr-only"
                />
                {TOPIC_LABEL[topic]}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="neighborhood" hint="optional">
              Neighborhood
            </FieldLabel>
            <SelectField id="neighborhood" name="neighborhood" defaultValue="">
              <option value="">Anywhere</option>
              {neighborhoods.map((neighborhood) => (
                <option key={neighborhood.id} value={neighborhood.slug}>
                  {neighborhood.nameEn}
                </option>
              ))}
            </SelectField>
          </div>

          <div>
            <FieldLabel htmlFor="name">Your name</FieldLabel>
            <TextField
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Shown with your question"
            />
          </div>
        </div>

        <div className="mt-4">
          <FieldLabel htmlFor="email" hint="never published">
            Email
          </FieldLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="So an editor can reply"
          />
        </div>

        <div className="mt-6">
          <SubmitButton>Ask the desk</SubmitButton>
        </div>
      </form>

      {/* PRD 06 §3 — label the demo queue plainly while no CMS is connected. */}
      <p className="border-rule text-ink-soft mt-6 border-t pt-4 text-[13px] leading-5">
        No CMS is connected yet. Submitted questions are held in a temporary
        in-memory queue for review and are cleared when the server restarts.
      </p>
    </section>
  );
}
