const quickReplies = [
  { label: 'Services', message: 'Services' },
  { label: 'Our Story', message: 'Our Story' },
  { label: 'Careers', message: 'Careers' },
  { label: 'Contact', message: 'Contact' },
];

const QuickReplies = ({ onSelect, disabled }) => (
  <div className="quick-actions">
    {quickReplies.map((reply) => (
      <button
        key={reply.label}
        type="button"
        onClick={() => onSelect(reply.message)}
        disabled={disabled}
      >
        {reply.label}
      </button>
    ))}
  </div>
);

export default QuickReplies;
