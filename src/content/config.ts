import { z, defineCollection } from "astro:content";

const profileCollection = defineCollection({
  schema: z.object({
    name: z.object({
      first: z.string(),
      last: z.string(),
    }),
    location: z.object({
      city: z.string(),
      country: z.string(),
    }),
    image: z.object({
      url: z.string(),
    }),
  }),
});

const technologiesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

const timelineCollection = defineCollection({});

export const collections = {
  profile: profileCollection,
  technologies: technologiesCollection,
  timeline: timelineCollection,
};
