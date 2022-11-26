import React, { useState } from "react";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";

interface AddProps {
    onSubmit: (data: {}) => any;
}

const AddCommentForm = ({ onSubmit }: AddProps) => {
    const [data, setData] = useState<{} | any>({});
    const [errors, setErrors] = useState<{} | any>({});
    const handleChange = (e: React.SyntheticEvent<HTMLInputElement> | any) => {
        setData((prevState: any) => ({
            ...prevState,
            [e.name]: e.value
        }));
    };
    const validatorConfog = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfog);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    value={data.content || ""}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

export default AddCommentForm;
