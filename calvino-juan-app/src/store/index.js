import { createStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../utils/api'

const INITIAL_STATE = {
    error: null,
    isLogin: false,
    loading: false,
    meetups: [],
    meetupsUser: [],
    meetup: {},
    notifications: [],
    user: {},
}

function appReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'FETCH_REQUEST': {
            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_FAILURE': {
            const { error } = action.payload;
            return {
                ...state,
                error,
                loading: false,
            }
        }

        case 'FETCH_MEETUPS_SUCCESS': {
            const { meetups } = action.payload;
            return {
                ...state,
                error: null,
                meetups,
                loading: false,
            }
        }

        case 'FETCH_MEETUPS_USER_SUCCESS': {
            const { meetupsUser } = action.payload;
            return {
                ...state,
                error: null,
                meetupsUser,
                loading: false,
            }
        }

        case 'FETCH_MEETUP_REQUEST': {
            return {
                ...state,
                loading: true,
            }
        }

        case 'FETCH_MEETUP_SUCCESS': {
            const { meetup } = action.payload;
            return {
                ...state,
                meetup,
                error: null,
                loading: false,
            }
        }

        case 'FETCH_USER_SUCCESS': {
            const { user } = action.payload;
            return {
                ...state,
                user,
                error: null,
                isLogin: true,
                loading: false,
            }
        }

        case 'FETCH_USER_FAILURE': {
            const { error } = action.payload;
            return {
                ...state,
                error,
                isLogin: false,
                loading: false,
            }
        }

        case 'ACTION_LOGOUT': {
            return {
                ...state,
                isLogin: false,
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

// THUNK
const getMeetupsRequest = () => {
    return async function(dispatch) {
        try {
            dispatch(fetchRequest());
            const meetups = await api.getMeetups();
            dispatch(fetchMeetupsSuccess(meetups));
        } catch (error) {
            dispatch(fetchFailure(error));
        }
    }
}

const getMeetupsUserRequest = (id) => {
    return async function(dispatch) {
        try {
            dispatch(fetchRequest());
            const meetupsUser = await api.getMeetupsUser(id);
            dispatch(fetchMeetupsUserSuccess(meetupsUser));
        } catch (error) {
            dispatch(fetchFailure(error));
        }
    }
}

const getUserRequest = (user) => {
    return async function(dispatch) {
        try {
            dispatch(fetchRequest());
            const userData = await api.getUser(user);
            if(Object.keys(userData).length >= 1) {
                dispatch(fetchUserSuccess(userData));
            } else {
                dispatch(fetchUserFailure('Verifique los datos e intente nuevamente.'))
            }
        } catch (error) {
            dispatch(fetchUserFailure(error));
        }
    }
}

const getMeetupRequest = id => {
    return async function(dispatch) {
        try {
            dispatch(fetchMeetupRequest());
            const meetup = await api.getMeetup(id);
            dispatch(fetchMeetupSuccess(meetup));
        } catch (error) {
            dispatch(fetchFailure(error));
        }
    }
}

const getLogout = () => {
    return function(dispatch) {
        try {
            dispatch(actionLogout());
        } catch (error) {
            dispatch(fetchFailure(error));
        }
    }
}

// ACTION CREATORS
const fetchRequest = () => {
    return {
        type: 'FETCH_REQUEST',
    }
}

const fetchFailure = error => {
    return {
        type: 'FETCH_FAILURE',
        payload: { error },
    }
}

const fetchMeetupRequest = () => {
    return {
        type: 'FETCH_MEETUP_REQUEST',
    }
}

const fetchMeetupSuccess = meetup => {
    return {
        type: 'FETCH_MEETUP_SUCCESS',
        payload: { meetup },
    }
}

const fetchMeetupsSuccess = meetups => {
    return {
        type: 'FETCH_MEETUPS_SUCCESS',
        payload: { meetups },
    }
}

const fetchMeetupsUserSuccess = meetupsUser => {
    return {
        type: 'FETCH_MEETUPS_USER_SUCCESS',
        payload: { meetupsUser },
    }
}

const fetchUserSuccess = user => {
    return {
        type: 'FETCH_USER_SUCCESS',
        payload: { user },
    }
}

const fetchUserFailure = error => {
    return {
        type: 'FETCH_USER_FAILURE',
        payload: { error },
    }
}

const actionLogout = () => {
    return {
        type: 'ACTION_LOGOUT'
    }
}

// MIDDLEWARE
const middlewares = applyMiddleware(thunk);
const store = createStore(appReducer, middlewares);

export { store as default, 
    getMeetupsRequest,
    getMeetupsUserRequest,
    getUserRequest,
    getMeetupRequest,
    getLogout,
};