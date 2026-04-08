import { getCollection, type CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;

function toYearValue(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export async function getPublishedProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return [...projects].sort((left, right) => {
    const byYear = toYearValue(right.data.year) - toYearValue(left.data.year);
    if (byYear !== 0) return byYear;
    return left.data.title.localeCompare(right.data.title, 'zh-CN');
  });
}

export async function getFeaturedProjects(limit = 3) {
  return (await getPublishedProjects()).filter(({ data }) => data.featured).slice(0, limit);
}
