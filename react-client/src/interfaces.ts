export interface IRegionItem {
    key: string;
    name: string;
    flag: React.ReactElement;
  }
  
  export interface IRegion {
    [key: string]: IRegionItem;
  }