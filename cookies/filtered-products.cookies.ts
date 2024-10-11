import { FilterProductsDto } from '@/interfaces/filter-products-dto';
import axios from 'axios';
import Cookies from 'js-cookie';
import { emitCookieChangeEvent } from './cookies-change';

export const getProductsFiltered = async (query: FilterProductsDto) => {
  try {
    console.log('Sending filters:', query);
    const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/products/filter', {
      params: query
    });

    localStorage.setItem('filteredProducts', JSON.stringify(response.data));

    if (query.category) {
      removeQueryTypes();
      Cookies.set('category', JSON.stringify(query.category), {
        path: '/',
      });
    }

    if (query.search) {
      removeQueryTypes();
      Cookies.set('search', JSON.stringify(query.search), {
        path: '/',
      });
    }

    if (query.priceMax) {
      removeQueryTypes();
      Cookies.set('priceMax', JSON.stringify(query.priceMax), {
        path: '/',
      });
    }

    if (query.priceMin) {
      removeQueryTypes();
      Cookies.set('priceMin', JSON.stringify(query.priceMin), {
        path: '/',
      });
    }

    emitCookieChangeEvent();

    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};

const removeQueryTypes = () => {
  Cookies.remove('search', { path: '/' });
  Cookies.remove('category', { path: '/' });
  Cookies.remove('priceMax', { path: '/' });
  Cookies.remove('priceMin', { path: '/' });
}

export const getFilteredProductsFromCookie = () => {
  const storedProducts = Cookies.get('filteredProducts');

  if (storedProducts) {
    try {
      return JSON.parse(storedProducts);
    } catch (error) {
      console.error('Failed to parse stored products:', error);
      return [];
    }
  }
  return [];
};

export const getQueryTypeFromCookie = () => {
  var queryType = undefined;

  const search = Cookies.get('search');
  const category = Cookies.get('category');
  const priceMax = Cookies.get('priceMax');
  const priceMin = Cookies.get('priceMin');

  if (search) {
    const value = JSON.parse(search);
    queryType = 'búsqueda por PALABRAS CLAVES';
    return {queryType, value}
  }
  if (category) {
    const value = JSON.parse(category)
    queryType = 'búsqueda por CATEGORÍA';
    return {queryType, value}
  }
  if (priceMax) {
    const value = JSON.parse(priceMax)
    queryType = 'búsqueda por PRECIO MÁXIMO';
    return {queryType, value}
  }
  if (priceMin) {
    const value = JSON.parse(priceMin)
    queryType = 'búsqueda por PRECIO MÍNIMO';
    return {queryType, value}
  }
}

export const clearFilteredProductsCookie = () => {
  console.log('clearing')
  Cookies.remove('filteredProducts', { path: '/' });
  emitCookieChangeEvent(); 
};