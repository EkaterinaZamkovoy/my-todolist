export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

type InitialState = typeof initialState;

const initialState = {
  status: 'idle' as RequestStatus,
  error: null as string | null,
};

export const appReducer = (
  state: InitialState = initialState,
  action: ActionsType
): InitialState => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: action.payload.error };
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

export const setAppErrorAC = (error: string | null) => {
  return {
    type: 'SET_ERROR',
    payload: { error },
  } as const;
};

// Action type
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;

type ActionsType = SetAppStatusActionType | SetAppErrorActionType;
