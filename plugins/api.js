import { ERROR } from '~/store/alert'
import { SET_ERROR } from '~/store/error'
import Cookies from '~/services/cookies.service'

/**
 * Service to call HTTP request via Axios
 */
export default (context, inject) => {
  inject('query', (resource, params) => {
    return new Promise((resolve, reject) => {
      getAxios(context)
        .get(`${resource}`, { params })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          handleError(error)
          reject(error)
        })
    })
  })

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  inject('get', (resource, slug = '', params = null) => {
    return new Promise((resolve, reject) => {
      getAxios(context)
        .get(`${resource}/${slug}`, { params })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          handleError(error)
          reject(error)
        })
    })
  })

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  inject('post', (resource, params) => {
    return new Promise((resolve, reject) => {
      getAxios(context)
        .post(`${resource}`, params)
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          handleError(error)
          reject(error)
        })
    })
  })

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  inject('update', (resource, slug, params) => {
    return new Promise((resolve, reject) => {
      getAxios(context)
        .$axios.put(`${resource}/${slug}`, params)
        .then((data) => {
          resolve(data.data)
        })
        .catch((error) => {
          handleError(error)
          reject(error)
        })
    })
  })

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  inject('put', (resource, params) => {
    return new Promise((resolve, reject) => {
      getAxios(context)
        .put(`${resource}`, params)
        .then((data) => {
          resolve(data.data)
        })
        .catch((error) => {
          handleError(error)
          reject(error)
        })
    })
  })

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  inject('delete', (resource) => {
    return new Promise((resolve, reject) => {
      getAxios(context)
        .delete(resource)
        .then((data) => {
          resolve(data.data)
        })
        .catch((error) => {
          handleError(error)
          reject(error)
        })
    })
  })

  function getAxios(context) {
    configRequest(context)
    return context.app.$axios
  }

  function configRequest(context) {
    const token = Cookies.getToken()
    if (token) {
      context.app.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }

  function handleError(error) {
    if (error && error.response) {
      const statusCode = error.response.status
      if (statusCode === 500) {
        context.store.commit(`error/${SET_ERROR}`, true)
        // context.redirect("/error-500");
      } else if (statusCode === 401) {
        context.store.commit(`error/${SET_ERROR}`, false)
        Cookies.destroyToken()
        context.store.dispatch(`alert/${ERROR}`, error.response.data.message, {
          root: true,
        })
        // context.redirect("/auth/login");
      } else if (statusCode === 400) {
        context.store.dispatch(`alert/${ERROR}`, error.response.data.message, {
          root: true,
        })
      } else if (statusCode === 422) {
        context.store.dispatch(`alert/${ERROR}`, error.response.data.message, {
          root: true,
        })
      }
    }
  }
}
// export default ApiService;
