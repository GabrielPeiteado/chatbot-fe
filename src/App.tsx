import { useState } from "react";
import { Loader } from "./components/Loader/Loader";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";
import { Assistant } from "./assistants/googleAI";
import {
  USER_ROLE,
  ASSISTANT_ROLE,
  SYSTEM_ROLE,
  ERROR_GENERIC,
} from "./utils/constants";

function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState<{ content: string; role: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const updateLastMessageContent = (content: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  };

  const addMessage = (message: { content: string; role: string }) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // const handleContentSend = async (content: string) => {
  //   addMessage({ content, role: USER_ROLE });
  //   setIsLoading(true);
  //   try {
  //     const result = await assistant.chat(content);
  //     addMessage({ content: result, role: ASSISTANT_ROLE });
  //   } catch (error) {
  //     console.log(error);
  //     addMessage({ content: ERROR_GENERIC, role: SYSTEM_ROLE });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleContentSendStream = async (content: string) => {
    addMessage({ content, role: USER_ROLE });
    setIsLoading(true);
    try {
      const result = await assistant.chatStream(content);
      let isFirstChunk = false;

      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ content: "", role: ASSISTANT_ROLE });
          setIsLoading(false);
          setIsStreaming(true);
        }
        updateLastMessageContent(chunk);
      }
      setIsStreaming(false);
    } catch (error) {
      console.log(error);
      addMessage({ content: ERROR_GENERIC, role: SYSTEM_ROLE });
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <div className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/DinnrBot-Logo.png" />
        <h2 className={styles.Title}>DinnrBot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls
        onSend={handleContentSendStream}
        isDisabled={isLoading || isStreaming}
      />
    </div>
  );
}

export default App;
