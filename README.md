# Prototype Fish Tracker

![Fish](fish-image.jpg)

Este proyecto es un prototipo de una aplicación web desarrollada en React que simula el seguimiento de poblaciones de diferentes especies de peces. El objetivo principal es demostrar el uso del patrón de diseño Prototipo y la integración de gráficos interactivos utilizando la librería `react-google-charts`. El proyecto también utiliza la librería `simple-statistics` para calcular y mostrar estadísticas relevantes sobre las poblaciones de peces.

## Patrón de Diseño: Prototipo

El patrón de diseño Prototipo se utiliza en este proyecto para permitir la clonación de objetos `FishSpecies`, lo que representa diferentes especies de peces. La clonación se realiza utilizando el método `clone`, lo que permite crear nuevas instancias de especies de peces con sus propias propiedades, incluyendo nombre y población.

## Modelo de Dinámica Poblacional

El modelo de dinámica poblacional implementado en este prototipo es una simplificación y se basa en un crecimiento o decrecimiento aleatorio de la población de peces. El crecimiento o decrecimiento es determinado por una tasa de crecimiento aleatoria generada en función de una probabilidad del 50%. Esto simula de manera básica los cambios en la población de peces con el tiempo.

## Cómo Usar

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando el comando `npm install`.
3. Ejecuta la aplicación con `npm start`.
4. Interactúa con los componentes de especies de peces para simular cambios en la población y observar los gráficos interactivos.

## Dependencias Principales

- React
- `react-google-charts` para los gráficos interactivos.
- `simple-statistics` para calcular estadísticas poblacionales.

## Autor

Jose Javier Gutierrez Ramirez

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar, por favor sigue las mejores prácticas de desarrollo y crea un pull request. Si encuentras errores o tienes sugerencias, por favor abre un issue.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
