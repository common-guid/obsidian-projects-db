import {CachedMetadata} from 'obsidian';
import {ParentTask, Subtask} from './types';

/**
 * Parses the MetadataCache of a file to extract parent and subtasks.
 * @param {string} path - The vault path of the file.
 * @param {CachedMetadata} metadata - The metadata cache for the file.
 * @returns {{ parent: ParentTask | null, subtasks: Subtask[] }}
 */
function parseFileCache(
  path: string,
  metadata: CachedMetadata
): {parent: ParentTask | null; subtasks: Subtask[]} {
  const fileName = path.split('/').pop()?.replace('.md', '') || '';
  const frontmatter = metadata.frontmatter || {};

  let parent: ParentTask | null = null;

  if (frontmatter.type === 'task') {
    parent = {
      id: path,
      name: fileName,
      type: 'note',
      path: path,
      frontmatter: frontmatter,
    };
  }

  const subtasks: Subtask[] = (metadata.headings || []).map(h => ({
    id: `${path}#${h.heading}`,
    name: h.heading,
    type: 'heading',
    path: `${path}#${h.heading}`,
    level: h.level,
    parentPath: path,
    properties: {}, // TODO: Implement inline property parsing in Phase 3
  }));

  return {parent, subtasks};
}

/**
 * Filters subtasks based on their heading level.
 * @param {Subtask[]} subtasks - The list of subtasks to filter.
 * @param {number} maxLevel - The maximum heading level to include.
 * @returns {Subtask[]}
 */
function headingLevelFilter(subtasks: Subtask[], maxLevel: number): Subtask[] {
  return subtasks.filter(s => s.level <= maxLevel);
}

export {parseFileCache, headingLevelFilter};
