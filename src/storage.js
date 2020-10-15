// @flow
/* global chrome */

import { getRepoURL } from './page-detect'

export const getDefaultReviewersStorageKey = () =>
    `__bbcd-default-reviewers.${getRepoURL()}`

export const getDashboardPullRequestsStorageKey = actionId =>
    `__bbcd-dashboard-pull-requests_${actionId}`

export function getStorageSyncValue(key: string): Promise<any> {
    return new Promise(resolve => {
        ;(chrome.storage: any).sync.get(key, result => {
            resolve(result[key])
        })
    })
}

export function setStorageSyncValue(key: string, value: any): void {
    return new Promise(resolve => {
        ;(chrome.storage: any).sync.set({ [key]: value }, () => {
            resolve()
        })
    })
}

export function getStorageLocalValue(key: string): Promise<any> {
    return new Promise(resolve => {
        ;(chrome.storage: any).local.get(key, result => {
            resolve(result[key])
        })
    })
}

export function setStorageLocalValue(key: string, value: any): void {
    return new Promise(resolve => {
        ;(chrome.storage: any).local.set({ [key]: value }, () => {
            resolve()
        })
    })
}
