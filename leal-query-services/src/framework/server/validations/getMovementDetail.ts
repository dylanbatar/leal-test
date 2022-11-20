import { Segments, Joi } from 'celebrate';

export default {
  [Segments.PARAMS]: Joi.object().keys({
    orderId: Joi.string().required()
  })
};
