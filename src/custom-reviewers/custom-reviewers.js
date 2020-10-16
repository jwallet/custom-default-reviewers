import elementReady from 'element-ready'
import { h } from 'dom-chef'
import './custom-reviewers.css'
import {
    initSelectedReviewers,
    initRecentReviewers,
    initAuthorReviewers,
    removeReviewerSearchField,
    removeRecentReviewersList,
    removeAuthorReviewersList,
    insertActions,
    insertForm,
} from './ui-renderer'
import {
    clearReviewersFieldValue,
    prefetchAllReviewers,
} from './data-selectors'
import {
    syncSearchResultsChanges,
    syncAuthorReviewersChanges,
    syncInputReviewersChanges,
} from './observers'
import { initTypeaheadElement } from './templates/typeahead'

export default async function customReviewersFeature() {
    // await and get container
    await elementReady('#reviewers')
    const container = document.getElementById('id_reviewers_group')

    // Clean ui
    removeReviewerSearchField()
    removeRecentReviewersList()
    removeAuthorReviewersList()
    clearReviewersFieldValue() // Clear form reviewers value

    // Mount ui
    insertActions(container)
    insertForm(container)
    initTypeaheadElement()

    // Observers
    syncAuthorReviewersChanges()
    syncSearchResultsChanges()

    // load users
    await prefetchAllReviewers()

    // Init
    await initSelectedReviewers()
    initRecentReviewers()
    initAuthorReviewers()
}
