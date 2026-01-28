/**
 * SEO Configuration for godden.dev
 * Centralized SEO metadata and configuration
 */

export interface SiteConfig {
  siteName: string
  siteUrl: string
  author: string
  authorEmail: string
  description: string
  keywords: string[]
  language: string
  socialLinks: {
    github: string
    linkedin: string
    email: string
  }
}

export const siteConfig: SiteConfig = {
  siteName: 'godden.dev',
  siteUrl: 'https://godden.dev',
  author: 'Morgan Godden',
  authorEmail: 'morgan.godden@outlook.com',
  description: "Morgan Godden's Web Portfolio - Full-Stack Web Developer",
  keywords: [
    'web developer',
    'portfolio',
    'creative developer',
    'morgan godden',
    'software engineer',
    'vue.js',
    'web design',
    'full stack developer',
  ],
  language: 'en',
  socialLinks: {
    github: 'https://github.com/MorganGodden',
    linkedin: 'https://www.linkedin.com/in/morgan-godden/',
    email: 'mailto:morgan.godden@outlook.com',
  },
}
