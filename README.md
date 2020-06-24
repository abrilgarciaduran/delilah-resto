Delilah Resto
=========

3er proyecto de la carrera de Desarrollo Web Full Stack en Acámica. 

El proyecto consiste en una **API Rest** para manejar los pedidos, productos y usuarios de un Restó.

---

Tecnologías utilizadas
---------

> - Node.js
> - Nodemon
> - Express
> - JWT (Json Web Token)
> - MySQL
> - Sequelize
> - Postman
> - Swagger

---

## Documentación de la API
Puedes encontrar la documentación en el archivo **/docs.yaml**. Puedes copiarla o importarla en [Swagger](https://editor.swagger.io/) o verla online [aquí](https://app.swaggerhub.com/apis/abrilgarciduran/delilah-resto/v1). Allí encontrarás los endpoints y la información necesaria para interactuar con cada uno.

---

## Instalación del proyecto

1) **Clonar el proyecto**

Abrir la consola y ejecutar:
>$ git clone https://github.com/abrilgarciaduran/delilah-resto.git

O clonar el proyecto desde el siguiente [link](https://github.com/abrilgarciaduran/delilah-resto.git)

2) **Instalar dependencias**

En la consola, dirigirse a la carpeta raíz del proyecto y ejecutar:
>npm install

3) **Configurar base de datos**

Abrir XAMPP e iniciar los servicios Apache y MySQL (Si no tiene XAMPP instalado, descarguelo [aquí](https://www.apachefriends.org/es/download.html))
Corroborar que el puerto de ejecución sea el 3306
Ingresar en su navegador a http://localhost/phpmyadmin/
Crear una nueva base de datos llamada delilah_resto desde el panel de control
Ejecutar las queries del archivo \database\db_setup.sql en la pestaña SQL del panel de control
Puedes modificar usuario, contraseña y puerto de la base de datos en \database\db_data.js

4) **Iniciar el servidor**

En la consola, dirigirse a la carpeta raíz del proyecto y ejecutar:
>node server.js

5) **Listo para usar**

En esta colección de Postman puedes ver ejemplos de consultas a cada endpoint:  [![Colección de Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d77ffe64734586288cb9) 
