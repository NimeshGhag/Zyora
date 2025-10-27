import { useForm } from "react-hook-form";
import { nanoid } from "nanoid/non-secure";
import { useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "./../features/users/userAction";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const registerHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = [];
    user.wishlist =[];
    dispatch(asyncRegisterUser(user));
    reset();
    navigate(-1);
  };

  const navigateHandler = () => {
    navigate("/logIn");
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="w-40 h-30 md:w-50 md:h-40  lg:w-60 lg:h-50">
        <img
          className="w-full object-contain"
          src="../../assets/WhatsApp_Image_2025-09-23_at_1.25.18_PM-removebg-preview.webp"
          alt=""
        />
      </div>
      <div className="flex flex-col items-center justify-center p-5 tracking-tight">
        <h1 className="text-3xl md:text-4xl text-neutral-900 font-semibold mb-4">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit(registerHandler)}
          className="flex flex-col items-center text-2xl md:text-3xl  gap-4 p-5 cursor-pointer tracking-tight relative shadow-xl rounded-2xl backdrop-blur-xs  "
        >
          <div className="flex flex-col gap-1">
            <input
              {...register("userName", { required: "please enter a username" })}
              className="border-1 border-neutral-400 outline-0 p-3  rounded-lg capitalize placeholder:text-sm md:placeholder:text-lg"
              type="text"
              placeholder="Name"
            />

            <small className="text-red-500 text-xs md:text-base font-thin">
              {errors?.userName?.message}
            </small>
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("email", { required: "please enter a email" })}
              className="border-1 border-neutral-400 outline-0 p-3  rounded-lg placeholder:text-sm md:placeholder:text-lg"
              type="email"
              placeholder="Email"
            />

            <small className="text-red-500 text-xs md:text-base font-thin">
              {errors?.email?.message}
            </small>
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("password", { required: "please enter a password" })}
              className="border-1  border-neutral-400 outline-0 p-3 rounded-lg placeholder:text-sm md:placeholder:text-lg"
              type="password"
              placeholder="Password"
            />
            <small className="text-red-500 text-xs md:text-base font-thin">
              {errors?.password?.message}
            </small>
          </div>

          <button className="bg-black text-white cursor-pointer w-full p-2 rounded-4xl text-lg md:text-xl hover:text-amber-300">
            Sign Up
          </button>
        </form>

        <div className="flex flex-col gap-1 mt-2">
          <h4>Already have an account</h4>
          <button
            onClick={navigateHandler}
            className="text-emerald-700 cursor-pointer hover:text-shadow-2xs"
          >
            sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
