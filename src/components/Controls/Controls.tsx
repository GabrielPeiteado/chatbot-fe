import { useEffect, useRef, useState } from "react";
import styles from "./Controls.module.css";
import TextareaAutosize from "react-textarea-autosize";

interface ControlsProps {
  isDisabled?: boolean;
  onSend: (content: string) => void;
}

export function Controls({ isDisabled = false, onSend }: ControlsProps) {
  const [content, setContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isDisabled) {
      // textAreaRef.current?.focus();
    }
  }, [isDisabled]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleContentSend = () => {
    if (content.length > 0) {
      onSend(content);
      setContent("");
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleContentSend();
    }
  };

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize
          ref={textAreaRef}
          className={styles.TextArea}
          disabled={isDisabled}
          placeholder="Preguntarle a DinnrBot"
          value={content}
          minRows={1}
          maxRows={4}
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
        />
      </div>
      <button
        className={styles.Button}
        onClick={handleContentSend}
        disabled={isDisabled}
      >
        <SendIcon />
      </button>
    </div>
  );
}

const SendIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
};
