export interface MLCity {
  id: string;
  name: string;
}

export interface MLState {
  id: string;
  name: string;
}

export interface MLCountry {
  id: string;
  name: string;
}

export interface MLSearchLocation {
  city: MLCity;
  state: MLState;
}

export interface MLSellerAddress {
  city: MLCity;
  state: MLState;
  country: MLCountry;
  search_location: MLSearchLocation;
  id: number;
}

export interface MLLocation {
  // Empty object in the provided JSON
}