import Joi from "@hapi/joi";

export const registrationValidatation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required().max(255),
        email: Joi.string().min(6).required().max(255).email(),
        password: Joi.string().min(6).required().max(1024),
    });

    return schema.validate(data)
}

export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().max(255).email(),
        password: Joi.string().min(6).required().max(1024),
    });

    return schema.validate(data)
}

export const productValidation = (data) => {
    const shema = Joi.object({
         title: Joi.string().min(6).max(128).required(),
         body: Joi.string().min(64).max(4096).required(),
         price: Joi.string().required().regex(/^[0-9]{0,9}$/),
         thumb: Joi.string(),
         date: Joi.date(),
         images: Joi.array(),
         floor: Joi.string().regex(/^[0-9]{0,9}$/),
         square: Joi.string().required().regex(/^[0-9]{0,9}$/),
         rooms: Joi.string().regex(/^[0-9]{0,9}$/),
         heating: Joi.string().required().valid("Автономне", "Централізоване"),
         furniture: Joi.string().required().default(false),
         refit: Joi.string().valid("Євро", "Відсутній", "Косметичний"),
         infrastructure: Joi.array(),
    })

    return shema.validate(data)
}