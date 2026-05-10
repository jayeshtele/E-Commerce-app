const API_BASE_URL = 'https://dummyjson.com'

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Products API failed with status ${response.status}`)
  }

  return response.json()
}

export function fetchProductsApi() {
  return request('/products?limit=0')
}

export function fetchProductByIdApi(productId) {
  return request(`/products/${productId}`)
}

export function fetchCategoriesApi() {
  return request('/products/categories')
}
