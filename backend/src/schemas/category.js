import joi from "joi";

export const categorySchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": "Vui lòng nhập tên",
    }),
    
});
