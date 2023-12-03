export const getOrders = () => {
  return fetch("https://localhost:44352/api/Order/statistic").then((res) =>
    res.json()
  );
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getAnimails = () => {
  return fetch("https://localhost:44352/api/Animal/total").then((res) =>
    res.json()
  );
};

export const getEmployee = () => {
  return fetch("https://localhost:44352/api/User/total").then((res) =>
    res.json()
  );
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
