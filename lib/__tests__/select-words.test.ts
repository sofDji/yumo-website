import { describe, expect, it } from 'vitest';
import { selectWords, type RawWord } from '../select-words';

const raw = (over: Partial<RawWord> & { id: number }): RawWord => ({
  kanji: '水', kana: 'みず', romaji: 'mizu', level: 'n5',
  meaning: { en: 'water', fr: 'eau', de: 'Wasser', es: 'agua' },
  ...over,
});

describe('selectWords', () => {
  it('drops kanji longer than three characters', () => {
    const out = selectWords([raw({ id: 1, kanji: '一二三四' })], 5);
    expect(out).toHaveLength(0);
  });

  it('drops meanings of 40 characters or more', () => {
    const long = 'a'.repeat(40);
    const out = selectWords([raw({ id: 2, meaning: { en: long, fr: '', de: '', es: '' } })], 5);
    expect(out).toHaveLength(0);
  });

  it('drops meanings containing a semicolon', () => {
    const out = selectWords([raw({ id: 3, meaning: { en: 'water; liquid', fr: '', de: '', es: '' } })], 5);
    expect(out).toHaveLength(0);
  });

  it('caps each level at perLevel entries', () => {
    const many = Array.from({ length: 30 }, (_, i) => raw({ id: i + 1 }));
    expect(selectWords(many, 24)).toHaveLength(24);
  });

  it('flattens the meaning to English and keeps the level', () => {
    const [w] = selectWords([raw({ id: 4 })], 5);
    expect(w).toEqual({
      id: 4, kanji: '水', kana: 'みず', romaji: 'mizu', meaning: 'water', level: 'n5',
    });
  });

  it('drops kana-only words, where the kanji field just repeats the kana', () => {
    const out = selectWords([raw({ id: 5, kanji: 'ああ', kana: 'ああ' })], 5);
    expect(out).toHaveLength(0);
  });

  it('drops suffix stubs marked with a wave dash', () => {
    const full = selectWords([raw({ id: 6, kanji: '～区', kana: 'く' })], 5);
    const wave = selectWords([raw({ id: 7, kanji: '〜区', kana: 'く' })], 5);
    expect(full).toHaveLength(0);
    expect(wave).toHaveLength(0);
  });

  it('keeps levels separate rather than filling from one', () => {
    const input = [
      ...Array.from({ length: 30 }, (_, i) => raw({ id: i + 1, level: 'n5' as const })),
      raw({ id: 100, level: 'n1' }),
    ];
    const out = selectWords(input, 24);
    expect(out.filter((w) => w.level === 'n5')).toHaveLength(24);
    expect(out.filter((w) => w.level === 'n1')).toHaveLength(1);
  });
});
