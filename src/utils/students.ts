export const generateRandomId = (): string => {
  return `#${Math.floor(100000000 + Math.random() * 900000000)}`;
};

export const getRandomGrade = (): 'VII A' | 'VII B' | 'VII C' => {
  const grades: ('VII A' | 'VII B' | 'VII C')[] = ['VII A', 'VII B', 'VII C'];
  const randomIndex = Math.floor(Math.random() * grades.length);
  
  return grades[randomIndex];
};