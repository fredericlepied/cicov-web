// -*- rjsx -*-

// api.js | keep the network code in a dedicated module
import Axios from 'axios';

const api = 'http://127.0.0.1:8000';

function fetchProducts() {
    return Axios.get(api + '/products');
}

function fetchProductDetail(id) {
    return Axios.get(api + '/product/' + id + '/');
}

export { fetchProducts, fetchProductDetail }
