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
    product_thumbnail: updateId ? oldData?.thumbnail || "" : "",
    product_thumbnail_id: updateId ? oldData?.thumbnailId || "" : "",
    product_galleries: updateId ? oldData?.pictures?.map((img) => img) || "" : "",
    product_galleries_id: updateId ? oldData?.pictures?.map((elem) => elem.id) || "" : "",

    //Inventary
    price: updateId ? oldData?.price || "" : "",
    basePrice: updateId ? oldData?.basePrice || "" : "",
    originalPrice: updateId ? oldData?.originalPrice || "" : "0.00",
    permalink: updateId ? oldData?.permalink || "" : "",
  };
}
