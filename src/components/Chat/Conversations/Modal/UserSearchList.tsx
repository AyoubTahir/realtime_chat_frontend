import { searchedUser } from "../../../../util/types";

interface UserSearchListProps {
  users: Array<searchedUser>;
  addParticipant: (user: searchedUser) => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({
  users,
  addParticipant,
}) => {
  return (
    <>
      {users.length > 0 ? (
        <ul className="my-4 space-y-3">
          {users.map((user) => (
            <li key={user.id}>
              <a
                href="#"
                className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <img src={user.image} className="h-8 w-8 rounded-full" alt="" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {user.username}
                </span>
                <button
                  className="bg-blue-600 font-normal text-white py-2 px-3 rounded hover:bg-blue-700"
                  onClick={() => addParticipant(user)}
                >
                  Select
                </button>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black text-center my-4">No Users Found</p>
      )}
    </>
  );
};

export default UserSearchList;
