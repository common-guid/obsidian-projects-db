import {describe, it, expect} from 'vitest';
import {parseFileCache, headingLevelFilter} from '../src/parser';
import {CachedMetadata} from 'obsidian';

describe('Metadata Parsing Logic', () => {
  describe('parseFileCache', () => {
    it('should return a ParentTask and Subtasks from valid CachedMetadata', () => {
      const mockMetadata: CachedMetadata = {
        frontmatter: {
          type: 'task',
          status: 'in-progress',
        },
        headings: [
          {
            heading: 'Subtask 1',
            level: 1,
            position: {
              start: {line: 5, offset: 50, col: 0},
              end: {line: 5, offset: 60, col: 10},
            },
          },
          {
            heading: 'Subtask 2',
            level: 2,
            position: {
              start: {line: 10, offset: 100, col: 0},
              end: {line: 10, offset: 110, col: 10},
            },
          },
        ],
      };
      const path = 'Project A.md';

      const result = parseFileCache(path, mockMetadata);

      expect(result.parent).toBeDefined();
      expect(result.parent?.name).toBe('Project A');
      expect(result.parent?.frontmatter.status).toBe('in-progress');
      expect(result.subtasks).toHaveLength(2);
      expect(result.subtasks[0].name).toBe('Subtask 1');
      expect(result.subtasks[1].level).toBe(2);
    });

    it('should handle paths without slashes', () => {
      const result = parseFileCache('Simple.md', {
        frontmatter: {type: 'task'},
      } as any);
      expect(result.parent?.name).toBe('Simple');
    });

    it('should handle empty metadata', () => {
      const result = parseFileCache('Empty.md', {});
      expect(result.parent).toBeNull();
      expect(result.subtasks).toEqual([]);
    });
  });

  describe('headingLevelFilter', () => {
    it('should filter headings based on max level', () => {
      const subtasks: any[] = [
        {name: 'H1', level: 1},
        {name: 'H2', level: 2},
        {name: 'H3', level: 3},
      ];

      const filtered = headingLevelFilter(subtasks, 2);
      expect(filtered).toHaveLength(2);
      expect(filtered.map(s => s.name)).toEqual(['H1', 'H2']);
    });
  });
});
