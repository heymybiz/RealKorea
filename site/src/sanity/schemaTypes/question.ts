import { defineArrayMember, defineField, defineType } from "sanity";

export const questionType = defineType({
  name: "question",
  title: "Question (Ask Desk)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Question Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Detail / Context",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      options: {
        list: [
          { title: "Money", value: "money" },
          { title: "Transit", value: "transit" },
          { title: "Food", value: "food" },
          { title: "Etiquette", value: "etiquette" },
          { title: "Survival", value: "survival" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "neighborhood",
      title: "Neighborhood",
      type: "reference",
      to: [{ type: "neighborhood" }],
    }),
    defineField({
      name: "askerName",
      title: "Asker Name",
      type: "string",
    }),
    defineField({
      name: "askerEmail",
      title: "Asker Email (Private - NEVER exposed publicly)",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Editorial Status",
      type: "string",
      options: {
        list: [
          { title: "Pending Queue (Reviewing)", value: "pending" },
          { title: "Answered (Official Answer Published)", value: "answered" },
          { title: "Rejected / Spam", value: "rejected" },
        ],
      },
      initialValue: "pending",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "officialAnswer",
      title: "Official Editor Answer",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "answerVerified",
      title: "Verified Answer Badge",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "answeredAt",
      title: "Answered At",
      type: "datetime",
    }),
    defineField({
      name: "promotedTo",
      title: "Promoted to Permanent Tip",
      type: "reference",
      to: [{ type: "tip" }],
    }),
    defineField({
      name: "comments",
      title: "Comments List",
      type: "array",
      of: [defineArrayMember({ type: "comment" })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      topic: "topic",
    },
    prepare({ title, status, topic }) {
      return {
        title,
        subtitle: `[${topic?.toUpperCase()}] · Status: ${status}`,
      };
    },
  },
});
