export const generateRandomId = (): string => {
  return `#${Math.floor(100000000 + Math.random() * 900000000)}`;
};

export const getRandomGrade = (): 'VII A' | 'VII B' | 'VII C' => {
  const grades: ('VII A' | 'VII B' | 'VII C')[] = ['VII A', 'VII B', 'VII C'];
  const randomIndex = Math.floor(Math.random() * grades.length);
  
  return grades[randomIndex];
};

const gradeColors: Record<string, string> = {
  'VII A': '#FB7D5B',  
  'VII B': '#FCC43E',     
  'VII C': '#4D44B5',      
};

export const getGradeColor = (grade: string): string => {
  return gradeColors[grade] || 'E0E0FF';
}