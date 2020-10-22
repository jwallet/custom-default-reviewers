// @flow
import { h } from 'dom-chef'
import { isCreatePullRequestURL } from '../../page-detect'
import {
    getCurrentReviewers,
    prefetchAllReviewers,
    getReviewersFieldValue,
    getSearchReviewersResults,
    addSearchedReviewers,
    resetReviewers,
    getDefaultReviewers,
} from '../data-selectors'
import {
    clearSelectedReviewers,
    insertUsersToSelectedReviewers,
    setSavedDefaultReviewers,
    getSavedDefaultReviewers,
} from '../ui-renderer'

const smallButtonStyle = {
    height: 'initial',
    lineHeight: 'initial',
}

const buttonFeedback = (button, succeeded) => {
    if (succeeded) {
        button.style.backgroundColor = 'rgb(220,255,180)'
    } else {
        button.style.backgroundColor = 'rgb(255,200,200)'
    }

    setTimeout(() => {
        button.style.backgroundColor = ''
    }, 2000)
}

async function handleSaveSelectionAsDefault(e) {
    await setSavedDefaultReviewers(getCurrentReviewers())

    const savedReviewers: IUser[] = await getSavedDefaultReviewers()
    const currentReviewersIds: string[] = getReviewersFieldValue()

    buttonFeedback(
        e.target,
        (savedReviewers || []).every(r =>
            currentReviewersIds.includes(r.account_id)
        )
    )
}

async function handleAddAllUsers(e) {
    const result = await prefetchAllReviewers()
    const searchedReviewers = getSearchReviewersResults()
    addSearchedReviewers(searchedReviewers)
    buttonFeedback(e.target, result)
}

async function handleReload(e) {
    const savedReviewers: IUser[] = await getSavedDefaultReviewers()
    if (savedReviewers.length > 0) {
        addSearchedReviewers(savedReviewers)
    }
    buttonFeedback(e.target, savedReviewers.length > 0)
}

async function handleReset(e) {
    const defaultReviewers: IUser[] = getDefaultReviewers()
    if (defaultReviewers.length > 0) {
        addSearchedReviewers(defaultReviewers)
    }
    buttonFeedback(e.target, defaultReviewers.length > 0)
}

function getActionsElement(): HTMLElement {
    return (
        <div class="__bbcdr_reviewers_actions">
            <div style={{ flexGrow: 1 }} />
            <div class="aui-buttons">
                <button
                    type="button"
                    class="aui-button"
                    style={smallButtonStyle}
                    onClick={handleAddAllUsers}
                    title="Add all available users as reviewers."
                >
                    Add All
                </button>

                <button
                    type="button"
                    class="aui-button"
                    style={smallButtonStyle}
                    onClick={handleReload}
                    title="Reload your saved default reviewers selection."
                >
                    Reload
                </button>
                <button
                    type="button"
                    class="aui-button"
                    style={smallButtonStyle}
                    onClick={handleReset}
                    title={
                        isCreatePullRequestURL()
                            ? 'Reset to the repository default reviewers (if any).'
                            : 'Reset to the initial reviewers of the pull request.'
                    }
                >
                    Reset
                </button>
            </div>
            <div class="aui-buttons">
                <button
                    type="button"
                    class="aui-button"
                    style={smallButtonStyle}
                    onClick={handleSaveSelectionAsDefault}
                    title="Save current reviewers as your new default for this repositor.y"
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default getActionsElement
