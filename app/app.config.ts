export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://avatars.githubusercontent.com/u/52884391?v=4',
      light: 'https://avatars.githubusercontent.com/u/52884391?v=4',
      alt: 'My profile picture'
    },
    email: 'morgan.godden@outlook.com'
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description:
          'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `© ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        'icon': 'i-simple-icons-itchdotio',
        'to': 'https://goddendev.itch.io/',
        'target': '_blank',
        'aria-label': 'godden.dev - itch.io'
      },
      {
        'icon': 'i-simple-icons-linkedin',
        'to': 'https://www.linkedin.com/in/morgan-godden/',
        'target': '_blank',
        'aria-label': 'Morgan Godden - LinkedIn'
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/MorganGodden',
        'target': '_blank',
        'aria-label': 'Morgan Godden - Github'
      }
    ]
  }
})
