import { ProductTabTitleListData } from "@/Data/TabTitleListData";

export const generateTitleList = (values) => {
  return ProductTabTitleListData.filter((tab) => tab);
};
