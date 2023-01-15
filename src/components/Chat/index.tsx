import { signOut } from "next-auth/react";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import FeedWrapper from "./Feed/FeedWrapper";
import { Session } from "next-auth";

interface IChatProps {
  session: Session;
}

const Chat: React.FC<IChatProps> = ({ session }) => {
  return (
    <div className="flex h-screen">
      <ConversationsWrapper session={session} />
      <FeedWrapper session={session} />
    </div>
  );
};

export default Chat;
