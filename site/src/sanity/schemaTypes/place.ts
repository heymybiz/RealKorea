import { defineArrayMember, defineField, defineType } from "sanity";

export const placeType = defineType({
  name: "place",
  title: "Place",
  type: "document",
  fields: [
    defineField({
      name: "editorialTitle",
      title: "Editorial Headline (H1)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "editorialTitle", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "venueNameEn",
      title: "Venue Name (English)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "venueNameKo",
      title: "Venue Name (Hangul 한글)",
      type: "string",
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
      name: "vertical",
      title: "Vertical",
      type: "string",
      options: {
        list: [
          { title: "Eat & Drink", value: "eat" },
          { title: "Shop (Editorial)", value: "shop-editorial" },
          { title: "Walk & Sight", value: "walk" },
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "transitNote",
      title: "Transit Note (Subway / Exit)",
      type: "string",
      placeholder: "e.g. Line 2, Euljiro 3-ga, Exit 11",
    }),
    defineField({
      name: "whyLocal",
      title: "Why Local (The Straight Answer)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isTouristTrap",
      title: "Tourist Trap Warning",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "touristTrapNote",
      title: "Trap Caution Note",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "localAlternative",
      title: "Local Alternative (if Trap)",
      type: "string",
    }),
    defineField({
      name: "priceBand",
      title: "Price Band (1-4)",
      type: "number",
      options: {
        list: [
          { title: "$ (Budget/Street)", value: 1 },
          { title: "$$ (Casual Dining)", value: 2 },
          { title: "$$$ (Special/Upscale)", value: 3 },
          { title: "$$$$ (Luxury/Fine)", value: 4 },
        ],
      },
    }),
    defineField({
      name: "acceptsCards",
      title: "Accepts Foreign Cards",
      type: "boolean",
    }),
    defineField({
      name: "englishOk",
      title: "English Level",
      type: "string",
      options: {
        list: [
          { title: "None (Pointing/Papago required)", value: "none" },
          { title: "Some (English menu or basic keywords)", value: "some" },
          { title: "Comfortable (Fluent English staff)", value: "comfortable" },
        ],
      },
    }),
    defineField({
      name: "reservation",
      title: "Reservation",
      type: "string",
      options: {
        list: [
          { title: "No (Walk-in only)", value: "no" },
          { title: "Recommended", value: "recommended" },
          { title: "Required", value: "required" },
        ],
      },
    }),
    defineField({
      name: "hoursNote",
      title: "Hours Note",
      type: "string",
    }),
    defineField({
      name: "lastVerifiedAt",
      title: "Last Verified At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "geo",
      title: "Geo Coordinates (for Google Map)",
      type: "object",
      fields: [
        defineField({ name: "lat", title: "Latitude", type: "number" }),
        defineField({ name: "lng", title: "Longitude", type: "number" }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "tipBoxes",
      title: "Tip Boxes",
      type: "array",
      of: [defineArrayMember({ type: "tipBox" })],
    }),
    defineField({
      name: "isPartner",
      title: "Commercial Partner",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "partnerDisclosure",
      title: "Partner Disclosure Note",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "photos",
      title: "Documentary Photos",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text (Factual English)",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "editorialTitle",
      venueEn: "venueNameEn",
      venueKo: "venueNameKo",
      trap: "isTouristTrap",
    },
    prepare({ title, venueEn, venueKo, trap }) {
      return {
        title,
        subtitle: `${venueEn} (${venueKo}) ${trap ? "⚠️ [TRAP]" : ""}`,
      };
    },
  },
});
