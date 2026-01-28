import { siteConfig } from '@/config/seo'
import type { App } from 'vue'
import type { Router } from 'vue-router'

export interface SEOMeta {
  title: string
  description: string
  image?: string
  url: string
  keywords?: string
  author?: string
}

const DEFAULT_SEO: SEOMeta = {
  title: siteConfig.siteName,
  description: siteConfig.description,
  image: 'https://godden.dev/profile.png',
  url: siteConfig.siteUrl,
  keywords: siteConfig.keywords.join(', '),
  author: siteConfig.author,
}

/**
 * Update document meta tags dynamically
 */
export function updateMetaTags(meta: Partial<SEOMeta>) {
  const seo = { ...DEFAULT_SEO, ...meta }

  // Update title
  document.title = seo.title
  updateOrCreateMetaTag('meta', 'name', 'description', seo.description)

  // Update Open Graph tags
  updateOrCreateMetaTag('meta', 'property', 'og:title', seo.title)
  updateOrCreateMetaTag('meta', 'property', 'og:description', seo.description)
  if (seo.image) {
    updateOrCreateMetaTag('meta', 'property', 'og:image', seo.image)
  }
  if (seo.url) {
    updateOrCreateMetaTag('meta', 'property', 'og:url', seo.url)
  }

  // Update Twitter Card tags
  updateOrCreateMetaTag('meta', 'name', 'twitter:title', seo.title)
  updateOrCreateMetaTag('meta', 'name', 'twitter:description', seo.description)
  if (seo.image) {
    updateOrCreateMetaTag('meta', 'name', 'twitter:image', seo.image)
  }

  // Update keywords if provided
  if (seo.keywords) {
    updateOrCreateMetaTag('meta', 'name', 'keywords', seo.keywords)
  }

  // Update canonical URL
  updateOrCreateCanonicalLink(seo.url || DEFAULT_SEO.url)
}

/**
 * Update or create a meta tag
 */
function updateOrCreateMetaTag(
  tag: string,
  attribute: string,
  value: string,
  content: string,
): void {
  let element = document.querySelector(`${tag}[${attribute}="${value}"]`) as HTMLMetaElement | null

  if (!element) {
    element = document.createElement(tag) as HTMLMetaElement
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

/**
 * Update or create canonical link
 */
function updateOrCreateCanonicalLink(url: string): void {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', url)
}

/**
 * Initialize SEO with Vue Router
 */
export function setupSEO(app: App, router: Router): void {
  // Set initial meta tags
  updateMetaTags({})

  // Update meta tags on route change
  router.afterEach((to) => {
    // Extract SEO data from route meta
    const title = (to.meta?.title as string) || DEFAULT_SEO.title
    const description = (to.meta?.description as string) || DEFAULT_SEO.description
    const keywords = (to.meta?.keywords as string) || ''
    const url = `https://godden.dev${to.path}`

    updateMetaTags({
      title,
      description,
      keywords,
      url,
    })

    // Scroll to top
    window.scrollTo(0, 0)
  })

  // Provide SEO utility globally
  app.provide('seo', {
    updateMetaTags,
  })
}

/**
 * Composable for updating SEO within components
 */
export function useSEO() {
  return {
    updateMetaTags,
  }
}
