import React from "react";

interface TextAreaFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: ({}) => void;
    error: string;
}

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    error
}: TextAreaFieldProps) => {
    const handleChange = (e: React.SyntheticEvent<HTMLInputElement> | any) => {
        onChange({ name: e.target.name, value: e.target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}> {label}</label>
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                />

                {error && <div className="invalid-feedback ">{error}</div>}
            </div>
        </div>
    );
};
TextAreaField.defaultProps = {
    type: "text"
};

export default TextAreaField;
