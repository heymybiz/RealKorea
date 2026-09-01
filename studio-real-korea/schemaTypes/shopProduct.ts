import { defineField, defineType } from "sanity";

export const shopProductType = defineType({
  name: "shopProduct",
  title: "Shop Product (Affiliate / Gear)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Connectivity (eSIM / SIM / WiFi)", value: "connectivity" },
          { title: "Power & Adapters (Type C/F)", value: "power" },
          { title: "Bags & Packable", value: "bags" },
          { title: "Transit Essentials", value: "transit" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "why",
      title: "Why Editors Picked This",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
    }),
    defineField({
      name: "outboundUrl",
      title: "Direct Outbound Merchant URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceHint",
      title: "Price Hint (e.g. ~USD 12)",
      type: "string",
    }),
  ],
});
