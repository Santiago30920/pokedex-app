# Proyecto PocketDeck

Este proyecto utiliza Laravel como API y Angular para el frontend. A continuación, se detallan los pasos para la instalación y configuración del entorno de desarrollo.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- PHP 8.0 o superior
- Composer
- PostgreSQL
- Node.js y npm
- Angular CLI

## Instalación del Backend (Laravel)

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. Instala las dependencias de Laravel:
   ```bash
   composer install
   ```

3. Crea el archivo de configuración `.env` y establece la conexión con la base de datos PostgreSQL:
   ```bash
   cp .env.example .env
   ```

4. Configura la base de datos en `.env`:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=postgres.local
   DB_PORT=5432
   DB_DATABASE=pocketDeck
   DB_USERNAME=postgres
   DB_PASSWORD=Password12345
   ```

5. Genera la clave de la aplicación:
   ```bash
   php artisan key:generate
   ```

6. Ejecuta las migraciones para crear las tablas en la base de datos:
   ```bash
   php artisan migrate
   ```

7. Inicia el servidor de Laravel:
   ```bash
   php artisan serve
   ```

## Instalación del Frontend (Angular)

1. Dirígete a la carpeta del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias de Angular:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

## Ejecución del proyecto

1. Asegúrate de que el backend (Laravel) está en ejecución en `http://127.0.0.1:8000`.
2. Asegúrate de que el frontend (Angular) está corriendo en `http://localhost:4200`.
3. Accede a la aplicación desde tu navegador.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Crea un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza los cambios y confírmalos (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube los cambios a tu fork (`git push origin feature-nueva-funcionalidad`).
5. Crea un Pull Request en el repositorio original.

## Licencia

Este proyecto está bajo la licencia MIT.

