import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import SuccessText from "@ui/success-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pb } from "../../lib/pb";
import login from "../../lib/signIn";

const LoginForm = ({ className }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
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
        await login({ data }).then((res) => {
            if (pb.authStore.isValid) {
                setSuccess("Logged in");
                router.push("/");
            } else {
                setError(`Incorrect credentials: ${res}`);
            }
        });
    };

    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Login</h4>
            {error && <ErrorText>{error}</ErrorText>}
            {success && <SuccessText>{success}</SuccessText>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email addresse
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
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Passord
                    </label>
                    <input
                        type="password"
                        id="exampleInputPassword1"
                        {...register("exampleInputPassword1", {
                            required: "Password is required",
                            minLength: {
                                value: 13,
                                message:
                                    "Password must be at least 13 characters long",
                            },
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
                        {...register("exampleCheck1")}
                    />
                    <label
                        className="rn-check-box-label"
                        htmlFor="exampleCheck1"
                    >
                        Remember me
                    </label>
                </div>

                <Button type="submit" size="medium" className="mr--15">
                    Log In
                </Button>
                <Button path="/sign-up" color="primary-alta" size="medium">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    className: PropTypes.string,
};
export default LoginForm;
