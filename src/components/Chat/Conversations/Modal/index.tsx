import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ChangeEvent,
  FormEvent,
  HTMLInputTypeAttribute,
  useState,
} from "react";
import userOperations from "../../../../graphql/operations/user";
import conversationsOperations from "../../../../graphql/operations/conversations";
import {
  searchUsersData,
  searchUsersInput,
  searchedUser,
  createConversationData,
  createConversationVariables,
} from "../../../../util/types";
import UserSearchList from "./UserSearchList";
import Spinner from "../../../ui/Spinner";
import Participants from "./Participants";
import { toast } from "react-hot-toast";
import { Session } from "next-auth";

type indexProps = {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
};

const index: React.FC<indexProps> = ({ isOpen, onClose, session }) => {
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<searchedUser>>([]);

  const [searchUsers, { data, error, loading }] = useLazyQuery<
    searchUsersData,
    searchUsersInput
  >(userOperations.Queries.searchUsers);

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<createConversationData, createConversationVariables>(
      conversationsOperations.Mutations.createConversation
    );

  console.log("searched data: ", data);

  const closeWhenClickedOutside = (e: Event) => {
    if ((e.target as Element).id === "chat_modal") {
      onClose();
    }
  };

  const HandleSearch = (e: FormEvent) => {
    e.preventDefault();
    searchUsers({ variables: { username } });
  };

  const addParticipant = (user: searchedUser) => {
    setParticipants([...participants, user]);
    setUsername("");
  };

  const removeParticipant = (userId: string) => {
    setParticipants(participants.filter((user) => user.id !== userId));
  };

  const handleCreateConversation = async () => {
    const participantsIds = [
      ...participants.map((p) => p.id),
      session?.user?.id,
    ];
    try {
      const { data } = await createConversation({
        variables: {
          participantsIds,
        },
      });
      console.log(data);
    } catch (error: any) {
      console.log("Create conversation error: ", error);
      toast.error(error?.message);
    }
  };

  return (
    <div
      id="chat_modal"
      className={`fixed flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-[#0000006b] ${
        !isOpen && "hidden"
      }`}
      onClick={closeWhenClickedOutside as any}
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="crypto-modal"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
              Create a Conversation
            </h3>
          </div>

          <div className="p-6">
            <form onSubmit={HandleSearch}>
              <input
                type="text"
                className="w-full py-2 px-2 rounded border border-gray-400 text-black"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter a Username"
              />
              <button
                className="w-full py-2 bg-slate-700 mt-2 rounded"
                disabled={!username}
              >
                {loading ? <Spinner /> : "Search"}
              </button>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data.searchUsers}
                addParticipant={addParticipant}
              />
            )}
            {participants.length > 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <button
                  className="w-full py-2 bg-blue-700 rounded"
                  onClick={handleCreateConversation}
                >
                  {createConversationLoading ? (
                    <Spinner />
                  ) : (
                    "Create Conversation"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default index;
