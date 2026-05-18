const parseMarkdown = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');

const MessageBubble = ({ message }) => (
  <div className={`message-wrapper ${message.sender}`}>
    <div className="message-bubble">
      <div dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }} />
    </div>
  </div>
);

export default MessageBubble;
