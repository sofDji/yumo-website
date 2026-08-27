export type Level = 'n5' | 'n4' | 'n3' | 'n2' | 'n1';

export const LEVELS: Level[] = ['n5', 'n4', 'n3', 'n2', 'n1'];

// Verbatim from the app's src/theme/colors.ts — the site and the app must
// render the same product.
export const LEVEL_COLORS: Record<Level, string> = {
  n5: '#10B981',
  n4: '#14B8A6',
  n3: '#3B82F6',
  n2: '#8B5CF6',
  n1: '#F43F5E',
};

export const LEVEL_LABELS: Record<Level, string> = {
  n5: 'N5', n4: 'N4', n3: 'N3', n2: 'N2', n1: 'N1',
};

// Counted from assets/word-data.json on 2026-08-27.
export const WORD_COUNTS: Record<Level, number> = {
  n5: 718, n4: 668, n3: 2139, n2: 1748, n1: 2699,
};

export const TOTAL_WORDS = 7972;
