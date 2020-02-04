# Challenge Meetups Beer App

### Instalación

- Clonar o descargar el siguiente repositorio:

````
https://github.com/juansecalvinio/challenge-calvino-juan.git
````
 - Una vez dentro de la carpeta en la terminal o consola, ejectuar:
````
npm install
````

El repositorio cuenta con dos carpetas para separar el back y el front.

**ACLARACIÓN:** ES NECESARIO INSTALAR LAS DEPENDENCIAS DE CADA CARPETA.

- Para esto ejecutar los siguientes comandos en la terminal, primero uno y después el otro:

````
npm run install:server

npm run install:client
````

Una vez instaladas las dependencias, ejecutar el comando para iniciar la aplicación:

````
npm run start
````


### La aplicacíon cuenta con las siguientes funcionalidades:

- Permite ingresar a través de un login, con usuario administrador o usuario invitado.
- Ambos perfiles puede ver la información de cada meetup, el nombre, sobre qué trata, qué día se realiza, en qué zona, y la temperatura de ese día.
- El perfil invitado, va a poder anotarse en las meetups, y una vez anotado va a poder realizar un check-in
- El perfil administrador, va a ver la información necesaria para poder organizar los insumos necesarios para la meetup

### Aspectos técnicos

- Backend desarrollado con NodeJS y MongoDB
- Frontend desarrollado con ReactJS, utilizando Redux para manejo de estados.

El backend brinda la información de usuarios (login), e información de las meetups.
Las funcionalides del usuario invitado solamente están desarrolladas en el front, es decir, no afecta en la base de datos

### Usuarios

Administrador:
````
usuario: admin
contraseña: a2m1n.$
````

Invitados:
````
usuario: guest
contraseña: 6u35t.$
````
````
usuario: guest2
contraseña: 6u35t.$
````