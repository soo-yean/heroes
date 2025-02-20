import { useMessages } from "../context/MessageContext";

export default function Messages() {
  const { messages, clearMessage } = useMessages();

  return (
    <div>
      <div className="flex gap-3">
        <h2 className="text-2xl">Messages</h2>
        <button onClick={clearMessage} className="btn">
          Clear messages
        </button>
      </div>

      {messages.map((msg, idx) => {
        return (
          <div key={idx} className="my-2">
            {msg}
          </div>
        );
      })}
    </div>
  );
}
