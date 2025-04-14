export const EventInitialValue = (updateId, oldData) => {
  return {
    title: updateId ? oldData?.title || "" : "",
    description: updateId ? oldData?.description || "" : "",
    startDate: updateId ? oldData?.startDate || null : null,
    endDate: updateId ? oldData?.endDate || null : null,
    location: updateId ? oldData?.location || null : null,
    mediaIds: updateId ? oldData?.media?.map((media) => media.url) || null : null,
  };
};
