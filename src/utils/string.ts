export function getInitials(name: string): string {
    const names = name.split(' ');

    if (names.length === 1) return names[0][0].toUpperCase();
    
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};