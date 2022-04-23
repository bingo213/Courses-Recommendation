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