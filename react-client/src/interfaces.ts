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
  msg: string;
  orientations: IOrientation[];
}

export interface IRecommendRequest {
  numberOfCourses: number;
  orientations?: string[];
}