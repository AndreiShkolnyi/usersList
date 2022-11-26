import React from "react";
import PropTypes from "prop-types";

interface IOption {
    label: string;
    value: string;
    name: string;
    _id: string;
}

interface SelectFieldProps {
    label: string;
    value: string;
    onChange: ({}) => void;
    defaultOption: string;
    options: [IOption] | any;
    error: string;
    name: string;
}

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error,
    name
}: SelectFieldProps) => {
    const handleChange = (e: React.SyntheticEvent<HTMLInputElement> | any) => {
        onChange({ name: e.target.name, value: e.target.value });
    };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id="validationCustom04"
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option: IOption) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string
};

export default SelectField;
