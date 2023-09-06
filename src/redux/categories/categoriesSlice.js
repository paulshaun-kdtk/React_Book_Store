const initialState = {
  categories: [],
};

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case 'CATEGORY':
      return 'Under Construction';
    default:
      return state;
  }
}

export default categoriesReducer;
