import Cookies from '@/services/cookies.service'

export default function ({ route, redirect }) {
  const token = Cookies.getToken()

  if (!token) {
    if (
      route.path !== '/login' &&
      route.path !== '/register' &&
      route.path !== '/forgot-password'
    ) {
      return redirect('/login')
    }
  } else if (
    route.path === '/login' ||
    route.path === '/register' ||
    route.path === '/forgot-password'
  ) {
    return redirect('/admin')
  }
}
