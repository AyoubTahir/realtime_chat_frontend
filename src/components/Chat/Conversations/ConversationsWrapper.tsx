import { Session } from "next-auth";
import ConvirsationList from "./ConvirsationList";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  return (
    <div className="w-full md:w-[400px] bg-slate-700 py-6 px-3">
      <ConvirsationList session={session} />
    </div>
  );
};

export default ConversationsWrapper;
