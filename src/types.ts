export type Site = {
  title: string
  description: string
  href: string
  author: string
  locale: string
  featuredPostCount: number
  postsPerPage: number
  winterThemeMonths: Array<number>
}

export type SocialLink = {
  href: string
  label: string
}

export type IconMap = {
  [key: string]: string
}