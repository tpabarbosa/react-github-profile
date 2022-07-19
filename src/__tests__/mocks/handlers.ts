import { rest } from 'msw'
import {completeUser, repos} from './mockUseGithub'

export const handlers = [
    // Mock a existent user
    rest.get('https://api.github.com/users/testuser', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(completeUser),
        )
    }),
    // Mock user repositories
    rest.get('https://api.github.com/users/testuser/repos', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(repos),
        )
    }),
    // Mock user starred
    rest.get('https://api.github.com/users/testuser/starred', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(repos),
        )
    }),
    // Mock a existent user
    rest.get('https://api.github.com/users/testusererror', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(completeUser),
        )
    }),
    // Mock user error getting repositories
    rest.get('https://api.github.com/users/testusererror/repos', (req, res, ctx) => {
        return res(
            ctx.status(500),
            ctx.json([]),
        )
    }),
    // Mock user error getting starred
    rest.get('https://api.github.com/users/testusererror/starred', (req, res, ctx) => {
        return res(
            ctx.status(500),
            ctx.json([]),
        )
    }),
    // Mock github user profile
    rest.get('https://github.com/testuser', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(completeUser),
        )
    }),
    // Mock github user repository
    rest.get('https://github.com/testuser/repository-name', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({message: 'repository html_url is working'}),
        )
    }),
    // Mock github user avatar
    rest.get('https://avatars.githubusercontent.com/u/testuser_id', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({message: 'avatar_url is working'}),
        )
    }),
    // Mock user blog
    rest.get('https://testuser.com', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({message: 'blog link is working'}),
        )
    }),
    // Mock repository homepage
    rest.get('https://repository.homepage.com', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({message: 'repository homepage link is working'}),
        )
    }),
    // Mock an inexistent user
    rest.get('https://api.github.com/users/inexistentuser', (req, res, ctx) => {
        return res(
            ctx.status(404),
            ctx.json({message: 'user not found'}),
        )
    }),
    // Mock an 500 error
    rest.get('https://api.github.com/users/mockservererror', (req, res, ctx) => {
        return res(
            ctx.status(500),
            ctx.json({message: 'Server Error'}),
        )
    }),
]