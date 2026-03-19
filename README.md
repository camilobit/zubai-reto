🧪 Zubai Challenge — AI Integration Agent
🚀 Descripción

Este proyecto implementa un sistema que, a partir de un API spec, genera automáticamente una integración en Node.js, la ejecuta y normaliza la respuesta.
El enfoque no fue solo consumir un API, sino simular un flujo donde el sistema:

* genera código
* lo ejecuta
* maneja errores
* produce datos estandarizados

▶️ Cómo correrlo
1. Instalar dependencias
npm install
2. Ejecutar el generador
node generador.js
3. Ejecutar la Integración
node runner.js


🧠 Decisiones clave
* Separé la generación (generador.js) de la ejecución (runner.js) para simular un sistema modular

* Implementé retry automático con 3 intentos para hacer el sistema más resiliente

* Mantuve una estructura simple pero extensible

* Normalicé la salida para desacoplar el proveedor del formato final


🤖 Uso de IA
Utilicé IA (ChatGPT / Cursor) para:
Generar una base del código
Definir la estructura del sistema
Implementar el retry automático
Detectar y corregir errores
La lógica final fue validada y ajustada manualmente tras ejecutar el sistema.


⚔️ Mensaje final
This is not about writing code.
This is about building systems that can write and fix code.