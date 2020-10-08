// @flow

import onetime from 'onetime'

// Some of this functions are borrowed from https://github.com/sindresorhus/refined-github/blob/master/source/libs/page-detect.js

// Drops leading and trailing slash to avoid /\/?/ everywhere
const getCleanPathname = () => location.pathname.replace(/^[/]|[/]$/g, '')

// '/user/repo/.../...' -> 'user/repo'
// eslint-disable-next-line no-warning-comments
// FIXME TODO: I noticed much later that maybe this could simply be:
// `JSON.parse(document.body.dataset.currentRepo).fullslug`
// Confirm, compare perf and replace if better.
export const getRepoURL = onetime(() =>
    location.pathname
        .slice(1)
        .split('/', 2)
        .join('/')
)

const getRepoPath = () => {
    const match = /^[^/]+[/][^/]+[/]?(.*)$/.exec(getCleanPathname())
    return (match && match[1]) || ''
}

export const isCreatePullRequestURL = () =>
    getRepoPath() === 'pull-requests/new'

export const isEditPullRequestURL = () =>
    getRepoPath().startsWith('pull-requests/update')