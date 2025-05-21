import React, { useState, useEffect } from "react";
import * as pkg from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { handleNameChange, handleEmailChange, handlePhoneChange, handlePasswordChange } from "../utils/util";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import signupStore from "../store/signupStore";

function Signup() {

    const { Link, useNavigate } = pkg;
    const navigate = useNavigate(); 
    const { signupLoader, registerUser } = signupStore();
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: { email: "", password: "" }
    });


    const formData = watch();
    const isValid = Object.keys(errors).length === 0 && Object.values(formData).every(value => value?.trim() !== "");

    /**
     * @param {Object} data - Contains user registration details.
     * @return {Promise<void>} Registers the user and redirects to login upon success.
     */
    const handleSignup = async (data) => {

        let formData = new FormData();
        formData.append("fullName", data?.fullName);
        formData.append("email", data?.email);
        formData.append("phoneNumber", data?.phoneNumber);
        formData.append("password", data?.password);

        try {
            const response = await (registerUser(formData))
            if (response.data.statusCode === 201) {
                navigate("/login")
            }

        } catch (error) {
            console.log("Error: " + (error?.message || "Something went wrong"));
        }
    };

    return (

        (

            <div className="min-h-screen flex items-center justify-center">
                <form onSubmit={handleSubmit(handleSignup)} className="pl-6 pr-6 pt-1 pb-5 shadow-2xl bg-white rounded-lg w-full max-w-md mx-auto">
                    <h1 className="text-center text-blue-600 text-3xl font-medium">Create Account</h1>

                    <div className="flex flex-col space-y-4 mt-6">

                        <label className="text-sm font-medium text-gray-700 mb-1" >
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="fullName"
                            control={control}
                            rules={{
                                required: "Full Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Full Name must be at least 2 characters",
                                },
                            }}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        {...field}
                                        type="text"
                                        inputMode="text"
                                        maxLength={44}
                                        className={`p-3 w-full text-base border ${errors.fullName ? "border-red-500" : "border-blue-500"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter your full name"
                                        onChange={(e) => handleNameChange({ e, field })}
                                    />

                                    <p className="text-red-500 text-[13px] -mb-3 min-h-[20px]">{errors.fullName?.message}</p>

                                </div>
                            )}
                        />

                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                minLength: {
                                    value: 3,
                                    message: "Email must be at least 3 characters",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email format.",
                                },
                            }}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        {...field}
                                        type="text"
                                        maxLength={44}
                                        inputMode="email"
                                        className={`p-3 w-full text-base border ${errors.email ? "border-red-500" : "border-blue-500"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter your email"
                                        onChange={(e) => handleEmailChange({ e, field })}
                                    />

                                    <p className="text-red-500 text-[13px] -mb-3 min-h-[20px]">{errors.email?.message}</p>

                                </div>
                            )}
                        />


                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{
                                required: "Phone Number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Phone Number must be exactly 10 digits",
                                },
                                validate: (value) => {
                                    if (/^(.)\1{9}$/.test(value)) {
                                        return "Phone number cannot have all identical digits.";
                                    }
                                    return true;
                                },
                            }}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        {...field}
                                        maxLength={10}
                                        type="tel"
                                        inputMode="numeric"
                                        className={`p-3 w-full text-base border ${errors.phoneNumber ? "border-red-500" : "border-blue-500"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter your phone number"
                                        onChange={(e) => handlePhoneChange({ e, field })}
                                    />

                                    <p className="text-red-500 text-[13px] -mb-3 min-h-[20px]">{errors.phoneNumber?.message}</p>

                                </div>
                            )}
                        />

                        <label className="text-sm font-medium text-gray-700  mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/,
                                    message: "Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters",
                                },
                            }}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        {...field}
                                        type={showPassword ? "text" : "password"}
                                        maxLength={44}
                                        inputMode="text"
                                        className={`p-3 w-full text-base border ${errors.password ? "border-red-500" : "border-blue-500"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter your password"
                                        onChange={(e) => handlePasswordChange({ e, field })}
                                    />


                                    <span
                                        className="absolute right-10 top-4 cursor-pointer text-gray-600"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>

                                    <p className="text-red-500 text-[13px] -mb-3 min-h-[20px]">{errors.password?.message}</p>

                                </div>
                            )}
                        />

                        {
                            signupLoader ?
                                <div className="flex justify-center h-10 items-center">
                                    <div className="border-4 border-solid text-center border-blue-700 border-e-transparent rounded-full animate-spin w-10 h-10"></div>
                                </div>
                                :
                                <button
                                    disabled={!isValid}
                                    className={`mt-6 p-3 w-full font-medium text-lg rounded-xl ${!isValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                                >
                                    Sign Up
                                </button>
                        }

                        <div className="flex flex-col items-center">
                            <Link to="/login" className="mt-2 px-4 py-2  text-blue-600 text-lg hover:text-blue-800 transition">
                                Already have an account?
                            </Link>
                        </div>
                    </div>
                </form>
            </div>

        )

    );
}

export default Signup;