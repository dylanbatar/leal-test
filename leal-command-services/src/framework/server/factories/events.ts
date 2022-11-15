import { IBroker } from '../../../domain/ports/IBroker';
import { KafkaBroker } from '../../events/kafka';

let kafkaBroker: IBroker = null;

if (!kafkaBroker) {
  kafkaBroker = new KafkaBroker('leal-service-app', ['localhost:9092']);
}

export default kafkaBroker;
