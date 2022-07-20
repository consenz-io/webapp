export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateColorFromString(str: string, isDark = false): string {
  const stringUniqueHash = Array.from(str).reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, ${isDark ? '80%' : '100%'}, ${isDark ? '40%' : '70%'})`;
}
