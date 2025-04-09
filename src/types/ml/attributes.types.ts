export interface MLStruct {
  number: number;
  unit: string;
}

export interface MLValue {
  id: string | null;
  name: string;
  struct: MLStruct | null;
}

export interface MLAttribute {
  id: number;
  attributeId: string;
  name: string;
  valueId: string | null;
  valueName: string;
  valueStruct: MLStruct | null;
  values: MLValue[];
  valueType: string;
  productId: number;
}

// Original attribute format from Mercado Libre
export interface MLOriginalAttribute {
  id: string;
  name: string;
  value_id: string | null;
  value_name: string;
  values: {
    id: string | null;
    name: string;
    struct: MLStruct | null;
  }[];
  value_type: string;
}