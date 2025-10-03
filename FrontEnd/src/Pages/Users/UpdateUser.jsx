import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncUpdateUser } from "../../features/users/userAction";

const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user && state.user.user);
  const { id } = useParams();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userName: user?.userName,
      password: user?.password,
    },
  });

  const updateHandler = (formData) => {
    const userId = user?.id ?? id;
    const updatedUser = { ...formData, id: userId };
    dispatch(asyncUpdateUser(userId, updatedUser));
    reset();
    navigate("/logIn");
  };

  return (
    <div className="w-screen h-screen flex flex-col ">
      <form
        onSubmit={handleSubmit(updateHandler)}
        className="p-5 flex flex-col gap-4  "
      >
        <div className="flex flex-col gap-1">
          .{" "}
          <small className="text-emerald-700 text-xs font-thin">
            Update UserName
          </small>
          <input
            {...register("userName")}
            maxLength={15}
            className="border-1  border-neutral-400 outline-0 p-3 rounded-lg placeholder:text-sm"
            type="text"
            placeholder="User name"
          />
        </div>

        <div className="flex flex-col gap-1 relative">
          <small className="text-emerald-700 text-xs font-thin">
            Change Password
          </small>
          <input
            {...register("password", { required: "please enter a password" })}
            className="border-1  border-neutral-400 outline-0 p-3 rounded-lg placeholder:text-sm"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="text-white rounded-xl  text-xl px-5 py-3 bg-black cursor-pointer hover:text-amber-300 hover:transition duration-300 ease-in-out">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
