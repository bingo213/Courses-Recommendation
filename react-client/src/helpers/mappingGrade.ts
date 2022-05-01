import { TableRowProps } from "../components";

export const mappingGrade = (grade: number): TableRowProps['gradeConversion'] => {
    if (grade >= 9) return 'A+';
    if (grade < 9 && grade >= 8.5) return 'A';
    if (grade < 8.5 && grade >= 8) return 'B+';
    if (grade < 8 && grade >= 7) return 'B';
    if (grade < 7 && grade >= 6.5) return 'C+';
    if (grade < 6.5 && grade >= 5.5) return 'C';
    if (grade < 5.5 && grade >= 5) return 'D+';
    if (grade < 5 && grade >= 4) return 'D';
    else return 'F';
  };