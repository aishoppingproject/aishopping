import axios from 'axios'
// import qs from 'qs'

const Util = {
  host: 'http://ec2-52-18-155-175.eu-west-1.compute.amazonaws.com/api/'
}

const request = axios.create({
  baseURL: Util.host
})

request.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export default {
  getBrands (page) {
    return request.get('brands?page=' + page)
  },
  getBrand (id) {
    return request.get('brands/' + id)
  },
  getDiscovers (page) {
    return request.get('discovers?page=' + page)
  },
  getDiscover (id) {
    return request.get('discovers/' + id)
  },
  getDeals (page) {
    return request.get('products?page=' + page)
  },
  getDeal (id) {
    return request.get('products/' + id)
  },
  getShops (page) {
    return request.get('products?page=' + page)
  },
  getShop (id) {
    return request.get('products/' + id)
  },
  getNavigos (page) {
    return request.get('itineraries?page=' + page)
  },
  getNavigo (id) {
    return request.get('itineraries/' + id)
  },
  getCategories () {
    return request.get('categories')
  },
  getCategoriesId (id) {
    return request.get('categories/' + id)
  },
  getCarousel () {
    return request.get('carousel')
  },
  brands () {
    return request.get('brands')
  }
}
