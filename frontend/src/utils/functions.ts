import { Theme } from '@mui/material';
import { JSONContent } from '@tiptap/react';
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

export function calcTimeAgoFromDate(stringDate: string) {
  const date = new Date(stringDate);
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const givenYear = date.getFullYear();

  const currentMonth = currentDate.getMonth() + 1;
  const givenMonth = date.getMonth() + 1;

  const currentDay = currentDate.getDay();
  const givenDay = date.getDay();

  const givenHour = date.getHours();
  const currentHour = currentDate.getHours();

  const givenMinutes = date.getMinutes();
  const currentMinutes = currentDate.getMinutes();

  const givenSecs = date.getSeconds();
  const currentSecs = currentDate.getSeconds();

  const yearsDiff = currentYear - givenYear;
  console.log('yearsDiff', yearsDiff);
  if (yearsDiff > 0) {
    return `${yearsDiff} years ago`;
  }
  const monthDiff = currentMonth - givenMonth;
  console.log('monthDiff', monthDiff);
  if (currentMonth - givenMonth > 0) {
    return `${monthDiff} months ago`;
  }

  const daysDiff = currentDay - givenDay;
  console.log('daysDiff', daysDiff);
  if (daysDiff > 0) {
    return `${daysDiff} days ago`;
  }

  const hoursDiff = currentHour - givenHour;
  if (hoursDiff > 0) {
    return `${hoursDiff} hours ago`;
  }

  const minDiff = currentMinutes - givenMinutes;
  if (minDiff > 0) {
    return `${minDiff} minutes ago`;
  }

  const secDiff = currentSecs - givenSecs;
  if (secDiff > 0) {
    return `${secDiff} seconds ago`;
  }
}
