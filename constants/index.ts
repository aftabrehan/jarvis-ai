import {
  Code,
  Github,
  ImageIcon,
  Linkedin,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
  GalleryVertical,
} from 'lucide-react'

export const MAX_FREE_COUNTS = 5 as const

export const TESTIMONIALS = [
  {
    name: 'James Barr',
    image: '/users/james-barr.png',
    title: 'Marketing Specialist',
    description:
      'This application has significantly boosted our marketing efforts.',
  },
  {
    name: 'Brock Wegner',
    image: '/users/brock-wegner.png',
    title: 'Student',
    description:
      'As a student, this app has been a lifesaver for organizing my tasks and schedules.',
  },
  {
    name: 'Samuel Raita',
    image: '/users/samuel-raita.png',
    title: 'Entrepreneur',
    description:
      'The efficiency and reliability of this tool are unparalleled. Highly recommended!',
  },
  {
    name: 'Evan Wise',
    image: '/users/evan-wise.png',
    title: 'Graphic Designer',
    description: 'Incredible features and user-friendly design. Love it!',
  },
] as const

export const TOOLS = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-violet-500/10',
    href: '/music',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/code',
  },
] as const

export const ROUTES = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  ...TOOLS,
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: null,
  },
] as const

export const FOOTER_LINKS = [
  {
    name: 'Project',
    icon: GalleryVertical,
    link: 'https://aftabrehan.com/portfolio/jarvis-ai',
  },
  {
    name: 'Linkedin',
    icon: Linkedin,
    link: 'https://linkedin.com/in/aftabrehan',
  },
  {
    name: 'Github',
    icon: Github,
    link: 'https://github.com/aftabrehan/jarvis-ai',
  },
]
