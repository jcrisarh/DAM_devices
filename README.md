# Sistema de riego automatizado
Aplicacion de Riego Automatizado en ionic como parte del trabajo practico final de la Materia Desarrollo de Aplicaciones Multiplataforma.

## Requisitos Previos
Antes de clonar y ejecutar esta aplicación, necesitarás tener instalado en tu sistema Docker y docker-compose

## Instalación
Primero, necesitas clonar este repositorio en tu máquina local. Abre una terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/jcrisarh/DAM_devices.git

```
Navega hasta el directorio de la aplicacion: 

```bash
cd DAM_devices

```
## Ejecutar la aplicacion

En la terminal ejecuta el comando:
```bash
docker compose up

```
Esto iniciara la aplicacion y podras acceder a cada uno de los servicios:
- Api Express: http://localhost:8000/
- Ionic UI: http://localhost:8100/
- phpMyAdmin: http://localhost:8001/

phpMyAdmin user: root
phpMyAdmin password: userpass

## Detener la aplicacion
Para detener la aplicación escribe en la terminal el siguiente comando:

```bash
docker compose down

```


