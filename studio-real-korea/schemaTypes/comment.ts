import { defineField, defineType } from "sanity";

export const commentType = defineType({
  name: "comment",
  title: "Comment",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Display Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email (Private - NEVER exposed publicly)",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Comment Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "published",
      title: "Published (Visible on site)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "editorEndorsed",
      title: "Editor Endorsed Badge",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
