const getHash = require('./utils/getHash');
const products = require('./dummy/products.json');

const productsWithMap = products.map((product) => ({
    ...product,
    hash: getHash(`${product.id}${product.price}${process.env.HASH_CONTROL}`)
}));

console.log('products with hash', productsWithMap);

