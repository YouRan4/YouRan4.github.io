import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: '溪畔听风',
  description:
    '答应我，永远快乐。',
  href: 'http://p0m1se.club/',
  author: 'YouRan',
  locale: 'zh-CN',
  featuredPostCount: 2,
  postsPerPage: 6,
  winterThemeMonths: [11, 0, 1,2],
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: '博客',
  },
  {
    href: '/about',
    label: '关于',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/YouRan4',
    label: 'GitHub',
  }
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
}

// 已移除邮箱订阅与 RSS 功能
