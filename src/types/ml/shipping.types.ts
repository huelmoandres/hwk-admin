export interface MLShipping {
  mode: string;
  methods: any[]; // Empty array in the provided JSON
  tags: string[];
  dimensions: null;
  local_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: string;
  store_pick_up: boolean;
}