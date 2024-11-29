import Joi from "joi";

export const newsSchema = Joi.object({
  categoryId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "categoryId phải là ObjectId hợp lệ",
      "string.empty": "categoryId không được để trống",
      "any.required": "categoryId là trường bắt buộc",
    }),
  title: Joi.string().required().messages({
    "string.empty": "Tiêu đề không được để trống",
    "any.required": "Vui lòng nhập tiêu đề",
  }),
  detail: Joi.string().allow(null, "").messages({
    "string.base": "Nội dung phải là chuỗi văn bản",
  }),
  image: Joi.string().allow(null, "").messages({
    "string.uri": "Hình ảnh phải là đường dẫn hợp lệ",
  }),
})
