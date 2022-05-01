import { TableRowProps } from '../components';
import { IPrediction } from '../interfaces';
import { mappingGrade } from './mappingGrade';

export const cookPrediction = (
  prediction: IPrediction,
  t: any
): TableRowProps => {
  return {
    courseId: prediction.courseId,
    courseName: t(prediction.courseName),
    grade: +prediction.predictedGrade.toFixed(2),
    gradeConversion: mappingGrade(+prediction.predictedGrade.toFixed(2)),
  };
};
