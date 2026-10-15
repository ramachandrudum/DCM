export type ThemeStatusColors = {
  critical: string
  warning: string
  deviation: string
  healthy: string
  info: string
}

export type ThemeConfig = {
  id: string
  label: string
  primary: string
  accent: string
  background: string
  card: string
  dark: boolean
  text?: string
  muted?: string
  border?: string
  navigation?: string
  navigationActive?: string
  status?: ThemeStatusColors
}

export const defaultTheme: ThemeConfig = {
  id: 'default',
  label: 'Default',
  primary: '#2563eb',
  accent: '#8b5cf6',
  background: '#f8fafc',
  card: '#ffffff',
  dark: false,
}

export const themePresets: ThemeConfig[] = [
  {
    id: 'dark-onyx',
    label: 'Dark',
    primary: '#38bdf8',
    accent: '#c084fc',
    background: '#090d16',
    card: '#090d16',
    dark: true,
    text: '#F2F4F7',
    muted: '#98A2B3',
    border: '#373737',
    navigation: '#090d16',
    navigationActive: '#135DFB',
    status: {
      critical: '#F04438',
      warning: '#FB923C',
      deviation: '#F59E0B',
      healthy: '#34D399',
      info: '#00A3FF',
    },
  },
  {
    id: 'pulse-light',
    label: 'Light',
    primary: '#EE3124',
    accent: '#1890FF',
    background: '#F8F9FA',
    card: '#FFFFFF',
    dark: false,
    text: '#101828',
    muted: '#6C757D',
    border: '#DEE2E6',
    navigation: '#1E1E1E',
    navigationActive: '#135DFB',
    status: {
      critical: '#D92D20',
      warning: '#F79009',
      deviation: '#FFC107',
      healthy: '#12B76A',
      info: '#1890FF',
    },
  },
  {
    id: 'pulse-dark',
    label: 'Medium',
    primary: '#EE3124',
    accent: '#00A3FF',
    background: '#121212',
    card: '#242424',
    dark: true,
    text: '#F2F4F7',
    muted: '#98A2B3',
    border: '#373737',
    navigation: '#111111',
    navigationActive: '#135DFB',
    status: {
      critical: '#F04438',
      warning: '#FB923C',
      deviation: '#F59E0B',
      healthy: '#34D399',
      info: '#00A3FF',
    },
  },
]
