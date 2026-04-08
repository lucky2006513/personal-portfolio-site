import profileData from '@/data/profile.json';
import siteData from '@/data/site.json';

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  themeColor: string;
  navigation: NavigationItem[];
  cta: {
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  footerNote: string;
  emptyProjectsMessage: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface TimelineItem {
  title: string;
  org: string;
  period: string;
  summary: string;
}

export interface ProfileConfig {
  name: string;
  headline: string;
  tagline: string;
  location: string;
  availability: string;
  email: string;
  github: string;
  socialLinks: SocialLink[];
  intro: string[];
  focusAreas: string[];
  skillGroups: SkillGroup[];
  experience: TimelineItem[];
  education: TimelineItem[];
  currentlyDoing: string[];
  contactHints: string[];
}

export const site = siteData as SiteConfig;
export const profile = profileData as ProfileConfig;
