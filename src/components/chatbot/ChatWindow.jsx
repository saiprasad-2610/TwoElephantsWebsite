import MessageBubble from './MessageBubble';
import QuickReplies from './QuickReplies';
import ChatInput from './ChatInput';

const ChatWindow = ({
  messages,
  inputValue,
  isTyping,
  messagesEndRef,
  onInputChange,
  onSendMessage,
  suggestions,
  disabled,
}) => (
  <>
    <div className="chat-messages">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isTyping && (
        <div className="message-wrapper bot">
          <div className="message-bubble typing">
            <span>Typing...</span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>

    <div className="response-suggestions-wrapper">
      {suggestions?.length > 0 ? (
        <div className="response-suggestions">
          <p className="suggestion-title">You may also ask about:</p>
          <div className="suggestion-buttons">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onSendMessage(suggestion)}
                disabled={disabled}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <QuickReplies onSelect={onSendMessage} disabled={disabled} />
      )}
    </div>

    <ChatInput
      value={inputValue}
      onChange={onInputChange}
      onSend={onSendMessage}
      disabled={isTyping}
    />
  </>
);

export default ChatWindow;
