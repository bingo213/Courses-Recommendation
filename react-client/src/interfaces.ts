export interface IRegionItem {
  key: string;
  name: string;
  flag: React.ReactElement;
}

export interface IRegion {
  [key: string]: IRegionItem;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IOrientation {
  id: string;
  orientationName: string;
}

export interface IOrientationResponse {
  orientations: IOrientation[];
}

export interface ICourse {
  courseId: string;
  courseName: string;
}

export interface ICourseResponse {
  courses: ICourse[];
}

export interface IRecommendRequest {
  numberOfCourses: number;
  orientations?: string[];
}

export interface IRecommendation {
  courseId: string;
  courseName: string;
  predictedGrade: number;
  orientationId: string;
  orientationName: string;
}
export interface IRecommendationResponse {
  recommendations: IRecommendation[];
}

export type IPrediction = IRecommendation;

export interface IPredictionResponse {
  predictions: IPrediction[];
}

export interface IUpdateRequest {
  fullName?: string;
  dateOfBirth?: string;
  email?: string;
  className?: string;
  phoneNumber?: string;
}

export interface IGrade {
  courseId: string;
  courseName: string;
  grade: number;
}

export interface IGradeResponse {
  grades: IGrade[];
  gradeAverage: number;

}