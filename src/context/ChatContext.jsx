import { createContext, useReducer } from "react";
import { useUser } from "reactfire";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { data: currentUser } = useUser();

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    searchUser: false,
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      case "RESET_STATE":
        return { ...INITIAL_STATE };

      case "SET_SEARCH_USER":
        return { ...state, searchUser: action.payload.searchUser };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
