import axiosApi from "../axiosApi";

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

export const FETCH_MESSAGES_BY_DATE_SUCCESS = 'FETCH_MESSAGES_BY_DATE_SUCCESS';
export const FETCH_MESSAGES_BY_DATE_FAILURE = 'FETCH_MESSAGES_BY_DATE_FAILURE';

export const fetchMessagesRequest = () => ({type: FETCH_MESSAGES_REQUEST});
export const fetchMessagesSuccess = message => ({type: FETCH_MESSAGES_SUCCESS, message});
export const fetchMessageFailure = error => ({type: FETCH_MESSAGES_FAILURE, error});

export const fetchMessagesByDateSuccess = date => ({type: FETCH_MESSAGES_BY_DATE_SUCCESS, date});
export const fetchMessagesByDateFailure = error => ({type: FETCH_MESSAGES_BY_DATE_FAILURE, error});

export const getMessage = () => {
  return async (dispatch) => {
      try {
          dispatch(fetchMessagesRequest());
          const response = await axiosApi.get('/messages');
          dispatch(fetchMessagesSuccess(response.data))
      } catch (e) {
          dispatch(fetchMessageFailure(e))
      }
  }
};

export const getMessagesByDate = date => {
    return async dispatch => {
        try {
            const response = await axiosApi.get(`/messages?datetime=${date}`);
            dispatch(fetchMessagesByDateSuccess(response.data))
        } catch (e) {
            dispatch(fetchMessagesByDateFailure(e))
        }
    }
};
export const sendMessage = newMessage => {
    return async (dispatch) => {
        try {
            dispatch(fetchMessagesRequest());
            await axiosApi.post('/messages', newMessage);
            dispatch(getMessage())
        } catch (e) {
            dispatch(fetchMessageFailure(e))

        }
    }
};