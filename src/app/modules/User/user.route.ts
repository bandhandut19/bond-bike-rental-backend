import express from 'express'

const authRouter = express.Router()

authRouter.post('/signup')
authRouter.post('/login')

export const AuthRoutes = authRouter

const usersRouter = express.Router()

usersRouter.get('/me')
usersRouter.put('/me')

export const UsersRoutes = usersRouter
