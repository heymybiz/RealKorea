import { defineArrayMember, defineField, defineType } from "sanity";

export const guideType = defineType({
  name: "guide",
  title: "Guide",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
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
    }),
    defineField({
      name: "isFirst24Alias",
      title: "Alias for /first-24-hours",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "checklistId",
      title: "Checklist Storage Key",
      type: "string",
      placeholder: "e.g. first-24",
    }),
    defineField({
      name: "checklistItems",
      title: "Checklist Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "id", title: "Item ID", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "label", title: "Action Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "help", title: "Detail / Help Text", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
});
