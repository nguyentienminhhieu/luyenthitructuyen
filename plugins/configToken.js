import Cookies from '~/services/cookies.service.js'

// Định nghĩa hàm getAuthorizationConfig
export const getAuthorizationConfig = () => {
  const token = Cookies.getToken()

  if (!token) {
    throw new Error('Không có token xác thực.')
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}
