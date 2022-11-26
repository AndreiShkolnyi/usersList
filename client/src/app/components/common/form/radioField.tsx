import React from "react";

interface IOption {
    name: string;
    value: string;
}

interface RadioFieldProps {
    options: [IOption];
    name: string;
    onChange: ({}) => void;
    value: string;
    label: string;
}

const RadioField = ({
    options,
    name,
    onChange,
    value,
    label
}: RadioFieldProps) => {
    const handleChange = (e: React.SyntheticEvent<HTMLInputElement> | any) => {
        onChange({ name: e.target.name, value: e.target.value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div>
                {options.map((option) => (
                    <div
                        key={option.name + "_" + option.value}
                        className="form-check form-check-inline"
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            id={option.name + "_" + option.value}
                            checked={option.value === value}
                            value={option.value}
                            onChange={handleChange}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={option.name + "_" + option.value}
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioField;
