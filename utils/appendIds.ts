export const appendIds = async (
  currentIds: number[],
  // currentPayload: any,
  // modelName: string,
  // isUpdate = false,
) => {
  let result = [];

  if (currentIds?.length > 0) {
    currentIds.forEach((id) => {
      result.push({
        id,
      });
    });
  }

  return result;

  // let payload = {
  //   data: {
  //     ...currentPayload,
  //     [modelName]: {
  //       connect: result,
  //     },
  //   },
  // };

  // if (isUpdate) {
  //   payload = {
  //     ...currentPayload,
  //     [modelName]: {
  //       connect: result,
  //     },
  //   };
  // }

  return result;
};
