import { useReducer } from "react";

const ACTIONS = {
  IDLE : 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.IDLE:
      return { status: ACTIONS.IDLE, data: undefined, error: undefined };
    case ACTIONS.LOADING:
      return { status: ACTIONS.LOADING, data: undefined, error: undefined };
    case ACTIONS.SUCCESS:
      return { status: ACTIONS.SUCCESS, data: action.payload, error: undefined };
    case ACTIONS.ERROR:
      return { status: ACTIONS.ERROR, data: undefined, error: action.payload };
    default:
      throw new Error("invalid action");
  }
};

/**
 * fetch data from Api Hook
 * @returns state and fetchData function
 */
function useApi() {
  const initialState = {
    status: ACTIONS.IDLE,
    data: undefined,
    error: undefined,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  /**
   * fetchData function to change the state
   * @param {string} path path to the api
   * @param {object} options options for the call
   */
  const fetchData = async (path, options) => {
    dispatch({ type: ACTIONS.LOADING});
    try {
      const resp = await fetch(`http://localhost:5000${path}`, options);
      const data = await resp.json();
      dispatch({ type: ACTIONS.SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: ACTIONS.ERROR, payload: e });
    }
  };

  return { state, fetchData };
}

export default useApi;
