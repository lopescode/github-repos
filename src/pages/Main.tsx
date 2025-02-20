import { ChangeEvent, useCallback, useState } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import api from "../services/api";

const Main = () => {
  const [newRepo, setNewRepo] = useState<string>();
  const [repositories, setRepositories] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRepo(e.target?.value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const response = await api.get(`/repos/${newRepo}`);

        setRepositories([...repositories, response.data.full_name]);
        setNewRepo("");
      } catch (error) {
        console.log(error);
      }

      console.log(repositories);
    },

    [newRepo, repositories]
  );

  return (
    <div className="flex flex-col gap-10 bg-white m-[80px] p-[30px] rounded-sm max-w-[700px]">
      <h1 className="flex justify-center items-center gap-2 text-xl">
        <FaGithub size={25} />
        My Repositories
      </h1>

      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-2"
      >
        <input
          type="text"
          placeholder="Add a repository"
          className="p-2 border border-gray-300 rounded-sm w-full"
          value={newRepo}
          onChange={(e) => handleInputChange(e)}
        />

        <button type="submit" className="bg-[#0D2636] p-2 border rounded-sm">
          <FaPlus color="#FFF" size={20} />
        </button>
      </form>
    </div>
  );
};

export default Main;
