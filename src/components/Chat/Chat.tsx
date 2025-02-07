import React, { useRef, useEffect, useMemo } from "react";
import styles from "./Chat.module.css";
import { ASSISTANT_ROLE, USER_ROLE } from "../../utils/constants";
import Markdown from "react-markdown";

interface ChatProps {
  messages: { role: string; content: string }[];
}

const WELCOME_MESSAGE_GROUP = [
  {
    role: ASSISTANT_ROLE,
    content:
      "¡Hola! Soy DinnrBot, tu asistente para ayudarte a elegir tu plato. ¿En qué puedo ayudarte hoy?",
  },
];

export const Chat: React.FC<ChatProps> = ({ messages }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messagesGroups = useMemo(
    () =>
      messages.reduce<{ role: string; content: string }[][]>(
        (groups, message) => {
          if (message.role === USER_ROLE) groups.push([]);
          groups[groups.length - 1].push(message);
          return groups;
        },
        []
      ),
    [messages]
  );

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === USER_ROLE) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE_GROUP, ...messagesGroups].map(
        (messages, groupIndex) => (
          // Group
          <div key={groupIndex} className={styles.Group}>
            {messages.map(({ role, content }, index) => (
              // Message
              <div key={index} className={styles.Message} data-role={role}>
                <Markdown>{content}</Markdown>
              </div>
            ))}
          </div>
        )
      )}

      <div ref={messageEndRef} />
    </div>
  );
};
