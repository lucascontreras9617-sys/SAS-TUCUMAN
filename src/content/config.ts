import { z, defineCollection } from "astro:content";

const glosarioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date().optional()
  })
});

const articulosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().default('Estudio SAS Tucumán'),
    category: z.string().default('Derecho Societario'),
  })
});

export const collections = {
  'glosario': glosarioCollection,
  'articulos': articulosCollection,
};
