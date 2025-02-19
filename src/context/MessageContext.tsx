import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type MessageContextType = {
  messages: string[];
  addMessage: (message: string) => void;
  clearMessage: () => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<string[]>([]);

  {
    /*use useCallback because otherwise it will create new addMessage function everytime
  (when 'message' is updated, addMessage function is cached and reused later)*/
  }
  const addMessage = useCallback((message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);
  const clearMessage = () => {
    setMessages([]);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

const useMessages = () => {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error("useMessages must be used within a MessageProvider");
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { MessageProvider, useMessages };
