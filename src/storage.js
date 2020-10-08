// @flow
/* global chrome */

import { getRepoURL } from './page-detect'

export const getDefaultReviewersStorageKey = () =>
    `_rbb-default-reviewers.${getRepoURL()}`

export const getDashboardPullRequestsStorageKey = actionId =>
    `_rbb-dashboard-pull-requests_${actionId}`

export function getStorageSyncValue(key: string) {
    return new Promise(resolve => {
        ;(chrome.storage: any).sync.get(key, result => {
            resolve(result[key])
        })
    })
}

export function setStorageSyncValue(key: string, value: any) {
    return new Promise(resolve => {
        ;(chrome.storage: any).sync.set({ [key]: value }, () => {
            resolve()
        })
    })
}

export function getStorageLocalValue(key: string) {
    return new Promise(resolve => {
        ;(chrome.storage: any).local.get(key, result => {
            resolve(result[key])
        })
    })
}

export function setStorageLocalValue(key: string, value: any) {
    return new Promise(resolve => {
        ;(chrome.storage: any).local.set({ [key]: value }, () => {
            resolve()
        })
    })
}
