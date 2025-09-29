import { useForm } from "react-hook-form";
import { nanoid } from "nanoid/non-secure";
import { useNavigate } from "react-router-dom";
import { asyncLoginrUser } from "../features/users/userAction";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const loginHandler = (user) => {
    user.id = nanoid();
    dispatch(asyncLoginrUser(user));
    reset();
    navigate(-1);
  };

  const navigateHandler = () => {
    navigate("/register");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="w-40 h-30">
        <img
          className="w-full object-contain"
          src="../../assets/WhatsApp_Image_2025-09-23_at_1.25.18_PM-removebg-preview.webp"
          alt=""
        />
      </div>
      <div className="flex flex-col items-center justify-center p-5 tracking-tight">
        <h1 className="text-3xl text-neutral-900 font-semibold mb-4">
          Welcome Back
        </h1>

        <form
          onSubmit={handleSubmit(loginHandler)}
          className="w-full flex flex-col items-center text-2xl gap-4  p-5 cursor-pointer tracking-tigh shadow-xl rounded-2xl backdrop-blur-xst"
        >
          <div className="flex flex-col gap-1">
            <input
              {...register("email", { required: "please enter a email" })}
              className="border-1 border-neutral-400 outline-0 p-3  rounded-lg placeholder:text-sm"
              type="email"
              placeholder="Email"
            />

            <small className="text-red-500 text-xs font-thin">
              {errors?.email?.message}
            </small>
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("password", { required: "please enter a password" })}
              className="border-1  border-neutral-400 outline-0 p-3 rounded-lg placeholder:text-sm"
              type="password"
              placeholder="Password"
            />
            <small className="text-red-500 text-xs font-thin">
              {errors?.password?.message}
            </small>
          </div>

          <button className="bg-black text-white cursor-pointer w-full p-2 rounded-4xl text-lg hover:text-amber-300">
            Sign In
          </button>
        </form>

        <div className="flex flex-col gap-1 mt-2">
          <h4>Don't have an account</h4>
          <button
            onClick={navigateHandler}
            className="text-emerald-700 cursor-pointer hover:text-shadow-2xs"
          >
            sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
