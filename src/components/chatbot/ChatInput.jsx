import { Send } from 'lucide-react';

const ChatInput = ({ value, onChange, onSend, disabled }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSend();
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything about TETL..."
        aria-label="Chat message"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={() => onSend()}
        disabled={disabled || !value.trim()}
        aria-label="Send chat message"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
