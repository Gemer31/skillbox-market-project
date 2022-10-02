// eslint-disable-next-line import/prefer-default-export
export function parseErrorMessage(error) {
  return error.response?.data?.error?.message
    || Object.values(error.response?.data?.error?.query || error.response?.data?.error?.request)?.[0];
}
