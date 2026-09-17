import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',

  devtools: {
    enabled: true
  },

  css: [
    '~/assets/css/main.css'
  ],

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  app: {
    head: {
      title: 'Projet Littera',
      meta: [
        { name: 'description', content: '10 nouvelles lettres à trouver tous les jours' }
      ],
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ],
    },
    baseURL: '/littera'
  },

  nitro: {
    preset: 'github-pages'
  },

  typescript: {
    strict: true
  }
})