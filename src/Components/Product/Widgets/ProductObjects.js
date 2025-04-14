import {
  discountSchema,
  ifTypeSimpleSchema,
  nameSchema,
} from "@/Utils/Validation/ValidationSchemas";

export const ProductValidationSchema = {
  title: nameSchema,
  price: ifTypeSimpleSchema,
  originalPrice: discountSchema,
};

export function ProductInitValues(oldData, updateId) {
  return {
    // General
    mlId: updateId ? oldData?.mlId || "" : "",
    siteId: updateId ? oldData?.siteId || "" : "",
    title: updateId ? oldData?.title || "" : "",

    // Product Images
    thumbnail: updateId ? oldData?.thumbnail || "" : "",
    pictures: updateId ? oldData?.pictures?.map((elem) => elem.secureUrl) || [] : [],

    //Inventary
    price: updateId ? oldData?.price || "" : "",
    basePrice: updateId ? oldData?.basePrice || "" : "",
    originalPrice: updateId ? oldData?.originalPrice || "" : "0.00",
    permalink: updateId ? oldData?.permalink || "" : "",
  };
}
