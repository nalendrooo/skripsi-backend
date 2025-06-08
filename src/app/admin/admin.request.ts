// import Joi from "joi";
// import { joiGeneralMessage } from "../../utils/joi";

// export const createCourseSchema = Joi.object({
//     title: Joi.string().required().messages(joiGeneralMessage),
//     description: Joi.string().required().messages(joiGeneralMessage),
//     information: Joi.string().required().messages(joiGeneralMessage),
//     price: Joi.number().required().messages(joiGeneralMessage),
//     cover: Joi.string().required().messages(joiGeneralMessage),
//     slug: Joi.string().required().messages(joiGeneralMessage),
//     topicIds: Joi.array()
//         .items(Joi.number().integer().positive())
//         .min(1) 
//         .required()
//         .messages({
//             "array.base": "topicIds harus berupa array.",
//             "array.min": "topicIds minimal harus memiliki 1 elemen.",
//             "array.includes": "Setiap elemen dalam topicIds harus berupa angka.",
//             "any.required": "topicIds wajib diisi."
//         })
// })

// export const createSyllabusContentMaterialSchema = Joi.object({
//     title: Joi.string().required().messages(joiGeneralMessage),
//     type: Joi.string().required().messages(joiGeneralMessage),
//     slug: Joi.string().required().messages(joiGeneralMessage),
// })

// export const createMaterialContentLearningSchema = Joi.object({
//     title: Joi.string().required().messages(joiGeneralMessage),
//     estimatedTime: Joi.number().positive().min(1).required().messages(joiGeneralMessage),
//     materialContentTypeId: Joi.string().required().messages(joiGeneralMessage),
//     slug: Joi.string().required().messages(joiGeneralMessage),
//     content: Joi.string().messages(joiGeneralMessage),
// })

// export const createCategorySchema = Joi.object({
//     title: Joi.string().required().messages(joiGeneralMessage),
//     slug: Joi.string().required().messages(joiGeneralMessage),
// })

// export const createSubCategorySchema = Joi.object({
//     title: Joi.string().required().messages(joiGeneralMessage),
//     // categoryId: Joi.number().required().messages(joiGeneralMessage),
//     slug: Joi.string().required().messages(joiGeneralMessage),
// })

// export const createTopicSchema = Joi.object({
//     title: Joi.string().required().messages(joiGeneralMessage),
//     // subCategoryId: Joi.number().required().messages(joiGeneralMessage),
//     slug: Joi.string().required().messages(joiGeneralMessage),
// })