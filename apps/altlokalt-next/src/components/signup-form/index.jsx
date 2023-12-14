import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import SuccessText from "@ui/success-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import signUp from "src/lib/signUp";
import { pb } from "../../lib/pb";

const SignupForm = ({ className }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: "onChange",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (pb.authStore.isValid) {
            router.push("/");
        }
    }, [router]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        await signUp({ data }).then((res) => {
            if (pb.authStore.isValid) {
                setSuccess("Signed up");
                router.push("/");
            } else {
                setError(`Incorrect credentials: ${res}`);
            }
        });
    };

    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Lag Ny Bruker</h4>
            {error && <ErrorText>{error}</ErrorText>}
            {success && <SuccessText>{success}</SuccessText>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="firstName" className="form-label">
                        Navn
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        {...register("firstName", {
                            required: "Name is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Username must have at least 3 characters",
                            },
                            maxLength: {
                                value: 150,
                                message:
                                    "Username must have at most 150 characters",
                            },
                        })}
                    />
                    {errors.firstName && (
                        <ErrorText>{errors.firstName?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="sastName" className="form-label">
                        Brukernavn
                    </label>
                    <input
                        type="text"
                        id="sastName"
                        {...register("sastName", {
                            required: "Username is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Username must have at least 3 characters",
                            },
                            maxLength: {
                                value: 150,
                                message:
                                    "Username must have at most 150 characters",
                            },
                        })}
                    />
                    {errors.sastName && (
                        <ErrorText>{errors.sastName?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="exampleInputEmail1"
                        {...register("exampleInputEmail1", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address",
                            },
                        })}
                    />
                    {errors.exampleInputEmail1 && (
                        <ErrorText>
                            {errors.exampleInputEmail1?.message}
                        </ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="newPassword" className="form-label">
                        Lag Passord
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        {...register("newPassword", {
                            required: "Password is required",
                            minLength: {
                                value: 13,
                                message:
                                    "Password must be at least 13 characters long",
                            },
                        })}
                    />
                    {errors.newPassword && (
                        <ErrorText>{errors.newPassword?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Gjenta Passord
                    </label>
                    <input
                        type="password"
                        id="exampleInputPassword1"
                        {...register("exampleInputPassword1", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === getValues("newPassword") ||
                                "The passwords do not match",
                        })}
                    />
                    {errors.exampleInputPassword1 && (
                        <ErrorText>
                            {errors.exampleInputPassword1?.message}
                        </ErrorText>
                    )}
                </div>
                <div className="mb-5 rn-check-box">
                    <input
                        type="checkbox"
                        className="rn-check-box-input"
                        id="exampleCheck1"
                        {...register("exampleCheck1", {
                            required: "Checkbox is required",
                        })}
                    />
                    <label
                        className="rn-check-box-label"
                        htmlFor="exampleCheck1"
                    >
                        Allow to all privacy & Allow to all terms & conditions
                    </label>
                    <br />
                    {errors.exampleCheck1 && (
                        <ErrorText>{errors.exampleCheck1?.message}</ErrorText>
                    )}
                </div>
                <Button type="submit" size="medium" className="mr--15">
                    Ny bruker
                </Button>
                <Button path="/login" color="primary-alta" size="medium">
                    Logg In
                </Button>
            </form>
        </div>
    );
};

SignupForm.propTypes = {
    className: PropTypes.string,
};
export default SignupForm;
