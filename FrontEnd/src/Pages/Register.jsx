import { useForm } from "react-hook-form";
import { nanoid } from "nanoid/non-secure";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const registerHandler = (user) => {
    user.id = nanoid();
    console.log(user);
    reset();
    navigate(-1);
  };
  const navigateHandler = () => {
    navigate("/logIn");
  };
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="w-40 h-30">
        <img
          className="w-full object-contain"
          src="../../assets/WhatsApp_Image_2025-09-23_at_1.25.18_PM-removebg-preview.webp"
          alt=""
        />
      </div>
      <div className="flex flex-col items-center justify-center p-5 tracking-tight">
        <h1 className="text-3xl text-neutral-900 font-semibold mb-4">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit(registerHandler)}
          className="flex flex-col items-center text-2xl gap-4 cursor-pointer tracking-tight"
        >
          <div className="flex flex-col gap-1">
            <input
              {...register("userName", { required: "please enter a username" })}
              className="border-1 border-neutral-400 outline-0 p-3  rounded-lg capitalize"
              type="text"
              placeholder="User Name"
            />

            <small className="text-red-500 text-xs font-thin">
              {errors?.userName?.message}
            </small>
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("email", { required: "please enter a email" })}
              className="border-1 border-neutral-400 outline-0 p-3  rounded-lg"
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
              className="border-1  border-neutral-400 outline-0 p-3 rounded-lg"
              type="password"
              placeholder="******"
            />
            <small className="text-red-500 text-xs font-thin">
              {errors?.password?.message}
            </small>
          </div>

          <button className="bg-black text-white cursor-pointer w-full p-2 rounded-2xl">
            Sign Up
          </button>
        </form>

        <div className="flex flex-col gap-1">
          <h4>Already have an account</h4>
          <button
            onClick={navigateHandler}
            className="text-emerald-700 cursor-pointer"
          >
            sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
