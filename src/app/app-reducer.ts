export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type InitialState = typeof initialState;

const initialState = {
  status: 'idle' as RequestStatus,
};

export const appReducer = (
  state: InitialState = initialState,
  action: ActionsType
): InitialState => {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.payload.status };

    default:
      return state;
  }
};

// Action creator
export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: 'SET_STATUS',
    payload: { status },
  } as const;
};

// Action type
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;

type ActionsType = SetAppStatusActionType;
