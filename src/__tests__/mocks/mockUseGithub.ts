import useGithub, { GithubContextType, GithubRepository } from '../../contexts/Github';

export enum MockedUseGithubType {
    EMPTY,
    ERROR,
    LOADING,
    SUCCESS_COMPLETE_DATA,
    SUCCESS_INCOMPLETE_DATA,
}

export const completeUser = {
    login: 'testuser',
    name: 'Test User Name',
    html_url: 'https://github.com/testuser',
    avatar_url: 'https://avatars.githubusercontent.com/u/testuser_id?v=4',
    type: 'User',
    bio: 'Test User Bio',
    company: 'a company',
    location: 'some location',
    email: 'testuser@test.com',
    blog: 'https://testuser.com',
    public_repos: 5,
    public_gists: 2,
    followers: 10,
    following: 12,
    created_at: new Date('2020-01-01T15:01:01Z'),
}

export const incompleteUser = {
    login: 'testuser',
    name: '',
    html_url: 'https://github.com/testuser',
    avatar_url: 'https://avatars.githubusercontent.com/u/testuser_id?v=4',
    type: 'User',
    bio: '',
    company: '',
    location: '',
    email: '',
    blog: '',
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: new Date('2020-01-01T15:01:01Z'),
}

export const repos = [
    {
        id: 100001,
        name: 'repository-name',
        full_name: 'testuser/repository-name',
        description: 'repository description',
        html_url: 'https://github.com/testuser/repository-name',
        created_at: new Date('2020-01-01T15:01:01Z'),
        updated_at: new Date('2020-02-01T15:01:01Z'),
        homepage: 'https://repository.homepage.com',
        stargazers_count: 5,
        watchers_count: 8,
        forks_count: 10,
        open_issues_count: 12,
        language: 'Coding Language',
        fork: false,
        owner: completeUser,
    },
    {
        id: 100002,
        name: 'repository-name2',
        full_name: 'testuser/repository-name2',
        description: 'repository description2',
        html_url: 'https://github.com/testuser/repository-name2',
        created_at: new Date('2020-01-01T15:01:01Z'),
        updated_at: new Date('2020-02-01T15:01:01Z'),
        homepage: 'https://repository2.homepage.com',
        stargazers_count: 6,
        watchers_count: 9,
        forks_count: 11,
        open_issues_count: 13,
        language: 'Coding Language 2',
        fork: false,
        owner: incompleteUser,
    }
] as GithubRepository[]


const emptyUser = {
        state: 'empty',
        stateMsg: '',
        user: null,
        repositories: [],
        starred: [],
        getUser: jest.fn().mockResolvedValue(true)
    } as GithubContextType

const errorUser = {
        state: 'error',
        stateMsg: `Error Message`,
        user: null,
        repositories: [],
        starred: [],
        getUser: jest.fn().mockResolvedValue(false)
    } as GithubContextType

const loadingUser = {
        state: 'loading',
        stateMsg: '',
        user: null,
        repositories: [],
        starred: [],
        getUser: jest.fn().mockResolvedValue(false)
    } as GithubContextType

export const successCompleteUser = {
        state: 'success',
        stateMsg: '',
        user: completeUser,
        repositories: repos,
        starred: repos,
        getUser: jest.fn().mockResolvedValue(false)
    } as GithubContextType

export const successIncompleteUser = {
        state: 'success',
        stateMsg: '',
        user: incompleteUser,
        repositories: [],
        starred: [],
        getUser: jest.fn().mockResolvedValue(false)
    } as GithubContextType

const mockedUseGithub = (type: MockedUseGithubType) => {

    const mock = useGithub as jest.MockedFunction<typeof useGithub>

    switch (type) {
        case MockedUseGithubType.EMPTY:
            mock.mockReturnValue(emptyUser)
            break;
        case MockedUseGithubType.ERROR:
            mock.mockReturnValue(errorUser)
            break;
        case MockedUseGithubType.LOADING:
            mock.mockReturnValue(loadingUser)
            break;
        case MockedUseGithubType.SUCCESS_COMPLETE_DATA:
            mock.mockReturnValue(successCompleteUser)
            break;
        case MockedUseGithubType.SUCCESS_INCOMPLETE_DATA:
            mock.mockReturnValue(successIncompleteUser)
            break;
        default:
            mock.mockReturnValue(emptyUser)
    }

    return mock
}

export default mockedUseGithub;