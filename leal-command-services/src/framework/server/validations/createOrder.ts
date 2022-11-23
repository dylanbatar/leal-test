import { Segments, Joi } from 'celebrate';

export default {
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.string().required(),
    payMethod: Joi.string().required(),
    listProducts: Joi.array<string>().required(),
    total: Joi.number().required(),
    points: Joi.number().required()
  })
};
