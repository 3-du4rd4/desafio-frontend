export function getInitials(name: string) {
  if (!name) return '';

  const names = name.trim().split(/\s+/);

  if (names.length === 1) return names[0][0].toUpperCase();
  
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}