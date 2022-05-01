import { TAG_COLOR } from '../atoms';
import { TableRowProps } from '../components';
import { IOrientation, IRecommendation } from '../interfaces';

export interface CookedOrientationProps extends IOrientation {
  color: string;
}

export const cookOrientations = (
  orientations: IOrientation[]
): CookedOrientationProps[] => {
  return orientations.map((o, index) => {
    return {
      id: o.id,
      orientationName: o.orientationName,
      color: TAG_COLOR[index],
    };
  });
};

export const cookRecommendation = (
  recommendation: IRecommendation,
  color: string,
  t: any
): TableRowProps => {
  return {
      courseId: recommendation.courseId,
      courseName: t(recommendation.courseName),
      grade: +recommendation.predictedGrade.toFixed(2),
      orientation: {
          title: t(recommendation.orientationName),
          color
      }
  }
};
