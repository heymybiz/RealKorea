import { defineField, defineType } from "sanity";

export const tipBoxType = defineType({
  name: "tipBox",
  title: "Tip Box (Friend Advice)",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
});
