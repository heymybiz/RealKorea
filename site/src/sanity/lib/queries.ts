import { groq } from "next-sanity";

export const TIPS_QUERY = groq`
  *[_type == "tip" && status == "published"] | order(publishedAt desc, _createdAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    status,
    dek,
    topic,
    "neighborhoodSlugs": neighborhoods[]->slug.current,
    tipBoxes,
    lastVerifiedAt,
    editorVerified,
    publishedAt
  }
`;

export const TIP_BY_SLUG_QUERY = groq`
  *[_type == "tip" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    status,
    dek,
    topic,
    "neighborhoodSlugs": neighborhoods[]->slug.current,
    body,
    tipBoxes,
    lastVerifiedAt,
    editorVerified,
    "relatedQuestionSlugs": relatedQuestions[]->slug.current,
    "relatedPlaceSlugs": relatedPlaces[]->slug.current,
    publishedAt
  }
`;

export const PLACES_QUERY = groq`
  *[_type == "place" && status == "published"] | order(publishedAt desc, _createdAt desc) {
    "id": _id,
    editorialTitle,
    "slug": slug.current,
    venueNameEn,
    venueNameKo,
    status,
    vertical,
    "neighborhoodSlug": neighborhood->slug.current,
    transitNote,
    whyLocal,
    isTouristTrap,
    touristTrapNote,
    localAlternative,
    priceBand,
    acceptsCards,
    englishOk,
    reservation,
    hoursNote,
    lastVerifiedAt,
    geo,
    tipBoxes,
    isPartner,
    partnerDisclosure,
    publishedAt
  }
`;

export const PLACE_BY_SLUG_QUERY = groq`
  *[_type == "place" && slug.current == $slug][0] {
    "id": _id,
    editorialTitle,
    "slug": slug.current,
    venueNameEn,
    venueNameKo,
    status,
    vertical,
    "neighborhoodSlug": neighborhood->slug.current,
    transitNote,
    whyLocal,
    isTouristTrap,
    touristTrapNote,
    localAlternative,
    priceBand,
    acceptsCards,
    englishOk,
    reservation,
    hoursNote,
    lastVerifiedAt,
    geo,
    body,
    tipBoxes,
    isPartner,
    partnerDisclosure,
    photos,
    publishedAt
  }
`;

export const QUESTIONS_QUERY = groq`
  *[_type == "question" && status == "answered"] | order(answeredAt desc, _createdAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    body,
    topic,
    "neighborhoodSlug": neighborhood->slug.current,
    askerName,
    status,
    officialAnswer,
    answerVerified,
    answeredAt,
    "promotedToTipSlug": promotedTo->slug.current,
    comments
  }
`;

export const QUESTION_BY_SLUG_QUERY = groq`
  *[_type == "question" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    body,
    topic,
    "neighborhoodSlug": neighborhood->slug.current,
    askerName,
    status,
    officialAnswer,
    answerVerified,
    answeredAt,
    "promotedToTipSlug": promotedTo->slug.current,
    comments
  }
`;

export const NEIGHBORHOODS_QUERY = groq`
  *[_type == "neighborhood"] | order(nameEn asc) {
    "id": _id,
    nameEn,
    nameKo,
    "slug": slug.current,
    region,
    dek
  }
`;

export const GUIDE_FIRST24_QUERY = groq`
  *[_type == "guide" && (slug.current == "first-24-hours" || isFirst24Alias == true)][0] {
    "id": _id,
    title,
    "slug": slug.current,
    dek,
    checklistId,
    checklistItems,
    body
  }
`;
