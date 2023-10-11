export const mockFetch = (data, status = 200) => {
  return Promise.resolve({
    json: () => Promise.resolve(data),
    status,
  });
};
