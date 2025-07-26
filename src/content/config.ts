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

const projectCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      coverImage: z.object({
        url: image(),
      }),
      date: z.object({
        start: z.coerce.date(),
        end: z.coerce.date(),
      }),
      tags: z.array(z.string()),
    }),
});

export const collections = {
  profile: profileCollection,
  technologies: technologiesCollection,
  timeline: timelineCollection,
  project: projectCollection,
};
