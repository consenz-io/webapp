import { JSONContent } from '@tiptap/react';

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
