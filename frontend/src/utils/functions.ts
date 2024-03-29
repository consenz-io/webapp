import { Theme } from '@mui/material';
import { JSONContent } from '@tiptap/react';
import { TFunction } from 'react-i18next';
import { StringBank } from 'strings';
import { Version } from 'types';

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateColorFromString(str: string, isDark = false): string {
  const stringUniqueHash = Array.from(str).reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, ${isDark ? '80%' : '100%'}, ${isDark ? '40%' : '70%'})`;
}

export function truncateAfterWords(str: string, numWords: number): string {
  const words = str.split(' ');
  if (words.length <= numWords) {
    return str;
  }
  return `${words.slice(0, numWords).join(' ')}...`;
}

export function isJsonContentEmpty(json?: JSONContent): boolean {
  return !json?.content?.[0].content;
}

export function generateRandString(length = 5) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getVoteColor(
  theme: Theme,
  voteType: 'up' | 'down',
  existingVote?: 'up' | 'down'
): string {
  if (voteType === 'up' && existingVote === 'up') {
    return theme.palette.success.main;
  }
  if (voteType === 'down' && existingVote === 'down') {
    return theme.palette.error.main;
  }
  return theme.palette.text.primary;
}

export function getVersionProgress(version: Version) {
  return 50 * clamp((version.upvotes - version.downvotes) / version.threshold, -1, 1) + 50;
}

export function getRemainingSupporters(version: Version) {
  return Math.max(0, version.threshold - version.upvotes + version.downvotes);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function calcTimeAgoFromDate(
  stringDate: string,
  t: TFunction<'translation', undefined>
): string {
  const seconds = Math.floor((new Date().getTime() - new Date(stringDate).getTime()) / 1000);
  let interval = seconds / (60 * 60 * 24 * 365);
  if (interval > 1) {
    return t('TIME_AGO_YEARS', { count: Math.floor(interval) });
  }
  interval = seconds / (60 * 60 * 24 * 30);
  if (interval > 1) {
    return t('TIME_AGO_MONTHS', { count: Math.floor(interval) });
  }
  interval = seconds / (60 * 60 * 24);
  if (interval > 1) {
    return t('TIME_AGO_DAYS', { count: Math.floor(interval) });
  }
  interval = seconds / (60 * 60);
  if (interval > 1) {
    return t('TIME_AGO_HOURS', { count: Math.floor(interval) });
  }
  interval = seconds / 60;
  if (interval > 1) {
    return t('TIME_AGO_MINUTES', { count: Math.floor(interval) });
  }
  return t(StringBank.TIME_AGO_SECONDS);
}

export function debounce(func: () => void, wait: number): void {
  clearTimeout(Number(sessionStorage.getItem('timeout')));
  sessionStorage.setItem('timeout', `${setTimeout(() => func(), wait)}`);
}
