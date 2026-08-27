import { describe, expect, it } from 'vitest';
import { LEVELS, LEVEL_COLORS, TOTAL_WORDS, WORD_COUNTS } from '../tokens';

describe('tokens', () => {
  it('lists levels from easiest to hardest', () => {
    expect(LEVELS).toEqual(['n5', 'n4', 'n3', 'n2', 'n1']);
  });

  it('matches the app palette exactly', () => {
    expect(LEVEL_COLORS).toEqual({
      n5: '#10B981',
      n4: '#14B8A6',
      n3: '#3B82F6',
      n2: '#8B5CF6',
      n1: '#F43F5E',
    });
  });

  it('carries the real dataset counts', () => {
    expect(WORD_COUNTS).toEqual({
      n5: 718, n4: 668, n3: 2139, n2: 1748, n1: 2699,
    });
  });

  it('totals to the full dataset', () => {
    const summed = LEVELS.reduce((n, l) => n + WORD_COUNTS[l], 0);
    expect(summed).toBe(TOTAL_WORDS);
    expect(TOTAL_WORDS).toBe(7972);
  });
});
