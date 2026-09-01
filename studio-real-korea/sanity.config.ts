import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Real Korea · Seoul Editorial Desk",

  projectId: "qc22xrrg",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Editorial Desk Navigation")
          .items([
            S.listItem()
              .title("⚡ All Tips")
              .schemaType("tip")
              .child(S.documentTypeList("tip").title("Tips")),

            S.listItem()
              .title("📍 Places & Traps")
              .schemaType("place")
              .child(S.documentTypeList("place").title("Places")),

            S.listItem()
              .title("📖 Arrival & Essential Guides")
              .schemaType("guide")
              .child(S.documentTypeList("guide").title("Guides")),

            S.divider(),

            S.listItem()
              .title("📬 Reader Question Queue (Pending)")
              .child(
                S.documentList()
                  .title("Pending Questions to Answer")
                  .filter('_type == "question" && status == "pending"')
              ),

            S.listItem()
              .title("✅ Published Q&A")
              .child(
                S.documentList()
                  .title("Answered Questions")
                  .filter('_type == "question" && status == "answered"')
              ),

            S.divider(),

            S.listItem()
              .title("⚠️ Stale Verification Desk (>180 Days)")
              .child(
                S.documentList()
                  .title("Content Requiring Fact Re-verification")
                  .filter(
                    '(_type in ["tip", "place"]) && dateTime(lastVerifiedAt) < dateTime(now()) - 60*60*24*180'
                  )
              ),

            S.divider(),

            S.listItem()
              .title("🗺️ Neighborhoods")
              .schemaType("neighborhood")
              .child(S.documentTypeList("neighborhood").title("Neighborhoods")),

            S.listItem()
              .title("🎒 Affiliate & Gear (Shop)")
              .schemaType("shopProduct")
              .child(S.documentTypeList("shopProduct").title("Products")),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schema.types,
  },
});
