import { countryDialCodes } from "../constants/countryDialCodes";

const ContactForm = () => {
    return (
        <>
            <form className="mx-auto w-full max-w-[520px] space-y-5 text-left">
                <h3 className="text-2xl font-semibold leading-tight text-neutral-900 sm:text-[28px]">
                    Get start here
                </h3>

                <div className="mt-5">
                    <div class="form-group mb-5 custom-input">
                        <input
                            type="text"
                            placeholder=" "
                            id="name"
                            className="w-full rounded-[10px] border border-neutral-200 bg-white text-sm font-medium text-neutral-900 outline-none focus:border-neutral-400"
                        />
                        <label for="name">Your Name</label>
                    </div>
                    <div class="form-group mb-5 custom-input">
                        <input
                            type="text"
                            placeholder=" "
                            id="email"
                            className="w-full rounded-[10px] border border-neutral-200 bg-white text-sm font-medium text-neutral-900 outline-none focus:border-neutral-400"
                        />
                        <label for="email">Email</label>
                    </div>
                    <div className="flex w-full overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
                        <div className="flex w-[90px] min-w-[90px] items-center gap-2 border-r border-neutral-200 px-3">
                            <select className="w-full border-none bg-transparent text-sm font-medium text-neutral-900 outline-none">
                                <option value="+91">+91</option>
                            </select>
                        </div>
                        <div className="relative flex-1 border-neutral-200">
                            <div class="form-group mb-5 custom-input" style={{ marginBottom: 0 }}>
                                <input
                                    type="text"
                                    placeholder=" "
                                    id="phone"
                                    style={{ border: "0 none" }}
                                    className="w-full rounded-[10px] border border-neutral-200 bg-white text-sm font-medium text-neutral-900 outline-none focus:border-neutral-400"
                                />
                                <label for="phone">Phone</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-12 mb-7 mt-7">
                        <p className="text-sm font-semibold text-neutral-900">
                            Interested in?
                        </p>
                        <div className="flex flex-wrap items-center justify-space-between gap-7 text-sm font-medium text-neutral-900">
                            <div class="form-group custom-checkbox">
                                <input type="checkbox" id="audit" />
                                <label for="audit">UX Audit</label>
                            </div>
                            <div class="form-group custom-checkbox">
                                <input type="checkbox" id="design" />
                                <label for="design">Design &amp; Development</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group mb-5 custom-input">
                        <textarea
                            placeholder=" "
                            rows={3}
                            id="message"
                            className="w-full rounded-[10px] border border-neutral-200 bg-white text-sm font-medium text-neutral-900 outline-none focus:border-neutral-400"
                        />
                        <label for="message">Share project brief</label>
                    </div>
                    <button className="primary-btn flex w-full items-center justify-center">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};
export default ContactForm;
