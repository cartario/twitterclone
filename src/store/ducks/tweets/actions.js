export const ActionTypes = {
  HELLO: `HELLO`,
  SET_TWEETS: `tweets/SET_TWEETS`,
  SET_LOADING: `tweets/SET_LOADING`,
  FETCH_TWEETS: `tweets/FETCH_TWEETS`,
  ADD_FETCH_TWEET: `tweets/ADD_FETCH_TWEET`,
  ADD_TWEET: `tweets/ADD_TWEET`,
  ADD_TWEET_LOADING_STATUS: `tweets/ADD_TWEET_LOADING_STATUS`,
  DELETE_TWEET: `tweets/DELETE_TWEET`,
};

export const ActionCreator = {
  hello: ()=> ({
    type: ActionTypes.HELLO
  }),

  setTweets: (payload) => ({
    type: ActionTypes.SET_TWEETS,
    payload: payload,
  }),
  
  setLoading: () => ({
    type: ActionTypes.SET_LOADING,    
  }),

  fetchTweets: () => ({
    type: ActionTypes.FETCH_TWEETS,    
  }),

  addTweet: (payload) => ({
    type: ActionTypes.ADD_TWEET,
    payload: payload,
  }),

  setLoadingAddTweet: (payload) => ({
    type: ActionTypes.ADD_TWEET_LOADING_STATUS,
    payload
  }),
  deleteTweet: (payload) => ({
    type: ActionTypes.DELETE_TWEET,
    payload
  }),
};
