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
    fork: string;
    owner: GithubUser;
}

type States = 'empty' | 'loading' | 'error' | 'success';

type GithubContextType = {
    state: States;
    stateMsg: string;
    user: GithubUser | null;
    repositories: GithubRepository[];
    starred: GithubRepository[];
    getUser: (username: string) => Promise<boolean>;
}

const GithubContext = createContext<GithubContextType|undefined>(undefined)

export const GithubProvider = ({children}: {children: React.ReactNode}) => {

    const [user, setUser] = useState<GithubUser | null>(null);
    const [state, setState] = useState<States>('empty');
    const [stateMsg, setStateMsg] = useState('');
    const [repositories, setRepositories] = useState<GithubRepository[]>([]);
    const [starred, setStarred] = useState<GithubRepository[]>([]);

    const getRepositories = useCallback(async (username: string) => {
        if (username==='' || username === user?.login) return false;
        const response = await fetch(`https://api.github.com/users/${username}/repos`)
        if (response.ok) {
            const repositories = await response.json()
            setRepositories(repositories as GithubRepository[])
            return true
        }
        setRepositories([])
        return false
    }, [user])

    const getStarred = useCallback(async (username: string) => {
        if (username==='' || username === user?.login) return false;
        const response = await fetch(`https://api.github.com/users/${username}/starred`)
        if (response.ok) {
            const starred = await response.json()
            setStarred(starred as GithubRepository[])
            return true
        }
        setStarred([])
        return false
    }, [user])

    const getUser = useCallback(async (username: string) => {
        if (username==='' || username === user?.login) return false;

        setState('loading')
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (response.ok) {
            const user = await response.json()
            setUser(user as GithubUser)
            await getRepositories(username);
            await getStarred(username);
            setState('success')
            setStateMsg('');
            return true
        }
        setUser(null)
        setState('error');
        setStateMsg(`Username "${username}" not found`);
        return false
    }, [user])

    

    const provider = {
        state,
        stateMsg,
        user,
        repositories,
        starred,
        getUser,
    }

    return (
        <GithubContext.Provider value={provider}>
            {children}
        </GithubContext.Provider>
    )
}


const useGithub = () => {
    const context = useContext(GithubContext)
    if (!context) {
        throw new Error('useGithub must be used within a GithubProvider')
    }

    return context;
};

export default useGithub;