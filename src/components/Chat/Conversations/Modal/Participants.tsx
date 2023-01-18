import { HiOutlineTrash } from "react-icons/hi2";
import { searchedUser } from "../../../../util/types";

interface ParticipantsProps {
  participants: Array<searchedUser>;
  removeParticipant: (userId: string) => void;
}

const Participants: React.FC<ParticipantsProps> = ({
  participants,
  removeParticipant,
}) => {
  return (
    <div className="mt-2 flex flex-wrap gap-2 mb-4">
      {participants.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-1 bg-slate-600 rounded py-1 px-4"
        >
          {user.username}{" "}
          <HiOutlineTrash onClick={() => removeParticipant(user.id)} />
        </div>
      ))}
    </div>
  );
};

export default Participants;
