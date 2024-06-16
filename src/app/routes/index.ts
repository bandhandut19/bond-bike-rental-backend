import express from 'express'
import { AuthRoutes, UsersRoutes } from '../modules/User/user.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UsersRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
