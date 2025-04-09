export const StoreInitialValue = (updateId, oldData) => {
  return {
    name: updateId ? oldData?.name || "" : "",
    stateId: updateId ? oldData?.state?.id || "" : "",
    address: updateId ? oldData?.address || "" : "",
    phone: updateId ? oldData?.phone || null : null,
    phoneCode: updateId ? oldData?.phoneCode || null : null,
    hours: updateId ? oldData?.hours || null : null,
  };
};
