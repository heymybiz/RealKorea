import { type SchemaTypeDefinition } from "sanity";

import { commentType } from "./comment";
import { guideType } from "./guide";
import { neighborhoodType } from "./neighborhood";
import { placeType } from "./place";
import { questionType } from "./question";
import { shopProductType } from "./shopProduct";
import { tipType } from "./tip";
import { tipBoxType } from "./tipBox";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    tipType,
    placeType,
    guideType,
    questionType,
    neighborhoodType,
    shopProductType,
    tipBoxType,
    commentType,
  ],
};
