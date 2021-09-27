const initialState = {
    appliedFilters: []
};

const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
const SORT_BY_PRICE = "SORT_BY_PRICE";
const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";
const FILTER_BY_VALUE = "FILTER_BY_VALUE";
const FILTER_BY_SELECT = "FILTER_BY_SELECT";
const LOAD_NEW_PAGE = "LOAD_NEW_PAGE";
const LOAD_EXACT_PAGE = "LOAD_EXACT_PAGE";

export const sortByPrice = payload => ({
    type: SORT_BY_PRICE,
    payload
});

export const filterByPrice = payload => ({
    type: FILTER_BY_PRICE,
    payload
});

export const filterByValue = payload => ({
    type: FILTER_BY_VALUE,
    payload
});

export const filterBySelect = payload => ({
    type: FILTER_BY_SELECT,
    payload
});

export const sortByAlphabet = payload => ({
    type: SORT_BY_ALPHABET,
    payload
});

export const loadData = (payload) => ({
    type: LOAD_DATA,
    payload
});

export const loadNewPage = (payload) => ({
    type: LOAD_NEW_PAGE,
    payload
});

export const loadExactPage = (payload) => ({
    type: LOAD_EXACT_PAGE,
    payload
});

const filterStore = (state = initialState, action) => {
    switch (action.type) {
            case SORT_BY_ALPHABET:
                const sortByAlphabetState = Object.assign({}, state);
                let sortedAlphabetArr = action.payload.direction === "asc" ?
                    sortAsc(state.filteredCofounders, 'Cofounder Name') :
                    sortDesc(state.filteredCofounders, 'Cofounder Name');

                sortByAlphabetState.filteredCofounders = sortedAlphabetArr;
                sortByAlphabetState.appliedFilters = addFilterIfNotExists(SORT_BY_ALPHABET, sortByAlphabetState.appliedFilters);
                sortByAlphabetState.appliedFilters = removeFilter(SORT_BY_ALPHABET, sortByAlphabetState.appliedFilters);

                return sortByAlphabetState;

        case FILTER_BY_SELECT:
            let newState = Object.assign({}, state);
            let filteredValues = state.cofounders.filter(cofounder => {
                let iamBackground = cofounder['fields']["I'm a ... [Background]"];
                let lookingForBackground = cofounder['fields']["Looking for ..."];
                for(var i=0; i<iamBackground.length; i++){
                    if(state.iamSelectionData.indexOf(iamBackground[i])!==-1 || 
                    state.lookingForSelectionData.indexOf(lookingForBackground[i])!==-1) return true;
                }
                for(var j=0; j<lookingForBackground.length; j++){
                    if(state.iamSelectionData.indexOf(iamBackground[j])!==-1 || 
                    state.lookingForSelectionData.indexOf(lookingForBackground[j])!==-1) return true;
                }
                return false;
            });

            let appliedFilters = state.appliedFilters;

            if (state.iamSelectionData.length>0 || state.lookingForSelectionData.length>0) {
                appliedFilters = addFilterIfNotExists(FILTER_BY_SELECT, appliedFilters);

                newState.filteredCofounders = filteredValues;
                newState.filteredCount = newState.filteredCofounders.length;
                newState.filteredPages = Math.ceil(newState.filteredCount / newState.countPerPage);

            } else {
                appliedFilters = removeFilter(FILTER_BY_SELECT, appliedFilters);

                if (appliedFilters.length === 0) {
                    newState.filteredCofounders = newState.cofounders;
                    newState.filteredCount = newState.filteredCofounders.length;
                    newState.filteredPages = Math.ceil(newState.filteredCount / newState.countPerPage);
                }
            }
            return newState;

        case LOAD_DATA:
            let count = action.payload.count;
            let countPerPage = action.payload.countPerPage || 20;

            //round up
            let totalPages = Math.ceil(count / countPerPage);
            return {
                ...state,
                iamSelectionData: [],
                lookingForSelectionData: [],
                currentCount: countPerPage,
                countPerPage,
                totalCount: count,
                currentPage: 1,
                totalPages: totalPages,
                filteredPages: totalPages
            };

        default:
            return state;

    }
};

export default filterStore;

function sortAsc(arr, field) {
    return arr.sort(function (a, b) {
        a=a['fields'];
        b=b['fields'];
        if (a[field] > b[field]) return 1;

        if (b[field]> a[field]) return -1;

        return 0;
    })
}

function sortDesc(arr, field) {
    return arr.sort(function (a, b) {
        a=a['fields'];
        b=b['fields'];
        if (a[field] > b[field]) return -1;

        if (b[field]> a[field]) return 1;

        return 0;
    })
}

function addFilterIfNotExists(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    if (index===-1) appliedFilters.push(filter);

    return appliedFilters;
}

function removeFilter(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    appliedFilters.splice(index, 1);
    return appliedFilters;
}
