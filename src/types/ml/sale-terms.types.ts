import { MLStruct, MLValue } from './attributes.types';

export interface MLSaleTerm {
  id: number;
  termId: string;
  name: string;
  valueId: string | null;
  valueName: string;
  valueStruct: MLStruct | null;
  values: MLValue[];
  valueType: string;
  productId: number;
}

export interface MLOriginalSaleTerm {
  id: string;
  name: string;
  value_id: string | null;
  value_name: string;
  value_struct: MLStruct | null;
  values: {
    id: string | null;
    name: string;
    struct: MLStruct | null;
  }[];
  value_type: string;
}