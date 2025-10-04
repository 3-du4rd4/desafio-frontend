export function formatDate(
    dateString: string, format: 'long' | 'full' = 'long'
): string {
    let year: number, month: number, day: number;

    const dateParts = dateString.includes('/') ? dateString.split('/') : dateString.split('-');

    if (dateParts[0].length === 4) {
        [year, month, day] = dateParts.map(Number);
    } else {
        [day, month, year] = dateParts.map(Number);
    }

    const date = new Date(year, month - 1, day);

    return format === 'long'
        ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
        : date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}