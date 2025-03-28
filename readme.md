# Challenge de Soporte IT 🚀  

👋 Somos Kambista y estamos en la búsqueda de un nuevo miembro para nuestro equipo de tech que nos ayude a seguir ofreciendo la mejor experiencia de cambio, para esto hemos preparado un reto técnico el cual pueden completar y enviarnos el resultado con las instrucciones instruciones de entrega

## 📌 Configuración de Base de Datos Local con Docker  
Para facilitar la prueba, te proporcionamos una base de datos local utilizando Docker. Sigue las instrucciones a continuación para configurar y ejecutar MongoDB en tu entorno local.

---

### 1️⃣ Instalación de Docker  
**Antes de levantar MongoDB, asegúrate de tener Docker instalado:**  

#### Windows 🖥️  
- Descarga e instala [Docker Desktop](https://www.docker.com/products/docker-desktop)  
- Asegúrate de que Docker esté corriendo antes de continuar  

#### Mac 🍏  
- Descarga e instala [Docker Desktop para Mac](https://www.docker.com/products/docker-desktop)  
- Verifica la instalación ejecutando: docker --version

---

### 2️⃣ Instalar y ejecutar MongoDB con Docker  
Ejecuta el siguiente comando para levantar un contenedor de MongoDB:  

`docker run -d --name mongodb -p 27017:27017
-e MONGO_INITDB_ROOT_USERNAME=admin
-e MONGO_INITDB_ROOT_PASSWORD=secret
-v mongodb_data:/data/db
mongo:latest`

---

### 3️⃣ Conectarse a la base de datos  
Una vez el contenedor esté corriendo, conéctate mediante:  

`docker exec -it mongodb mongosh -u admin -p secret`

---

### 4️⃣ Crear una base de datos con datos fake  
Dentro de la CLI de MongoDB, ejecuta:  

```
db.operation.insertMany([
  { "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b60"), "isTransferred": true, "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b70"), "amountDestination": 300, "currency": "USD", "status": 2, "date": ISODate("2024-03-28T09:00:00Z"), "category": "standard" },
  { "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b61"),  "isTransferred": true, "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b70"), "amountDestination": 200, "currency": "USD", "status": 2, "date": ISODate("2024-03-28T10:30:00Z"), "category": "standard" },

  { "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b62"), "isTransferred": true, "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b71"), "amountDestination": 5000, "currency": "USD", "status": 2, "date": ISODate("2024-03-28T08:00:00Z"), "category": "premiun" },
  { "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b63"),  "isTransferred": true, "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b71"), "amountDestination": 7000, "currency": "USD", "status": 2, "date": ISODate("2024-03-28T11:00:00Z"), "category": "premiun" },
  { "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b64"),  "isTransferred": true, "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b71"), "amountDestination": 3000, "currency": "USD", "status": 2, "date": ISODate("2024-03-28T14:00:00Z"), "category": "premiun" },
  { "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b68"),  "isTransferred": true, "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b71"), "amountDestination": 2000, "currency": "USD", "status": 2, "date": ISODate("2024-03-28T16:00:00Z"), "category": "premiun" },
  { "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b69"),  "isTransferred": false, "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b71"), "amountDestination": 1000, "currency": "USD", "status": 2, "date": ISODate("2024-03-28T18:00:00Z"), "category": "premiun" },
  {
    "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b65"),
    "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b72"),
    "amountDestination": 19500,
    "currency": "PEN",
    "status": 2,
    "isTransferred": true,
    "date": ISODate("2024-03-28T12:00:00Z"),
    "category": "premiun",
    "exchangeRate": 3.8,
    "convertedAmount": 5131.57,
    "manualReview": false 
  },
  { "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b66"), "isTransferred": false, "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b73"), "amountDestination": 600, "currency": "USD", "status": 1, "date": ISODate("2024-03-25T14:00:00Z"), "category": "premiun" },
  { "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b67"),  "isTransferred": false, "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b73"), "amountDestination": 1200, "currency": "USD", "status": 1, "date": ISODate("2024-03-25T15:00:00Z"), "category": "premiun" }
]);

db.client.insertMany([
  { "_id": ObjectId("65a3f2007a1b4f9d3c8e2b70"), "name": "Pedro Rojas", "categoria": "standard", "limitDaily": 500 },
  { "_id": ObjectId("65a3f2007a1b4f9d3c8e2b71"), "name": "Laura Castro", "categoria": "premiun", "limitDaily": 20000 },
  { "_id": ObjectId("65a3f2007a1b4f9d3c8e2b72"), "name": "Ana Duarte", "categoria": "premiun", "limitDaily": 5000 },
  { "_id": ObjectId("65a3f2007a1b4f9d3c8e2b73"), "name": "Carlos Mora", "categoria": "premiun", "limitDaily": 1000 }
]);
```


# 📓 Situación
Kambista es una casa de cambio digital donde los clientes pueden realizar operaciones de compra y venta de divisas. Pero ultimamente se estan presentando problemas con sus operaciones.

## Reglas de Negocio
### Estados de una operación:
- **(1) pendiente**: No cuenta para límites hasta ser resuelta.
- **(2) completado**: Aplica para límites diarios.
- **(3 )rechazado**: No debe contar para los limites diarios.
- **(4) expirado**: Estado automático después de 48h en pendiente. No cuenta para límites.

### Límites Diarios:
- **standard**: 2 operaciones "completado" por día.
- **premiun**: 4 operaciones "completado".
- **vip**: Sin límite, pero transacciones >5,500 USD requieren una revisión manual(Esto aplica para todas las categorias).

### Colecciones:
- operation
- client

nota: Las operaciones que son completadas como siguiente paso son transferidas a los clientes por el area de liquidaciones.

### Caso 1:
"Hola chicos de soporte, El cliente con id: "65a3f2007a1b4f9d3c8e2b70", no le esta permitiendo crear una operación, podrian ayudarnos a saber que esta ocurriendo?"

**Tareas:**
1. Explica que esta sucediendo.
2. Query de mongo para solucionar el problema o confirmar que es una regla de negocio o de logica.
3. Respuesta y/o preguntas que darias al que reporto el problema.
4. ¿Amerita escalar o abrir ticket, sustenta tu respuesta tanto si es afirmativa o negativa?


### Caso 2:
"Tenemos un cliente con el siguiente id: 65a3f2007a1b4f9d3c8e2b71,  que finalizo su operación con id: '65a3f1f87a1b4f9d3c8e2b62', estamos a punto de transferirle el valor de su operación, pero validamos que se le permitio crear una mas halla de su limite de operaciones."


**Tareas:**
1. Explica que esta sucediendo.
2. Query de mongo para solucionar el problema o confirmar que es una regla de negocio o de logica.
3. Respuesta y/o preguntas que darias al que reporto el problema.
4. ¿Amerita escalar o abrir ticket, sustenta tu respuesta tanto si es afirmativa o negativa?

### Caso 3:
**Límites Diarios Reales:**
Crea una consulta que muestre para cada cliente en una sola query:
1. Transacciones válidas para límites (completado + pendiente según categoría) por cada cliente.
2. Suma total de todas las operaciones convertidas a soles si amerita, usa el tipo de cambio 3.78 para la conversión.
3. Marcar con una propiedad bandera cada operación si requiere revisión manual.
4. Mostrar el nombre del cliente y su categoría

### Caso 4:
**Detección de Expiraciones:**
para este caso limpiamos la data:
db.operation.drop();
db.client.drop();

insertamos esta nueva data:
```
db.operation.insertMany([
  {
    "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b01"),
    "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b90"),
    "amountDestination": 5500,
    "currency": "USD",
    "status": 2,
    "date": ISODate("2024-03-25T12:00:00Z"),
    "category": "vip",
    "exchangeRate": 3.8,
    "convertedAmount": 20900,
    "manualReview": true
  },
  {
    "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b02"),
    "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b91"),
    "amountDestination": 19500,
    "currency": "PEN",
    "status": 2,
    "date": ISODate("2024-03-28T12:00:00Z"),
    "category": "premiun",
    "exchangeRate": 3.8,
    "convertedAmount": 5131.57,
    "manualReview": false
  },
  {
    "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b03"),
    "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b90"),
    "amountDestination": 4000,
    "currency": "USD",
    "status": 1,
    "date": ISODate("2024-03-27T12:00:00Z"),
    "category": "vip",
    "exchangeRate": 3.75,
    "convertedAmount": 15000
  },
  {
    "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b04"),
    "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b91"),
    "amountDestination": 8000,
    "currency": "PEN",
    "status": 1,
    "date": ISODate("2024-03-25T10:00:00Z"),
    "category": "standard",
    "exchangeRate": 3.8,
    "convertedAmount": 2105.26
  },
  {
    "_id": ObjectId("65a3f1f87a1b4f9d3c8e2b05"),
    "clientId": ObjectId("65a3f2007a1b4f9d3c8e2b91"),
    "amountDestination": 9000,
    "currency": "PEN",
    "status": 1,
    "date": ISODate("2024-03-24T08:00:00Z"),
    "category": "standard",
    "exchangeRate": 3.8,
    "convertedAmount": 2368.42
  }
]);

db.client.insertMany([
  {
    "_id": ObjectId("65a3f2007a1b4f9d3c8e2b90"),
    "name": "Julian Casablanca",
    "category": "vip"
  },
  {
    "_id": ObjectId("65a3f2007a1b4f9d3c8e2b91"),
    "name": "Albert Hammond",
    "category": "premiun"
  }
])

```

Actualiza todas las transacciones pendiente >48h a expirado, y ademas los clientes que tengan 2 o mas operaciones expiradas deben ser degradados a standard en su categoria.

**tareas:**
- Query de mongo para solucionar el problema.
- Explica el razonamiento de tu solucion.
- Genera un script que automatice el proceso, ademas el resultado final de este script deberian ser 2 reportes.
- Puedes usar javascript o python para desarrollar este script.

Mongo string para poder conectarte a tu base de datos local desde el script que desarrolles
`mongodb://admin:secret@localhost:27017`


Reporte operaciones expiradas 
| idOperación(uuid) | montoDestino(number) | moneda(string) | estadoExirada(boolean) |
|-----------|---------|-----------|-----------|
| `asdasd12321312asdwas` | 1240 | `PEN` | true | 


Reporte con el nivel anterior y actual de los clientes que han sido degradados 
| idCliente(uuid) | nombre | nivelAnterior | nivelActual(boolean) |
|-----------|---------|-----------|-----------|
| `asdasd12321312asdwas` | `Julian Casablanca` | `premiun` | `standard` | 
| `asdasd12321312asdwas` | `Albert Hammond` | `vip` | `standard` | 


### Caso 5:
Documenta como ticket este problema:
"Las transacciones en PEN no están disparando la revisión manual cuando superan el equivalente a 5,5000 USD, debido a que la conversión se aplica después de la validación inicial."

**Incluye:**
1. Query para identificar transacciones afectadas.
2. Solución temporal ah aplicar (ej: script de corrección).
3. Propuesta de fix permanente para desarrollo.

### Caso 6:
**Incidentes Simultáneos:**
1. El script de actualización de categorías falló, dejando 1,200 usuarios como "standard".
2. 3 usuarios vip reportan transacciones "completadas" no reflejadas en sus balances.
3. Operaciones reporta que un cliente esta teniendo errores para ingresar a su cuenta, visualizando logs, MongoDB está rechazando conexiones (error 500).

**Tareas:**
1. Ordena las soluciones y justifica tu respuesta.
2. ¿Qué información pedirías a cada área involucrada o con que personas te comunicarias?
