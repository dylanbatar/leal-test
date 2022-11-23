import { Segments, Joi } from 'celebrate';

export default {
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required()
  })
};
