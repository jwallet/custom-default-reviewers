// @flow
import { h } from 'dom-chef'
import { IUser } from '../../_core/models'
import { getSelectedReviewerElement } from '../templates'
import {
    getDefaultReviewers,
    addReviewer,
    addReviewers,
} from '../data-selectors'
import {
    getStorageSyncValue,
    getDefaultReviewersStorageKey,
} from '../../storage'
import { isCreatePullRequestURL } from '../../page-detect'

export const getSelectedReviewerLineId = (user: IUser) =>
    `#__bbcdr_selected_reviewer_${user.account_id}`

function findUserInSelectedReviewers(user: IUser): HTMLElement {
    return document.getElementById(getSelectedReviewerLineId(user))
}

export function insertUserToSelectedReviewers(user: IUser): void {
    const elContainer: HTMLElement = document.getElementById(
        'selected_reviewers'
    )
    if (findUserInSelectedReviewers(user)) return
    const elReviewer: HTMLElement = getSelectedReviewerElement(user)
    elContainer.insertBefore(
        elReviewer,
        elContainer.querySelector('.select2-search-field')
    )
}

export function insertUsersToSelectedReviewers(users: IUser[]): void {
    users.forEach((u: IUser) => {
        insertUserToSelectedReviewers(u)
    })
}

export function resetUsersToSelectedReviewers(users: IUsers[]): void {
    clearSelectedReviewers()
    insertUsersToSelectedReviewers(users)
}

export async function getSavedDefaultReviewers(): Promise<IUser[]> {
    return (await getStorageSyncValue(getDefaultReviewersStorageKey())) || []
}

export async function initSelectedReviewers(): void {
    const defaultReviewers: IUser[] = getDefaultReviewers()
    const savedReviewers: IUser[] = await getSavedDefaultReviewers()
    const reviewers =
        savedReviewers.length > 0 && defaultReviewers.length === 0
            ? savedReviewers
            : defaultReviewers

    addReviewers(reviewers)
    insertUsersToSelectedReviewers(reviewers)
}

export function clearSelectedReviewers(): void {
    document
        .getElementById('selected_reviewers')
        .querySelectorAll('li.select2-search-choice')
        .forEach((c: Element) => c.remove())
}

export function removeUserFromSelectedReviewers(user: IUser): void {
    const el: HTMLElement = findUserInSelectedReviewers(user)
    if (!el) return
    el.remove()
}
