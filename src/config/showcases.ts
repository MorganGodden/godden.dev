import type { Showcase } from '@/types/index'

/**
 * Portfolio showcases configuration
 * Contains all project information displayed in the rolling gallery
 */
export const showcases: Showcase[] = [
  {
    icon: 'icon-park-solid:poker',
    title: 'Planning Poker Application',
    description: `A web application designed to facilitate agile sprint planning using the Planning
                Poker technique. Built with Nuxt.js and Nitro websockets, this app
                offers real-time collaboration, Jira integration, and a unique parallax UI to add whimsy to
                your estimation sessions.`,
    link: 'https://wtp.godden.dev/',
    techIcons: {
      'Tailwind CSS': 'mdi:tailwind',
      TypeScript: 'mdi:language-typescript',
      'Vue.js': 'mdi:vuejs',
      'Nuxt.js': 'lineicons:nuxt',
      Nitro: 'unjs:nitro',
    },
  },
  {
    icon: 'mdi:controller',
    title: 'Game Development Portfolio',
    description: `A collection of game jam and hackathon games developed using Unity and Blender.
                Showcasing a variety of genres and styles, this portfolio highlights my skills in game
                design, 3D modeling, and programming with C#.`,
    link: 'https://goddendev.itch.io/',
    techIcons: {
      Unity: 'mdi:unity',
      Blender: 'mdi:blender-software',
      CSharp: 'mdi:language-csharp',
      GoDot: 'devicon-plain:godot',
    },
  },
  {
    icon: 'material-symbols:leaderboard-rounded',
    title: 'Minecraft Leaderboard',
    description: `A web application that tracks and displays player statistics and rankings for custom Minecraft
                servers. Built with Vue.js, this app integrates with a Java RESTful API to provide real-time updates, 
                user profiles, and leaderboards to enhance the gaming experience for this Minecraft community.`,
    link: 'https://sl.godden.dev',
    techIcons: {
      'Tailwind CSS': 'mdi:tailwind',
      TypeScript: 'mdi:language-typescript',
      'Vue.js': 'mdi:vuejs',
      'RESTful API': 'carbon:api-1',
    },
    disabled: true,
  },
]
