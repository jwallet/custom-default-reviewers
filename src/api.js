// @flow
/* eslint-disable no-undef */

import { getRepoURL } from './page-detect'
import { getApiToken } from './utils'
import { RequestTypes } from './background-for-requests'
import { IUserXHR } from './_core/models'

const repoUrl = getRepoURL()
const token = getApiToken()
const sendMessageCb = sendMessage(repoUrl, token)

const api = {
    getSearchedUsers(term: string): Promise<IUserXHR[]> {
        return sendMessageCb(RequestTypes.getSearchedUsers, { term })
    },
}

// https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
function sendMessage(repoUrl: string, token: string) {
    return (name: string, data?: {}) => {
        return new Promise(resolve => {
            // $FlowIgnore
            chrome.runtime.sendMessage(
                { repoUrl, token, name, ...data },
                resolve
            )
        })
    }
}

export default api
