const initState = {
    newListAdded: false,
    newItemAdded: false,
    listItemUpdated: false,
    listItemDeleted: false,
    newListAddError: '',
    listAddError: ''
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LIST_ADDED':
            window.location = `/list/${action.item}`
            return {
                newListAdded: true,
                newListAddError: '',
            }
        case 'CART_ITEM_ADDED':
            return {
                newItemAdded: true,
                listAddError: ''
            }
        case 'CART_ITEM_UPDATED':
            return {
                listItemUpdated: true,
            }
        case 'DELETE_CART_ITEM':
            return {
                listItemDeleted: true
            }
        default:
            return state
    }
    return 0;
}

export default authReducer