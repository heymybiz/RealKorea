import { defineArrayMember, defineField, defineType } from "sanity";

export const tipType = defineType({
  name: "tip",
  title: "Tip",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Scheduled", value: "scheduled" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dek",
      title: "Dek (Summary)",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      options: {
        list: [
          { title: "Arrival", value: "arrival" },
          { title: "Transit", value: "transit" },
          { title: "Money", value: "money" },
          { title: "Etiquette", value: "etiquette" },
          { title: "Survival", value: "survival" },
          { title: "Seasonal", value: "seasonal" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "neighborhoods",
      title: "Neighborhoods",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "neighborhood" }] })],
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "tipBoxes",
      title: "Tip Boxes (Friend Voice)",
      type: "array",
      of: [defineArrayMember({ type: "tipBox" })],
      validation: (rule) => rule.min(1).error("At least 1 tip box is required per Tip document."),
    }),
    defineField({
      name: "lastVerifiedAt",
      title: "Last Verified At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "editorVerified",
      title: "Editor Verified Badge",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "relatedQuestions",
      title: "Related Questions",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "question" }] })],
    }),
    defineField({
      name: "relatedPlaces",
      title: "Related Places",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "place" }] })],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      topic: "topic",
      status: "status",
    },
    prepare({ title, topic, status }) {
      return {
        title,
        subtitle: `[${topic?.toUpperCase() || "NO TOPIC"}] · ${status}`,
      };
    },
  },
});
