import { defineField, defineType } from "sanity";

export const neighborhoodType = defineType({
  name: "neighborhood",
  title: "Neighborhood",
  type: "document",
  fields: [
    defineField({
      name: "nameEn",
      title: "Name (English)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameKo",
      title: "Name (Hangul 한글)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nameEn", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          { title: "Seoul (Downtown / Jongno)", value: "Seoul · Downtown" },
          { title: "Seoul (Gangnam / South)", value: "Seoul · Gangnam" },
          { title: "Seoul (West / Hongdae)", value: "Seoul · West" },
          { title: "Seoul (East / Seongsu)", value: "Seoul · East" },
          { title: "Incheon / Airport", value: "Incheon" },
          { title: "Gyeonggi Province", value: "Gyeonggi" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dek",
      title: "Dek / Editorial Summary",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "hero",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
