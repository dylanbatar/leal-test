## Leal Test

Implementacion de una app utilizando microservicios y arquitectura Hexagonal, EVENT SOURCING(Kafka) y CQRS

[![Untitled-2022-11-15-0545.png](https://i.postimg.cc/KY2p2ZFf/Untitled-2022-11-15-0545.png)](https://postimg.cc/mPmy3WP1)

## Estructura

### leal-query-services

Servicios de lectura a la base de datos

### leal-command-services

Servicios de escritura a la base de datos

### Endpoints

<p>Consultar puntos de un usuario</p>

```
GET: http://localhost:3001/users/:id
```

<p>Ver detalles de un movimiento</p>

```
GET: http://localhost:3001/orders/:id
```

<p>Crear una orden [Acumular puntos/ o redimirlos]</p>

```
POST: http://localhost:3000/orders
BODY: {
  userId: string,
  points: number
  payMethod: string
  total: number
  products: string[]
}
```

## Tecnologias usadas

- Typescript
- Node
- Jest
- Kafka (Broker de mensajeria)
- DynamoDB
