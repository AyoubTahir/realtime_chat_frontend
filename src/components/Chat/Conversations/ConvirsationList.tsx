import { Session } from "next-auth";
import Modal from "./Modal";
import { useState } from "react";

interface ConvirsationListProps {
  session: Session;
}

const ConvirsationList: React.FC<ConvirsationListProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full">
      <button
        className="bg-slate-800 w-full font-semibold hover:bg-slate-900 py-3 rounded"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Start a conversation
      </button>
      <Modal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};
export default ConvirsationList;
