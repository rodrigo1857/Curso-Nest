import * as Joi from 'joi';

export const JoiValidation = Joi.object({ 

    MONGODB:Joi.required(),//localhost:27017/nest-pokemon
    PORT :Joi.number().default(3002),
    DEFAULT_LIMIT : Joi.number().default(15),

})