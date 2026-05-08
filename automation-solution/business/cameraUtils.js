export const getMostExpensive = (products) => {
  return products.reduce((max, product) =>
    product.price > max.price ? product : max
  );
};

export const getTotalPrice = (products) => {
  return products.reduce((sum, product) => sum + product.price, 0);
};

export const filterByPrice = (products, minPrice) => {
  return products.filter(product => product.price >= minPrice);
};

export const hasProduct = (products, name) => {
  return products.some(product => product.name === name);
};

export const sortByPriceDesc = (products) => {
  return [...products].sort((a, b) => b.price - a.price);
};