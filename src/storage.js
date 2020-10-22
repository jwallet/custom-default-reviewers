// @flow
/* global chrome */

import { getRepoURL } from './page-detect'

export const getDefaultReviewersStorageKey = () =>
    `__bbcd-default-reviewers.${getRepoURL()}`

export const getDashboardPullRequestsStorageKey = actionId =>
    `__bbcd-dashboard-pull-requests_${actionId}`

export async function getStorageSyncValue(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            ;(chrome.storage: any).sync.get(key, result => {
                console.log('get result --', (result || {}).key)
                resolve((result || {})[key])
            })
        } catch (ex) {
            reject()
        }
    })
}

export async function setStorageSyncValue(key: string, value: any): void {
    return new Promise((resolve, reject) => {
        try {
            ;(chrome.storage: any).sync.set({ [key]: value }, () => {
                resolve()
            })
        } catch (ex) {
            reject()
        }
    })
}

export async function getStorageLocalValue(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            ;(chrome.storage: any).local.get(key, result => {
                resolve((result || {})[key])
            })
        } catch (ex) {
            reject(ex)
        }
    })
}

export async function setStorageLocalValue(key: string, value: any): void {
    return new Promise((resolve, reject) => {
        try {
            ;(chrome.storage: any).local.set({ [key]: value }, () => {
                resolve()
            })
        } catch (ex) {
            reject(ex)
        }
    })
}
