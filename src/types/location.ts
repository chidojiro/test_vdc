export type ILocationType =
  | 'City'
  | 'Region'
  | 'State'
  | 'Province'
  | 'Country'
  | 'Continent';

export interface ILocation {
  title: string;
  location_type: ILocationType;
  latt_long: string;
  woeid: number;
  distance?: number;
}
