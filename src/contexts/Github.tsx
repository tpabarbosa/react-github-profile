import {createContext, useCallback, useState} from 'react';

import { useContext } from "react";

export type GithubUser = {
    login: string;
    name: string;
    html_url: string;
    avatar_url: string;
    type: 'User' | 'Organization';
    bio: string;
    company: string;
    location: string;
    email: string;
    blog: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date;
}

export type GithubRepository = {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    created_at: Date;
    updated_at: Date;
    homepage: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    language: string;
    fork: boolean;
    owner: GithubUser;
}

type States = 'empty' | 'loading' | 'error' | 'success';

export type GithubContextType = {
    state: States;
    stateMsg: string;
    user: GithubUser | null;
    repositories: GithubRepository[];
    starred: GithubRepository[];
    getUser: (username: string) => Promise<boolean>;
}

const GithubContext = createContext<GithubContextType|undefined>(undefined)

const initialData: Omit<GithubContextType, 'getUser'> = {
    user: null,
    state: 'empty',
    stateMsg: '',
    repositories: [],
    starred: [],
}

export const GithubProvider = ({children}: {children: React.ReactNode}) => {

    const [contextData, setContextData] = useState(initialData);
    const [cache, setCache] = useState<Omit<GithubContextType, 'getUser'>[]>([])


    const getRepositories = useCallback(async (username: string) => {
        const response = await fetch(`https://api.github.com/users/${username}/repos`)
        if (response.ok) {
            const repositories = await response.json()
            return repositories as GithubRepository[]
        }
        return [] as GithubRepository[]
    }, [])

    const getStarred = useCallback(async (username: string) => {
        
        const response = await fetch(`https://api.github.com/users/${username}/starred`)
        if (response.ok) {
            const starred = await response.json()
            return starred as GithubRepository[]
        }
        return [] as GithubRepository[]
    }, [])

    const getUser = useCallback(async (username: string) => {
        const cachedUser = cache.filter(user => user.user?.login === username)
        if (cachedUser.length > 0) {
            setContextData(cachedUser[0])
            return true
        } 
        
        setContextData({...contextData, state: 'loading'})
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (response.ok) {
            const user = await response.json() as GithubUser
            const repositories = await getRepositories(username);
            const starred = await getStarred(username);

            const newUser = {
                user,
                repositories,
                starred,
                state: 'success',
                stateMsg: '',
            } as Omit<GithubContextType, 'getUser'>

            setContextData(newUser)
            setCache([...cache, newUser])
            return true
        }

        const newUser = {...initialData} as Omit<GithubContextType, 'getUser'>
        if (response.status === 404) {
            setContextData({
                ...newUser, 
                state: 'error', 
                stateMsg: `Username "${username}" not found`
            })
        } else {
            setContextData({
                ...newUser, 
                state: 'error', 
                stateMsg: 'Something went wrong. Please try another username or try again later.'
            })
        }
        setCache([...cache, newUser])
        return false
    }, [cache, contextData, getRepositories, getStarred])

    const provider = {
        ...contextData,
        getUser,
    }

    return (
        <GithubContext.Provider value={provider}>
            {children}
        </GithubContext.Provider>
    )
}


const useGithub = (caller: string = '') => {
    const context = useContext(GithubContext)
    if (!context) {
        throw new Error('useGithub must be used within a GithubProvider')
    }

    return context;
};

export default useGithub;