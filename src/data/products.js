const apiKey = 'om5w8gx4txirj4vkocick5qd';
const axios = require('axios');
const fetch = require('node-fetch');

async function fetchProducts() {
  const response = await axios.get('https://openapi.etsy.com/v2/shops/claiijewellery/listings/active?api_key='+apiKey)
  return response.data.results
}

async function fetchProductImage(listingId) {
  const response = axios.get('https://openapi.etsy.com/v2/listings/'+listingId+'/images?api_key='+apiKey);
  console.log(response)
  return response.data.results
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchProductImages(products, throttle) {
  let images = []
  for(const product of products) {
    try {
      const response = await axios.get('https://openapi.etsy.com/v2/listings/'+product.listing_id+'/images?api_key='+apiKey);
      images.push( { listingId: product.listing_id, data: response.data.results[0] });
    } catch (err) {
      images.push({});
    }
    await timeout(throttle);
  }
  return images
}

async function buildProductData() {
  const products = await fetchProducts();
  const images = await fetchProductImages(products, 120);

  let productsWithImages = products

  products.map( (product, index, products) => {
    const image = images.filter( image => image.listingId == product.listing_id )
    productsWithImages[index]['image'] = image[0].data
  });
  //console.log( productsWithImages )
  return productsWithImages
}

module.exports = function () {
  data = buildProductData()
  //console.log(data)
  return data
}
