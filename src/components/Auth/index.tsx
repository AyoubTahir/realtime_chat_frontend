import { useMutation } from "@apollo/client";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import userOperations from "../../graphql/operations/user";
import toast from "react-hot-toast";
import { createUsernameData, createUsernameVariables } from "../../util/types";
import Spinner from "../ui/Spinner";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");
  const [createUsername, { /*data,we use it bellow*/ loading, error }] =
    useMutation<createUsernameData, createUsernameVariables>(
      userOperations.Mutations.createUsername
    );

  //console.log(data, loading, error);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username) return;

    try {
      //i use data here instead of above
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) throw new Error();

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        throw new Error(error);
      }

      toast.success("Username Successfully created!");

      //Reload session to get the new username
      reloadSession();
    } catch (error: any) {
      toast.error(error?.message);
      console.log("Username submit error ", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        {session?.user ? (
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              className="py-2 px-3 rounded border border-gray-700 w-[300px] text-black"
              id="username"
              name="username"
              value={username}
              placeholder="UserName"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button className="bg-red-500 hover:bg-red-600 py-2 px-3 w-full rounded font-semibold">
              {loading ? <Spinner /> : "Register"}
            </button>
          </form>
        ) : (
          <>
            <h2 className="text-4xl uppercase font-bold tracking-widest mb-3">
              Chaty App
            </h2>
            <button
              className="flex gap-3 bg-red-500 hover:bg-red-600 py-3 px-3 w-full rounded font-semibold"
              onClick={() => {
                signIn("google");
              }}
            >
              <FcGoogle size="1.5rem" />
              Sign In With Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
