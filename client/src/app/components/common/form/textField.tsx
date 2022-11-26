import React, { useState } from "react";

interface TextFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: ({}) => void;
    error: string;
}

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error
}: TextFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.SyntheticEvent<HTMLInputElement> | any) => {
        onChange({ name: e.target.name, value: e.target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}> {label}</label>
            <div className="input-group has-validation">
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                />

                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback ">{error}</div>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};

export default TextField;
