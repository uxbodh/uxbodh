"use client";
import { countryDialCodes } from "../constants/countryDialCodes";
import { useForm } from "react-hook-form";
import { sendEnquiryForm } from "../api/apiRoutes";
import { useState } from "react";

const ContactForm = ({ getFormData }) => {
    const [formDataMsg, setFormDataMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const setFormDataFunction = (data) => {
        getFormData(data);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onChange", // show error on blur
        reValidateMode: "onChange", // hide error while typing
        criteriaMode: "firstError",
        defaultValues: {
            countryCode: "+91",
        },
    });

    const SendContactForm = async (payload) => {
        setLoading(true);
        const res = await sendEnquiryForm(payload);
        if(res?.data?.data?.status === "success") {
            console.log("res", res?.data?.data);
            setFormDataFunction(res?.data?.data);
            setFormDataMsg(res?.data?.data);
            reset({
                fullname: "",
                email: "",
                phone: "",
                query: "",
                interests: [],
                countryCode: "+91",
            });
            setTimeout(() => setFormDataMsg(null), 30000);
        } else {
            message.error(res?.data?.error?.message || "Something went wrong!!!")
        }
        setLoading(false);
    };

    const onSubmit = (data) => {
        console.log("data", data);
        const payload = {
            fullname: data?.fullname,
            email: data?.email.toLowerCase(),
            phone: data?.phone,
            query: data?.query,
            countryCode: data?.countryCode,
            interests: data?.interests,
        };
        console.log("payload", payload);
        SendContactForm(payload);
    };

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-[520px] space-y-5 text-left"
        >
            <h3 className="text-2xl font-semibold leading-tight text-neutral-900 sm:text-[28px]">
                Get started here
            </h3>

            <div className="mt-5">
                {/* Full Name */}
                <div className="form-group mb-5 custom-input">
                    <input
                        type="text"
                        placeholder=" "
                        id="fullname"
                        className={`w-full rounded-[10px] border ${
                            errors.fullname
                                ? "border-red-500"
                                : "border-neutral-200"
                        } bg-white text-sm font-medium outline-none`}
                        {...register("fullname", {
                            required: "Name is required",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters",
                            },
                        })}
                    />
                    <label htmlFor="fullname">Your Name</label>
                    {errors.fullname && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.fullname.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="form-group mb-5 custom-input">
                    <input
                        type="text"
                        placeholder=" "
                        name="email"
                        id="email"
                        className={`w-full rounded-[10px] border ${
                            errors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-neutral-200 focus:border-neutral-400"
                        } bg-white text-sm font-medium text-neutral-900 outline-none focus:border-neutral-400`}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                message: "Enter a valid email address",
                            },
                        })}
                    />
                    <label htmlFor="email">Email</label>
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <div
                        className={`flex w-full overflow-hidden rounded-[10px] border ${
                            errors.phone
                                ? "border-red-500 focus:border-red-500"
                                : "border-neutral-200 focus:border-neutral-400"
                        } bg-white`}
                    >
                        <div className="flex w-[90px] min-w-[90px] items-center gap-2 border-r border-neutral-200 px-3">
                            <select className="w-full border-none bg-transparent text-sm font-medium text-neutral-900 outline-none">
                                {countryDialCodes.map((list) => (
                                    <option
                                        key={list.code}
                                        value={list.dial_code}
                                        title={list.label}
                                    >
                                        {list.dial_code}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="relative flex-1">
                            <div
                                className="form-group custom-input"
                                style={{ marginBottom: 0 }}
                            >
                                <input
                                    type="text"
                                    placeholder=" "
                                    id="phone"
                                    className="w-full border-0 bg-white text-sm font-medium text-neutral-900 outline-none"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^\d{6,12}$/,
                                            message:
                                                "Enter a valid phone number (6-12 digits)",
                                        },
                                    })}
                                />
                                <label htmlFor="phone">Phone</label>
                            </div>
                        </div>
                    </div>
                    {errors.phone && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                {/* Interested In */}
                <div className="mb-7 mt-7 ">
                    <div className="flex flex-row gap-12">
                        <p className="text-sm font-semibold text-neutral-900">
                            Interested in?
                        </p>
                        <div className="flex flex-wrap items-center gap-7 text-sm font-medium text-neutral-900">
                            <div className="form-group custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="audit"
                                    value="UX Audit"
                                    {...register("interests", {
                                        validate: (value) =>
                                            value.length > 0 ||
                                            "Select at least one interest",
                                    })}
                                />
                                <label htmlFor="audit">UX Audit</label>
                            </div>
                            <div className="form-group custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="design"
                                    value="Design & Development"
                                    {...register("interests")}
                                />
                                <label htmlFor="design">
                                    Design &amp; Development
                                </label>
                            </div>
                        </div>
                    </div>
                    {errors.interests && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors.interests.message}
                        </p>
                    )}
                </div>

                {/* Message */}
                <div className="form-group custom-input">
                    <textarea
                        placeholder=" "
                        // rows={3}
                        name="query"
                        id="query"
                        className={`w-full rounded-[10px] border ${
                            errors.query
                                ? "border-red-500 focus:border-red-500"
                                : "border-neutral-200 focus:border-neutral-400"
                        } bg-white text-sm font-medium text-neutral-900 outline-none focus:border-neutral-400`}
                        {...register("query", {
                            required: "Query is required",
                            minLength: {
                                value: 50,
                                message: "Query must be at least 50 characters",
                            },
                        })}
                    />
                    <label htmlFor="query">Share project brief</label>
                    {errors.query && (
                        <p
                            className="text-xs text-red-500"
                            style={{ marginTop: 0 }}
                        >
                            {errors.query.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <input
                    type="submit"
                    value={loading ? "Sending..." : "Submit"}
                    className="primary-btn mt-5 flex w-full items-center justify-center cursor-pointer"
                    disabled={loading}
                />
            </div>
            {formDataMsg && (
                <div>
                    <p style={{color: 'green'}}>{formDataMsg.message}</p>
                </div>
            )}
        </form>
    );
};

export default ContactForm;
