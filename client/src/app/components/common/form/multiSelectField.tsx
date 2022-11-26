import React from "react";
import Select from "react-select";

interface MultiSelectFieldProps {
    options: {} | [] | any;
    onChange: ({}) => void;
    name: string;
    label: string;
    defaultValue: string;
}

const MultiSelectField = ({
    options,
    onChange,
    name,
    label,
    defaultValue
}: MultiSelectFieldProps) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    const handleChange = (
        value: React.SyntheticEvent<HTMLInputElement> | any
    ) => {
        onChange({ name: name, value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};

export default MultiSelectField;
