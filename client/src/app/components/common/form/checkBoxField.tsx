import React from "react";

interface CheckBoxFieldProps {
    name: string;
    value: boolean;
    onChange: ({}) => void;
    children: React.ReactNode;
    error: string;
}
const CheckBoxField = ({
    name,
    value,
    onChange,
    children,
    error
}: CheckBoxFieldProps) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label className="form-check-label " htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default CheckBoxField;
