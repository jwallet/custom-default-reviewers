// @flow
/* eslint-disable flowtype/no-types-missing-file-annotation */

// https://www.chromium.org/Home/chromium-security/extension-content-script-fetches

type Request = {
    token: string,
    repoUrl: string,
    name: $Values<typeof RequestTypes>,
}

type RequestByTerm = Request & {
    term: string,
}

type BitbucketAPIErrorResponse = {|
    type: string,
    error: {
        message: string,
        detail?: string,
        data?: any,
    },
|}

export const RequestTypes = {
    getSearchedUsers: 'getSearchedUsers',
}

// eslint-disable-next-line flowtype/no-weak-types
async function get<T: Object>(
    url: string,
    token: string
): Promise<BitbucketAPIErrorResponse | T> {
    const response = await fetch(url, {
        headers: new Headers({
            Authorization: `Bearer ${token}`,
        }),
    })
    try {
        const result: BitbucketAPIErrorResponse | T = await response.json()
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}

function getUrl(request: RequestByTerm): string {
    const { repoUrl, name, term = '' } = request
    switch (name) {
        case RequestTypes.getSearchedUsers:
            return `https://bitbucket.org/xhr/mentions/repositories/${repoUrl}?term=${term}`
        default:
            throw new Error(`Unhandled value: ${name}`)
    }
}

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(
    (request: Request, sender, sendResponse) => {
        ;(async () => {
            try {
                const url = getUrl(request)
                const result = await get(url, request.token)
                sendResponse(result)
            } catch (error) {
                throw error
            }
        })()

        return true
    }
)
