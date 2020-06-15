const initialState = 0;

export const navPick = (state = initialState, action) => {
  switch (action.type) {
    case "nav_pick":
      return [action.payload] 
    default:
      return state;
  }
}