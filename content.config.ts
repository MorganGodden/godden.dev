import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () =>
  z.object({
    title: z.string(),
    description: z.string()
  })

const createButtonSchema = () =>
  z.object({
    label: z.string(),
    icon: z.string().optional(),
    to: z.string().optional(),
    color: z
      .enum(['primary', 'neutral', 'success', 'warning', 'error', 'info'])
      .optional(),
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
    variant: z
      .enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
      .optional(),
    target: z.enum(['_blank', '_self']).optional()
  })

const createImageSchema = () =>
  z.object({
    src: z.string().editor({ input: 'media' }),
    alt: z.string()
  })

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        about: createBaseSchema(),
        experience: createBaseSchema().extend({
          items: z.array(
            z.object({
              date: z.string(),
              position: z.string(),
              company: z.object({
                name: z.string(),
                url: z.string(),
                logo: z.string().editor({ input: 'icon' }).optional(),
                color: z.string()
              })
            })
          )
        }),
        faq: createBaseSchema().extend({
          categories: z.array(
            z.object({
              title: z.string().nonempty(),
              questions: z.array(
                z.object({
                  label: z.string().nonempty(),
                  content: z.string().nonempty()
                })
              )
            })
          )
        })
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().editor({ input: 'media' }).optional(),
        url: z.string().nonempty(),
        tags: z.array(z.string()),
        year: z.number()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [{ include: 'projects.yml' }],
      schema: z.object({
        links: z.array(createButtonSchema())
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        content: z.object({}),
        images: z.array(createImageSchema())
      })
    })
  }
})
