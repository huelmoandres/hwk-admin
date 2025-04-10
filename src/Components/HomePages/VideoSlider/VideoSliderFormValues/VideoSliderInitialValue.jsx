const VideoSliderInitialValue = (data) => {
  let obj = {};
  data?.content?.home_banner?.banners?.length > 0 &&
    data?.content?.home_banner?.banners?.forEach((elem, index) => {
      elem.image_url ? (obj[`homeBannerImage${index}`] = { original_url: elem.image_url }) : "";
      elem?.redirect_link
        ? (obj[`homeRedirectLinkType${index}`] = elem?.redirect_link?.link_type)
        : "";
      elem?.redirect_link ? (obj[`homeRedirectLink${index}`] = elem?.redirect_link?.link) : "";
      return obj;
    });

  data?.content?.social_media?.banners?.length > 0 &&
    data?.content?.social_media?.banners?.forEach((elem, index) => {
      elem.image_url
        ? (obj[`socialMediaBannerImage${index}`] = { original_url: elem.image_url })
        : "";
      elem?.redirect_link
        ? (obj[`socialMediaRedirectLinkType${index}`] = elem?.redirect_link?.link_type)
        : "";
      elem?.redirect_link
        ? (obj[`socialMediaRedirectLink${index}`] = elem?.redirect_link?.link)
        : "";
      return obj;
    });

  data?.content?.services?.banners?.length > 0 &&
    data?.content?.services?.banners?.forEach((elem, index) => {
      elem.image_url ? (obj[`serviceBannerImage${index}`] = { original_url: elem.image_url }) : "";
      return obj;
    });

  return {
    content: data?.content,
    sequence: data?.sequence,
    slug: data?.slug,

    // Redirect Link
    collectionBanner1LinkType:
      data?.content?.collection_banner?.banner_1?.redirect_link?.link_type || "",
    collectionBanner1Link: data?.content?.collection_banner?.banner_1?.redirect_link?.link || "",

    collectionBanner2LinkType:
      data?.content?.collection_banner?.banner_2?.redirect_link?.link_type || "",
    collectionBanner2Link: data?.content?.collection_banner?.banner_2?.redirect_link?.link || "",

    collectionBanner3LinkType:
      data?.content?.collection_banner?.banner_3?.redirect_link?.link_type || "",
    collectionBanner3Link: data?.content?.collection_banner?.banner_3?.redirect_link?.link || "",

    // Images

    fullBannerImage: data?.content?.parallax_banner?.image_url
      ? { original_url: data?.content?.parallax_banner?.image_url }
      : "",

    collectionBanner1Image: data?.content?.collection_banner?.banner_1?.image_url
      ? { original_url: data?.content?.collection_banner?.banner_1?.image_url }
      : "",
    collectionBanner2Image: data?.content?.collection_banner?.banner_2?.image_url
      ? { original_url: data?.content?.collection_banner?.banner_2?.image_url }
      : "",
    collectionBanner3Image: data?.content?.collection_banner?.banner_3?.image_url
      ? { original_url: data?.content?.collection_banner?.banner_3?.image_url }
      : "",

    ...obj,

    //MultiSelect
    productList1Product: data?.content?.products_list?.product_ids || [],

    productCategory: data?.content?.category_product?.category_ids || [],

    featuredBlogList: data?.content?.featured_blogs?.blog_ids || [],

    brandItems: data?.content?.brand?.brand_ids || [],
  };
};

export default VideoSliderInitialValue;
