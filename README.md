# AppMovil_Estetica
El proyecto consiste en el desarrollo de una aplicación móvil para la estética canina Platón, destinada a mejorar la experiencia de los clientes permitiendo gestionar citas, comprar productos y acceder a servicios en línea de manera eficiente. La aplicación será desarrollada utilizando **Ionic** para soportar múltiples plataformas y contará con módulos como agendado de citas, gestión de usuarios, autenticación, carrito de compras y pasarela de pagos. Se seguirá la metodología ágil **XP (Extreme Programming)** para garantizar la calidad del software, promoviendo la colaboración cercana con los clientes y un desarrollo iterativo.

## Objetivo
El objetivo principal es desarrollar una aplicación móvil eficiente, fácil de usar y segura que permita a los clientes de la estética canina Platón gestionar sus citas, comprar productos y acceder a todos los servicios ofrecidos de manera conveniente desde sus dispositivos móviles.
## **Objetivos especificos**
1.	Implementar un sistema de autenticación seguro que permita a los usuarios registrarse, iniciar sesión y gestionar su perfil.
2.	Desarrollar un módulo para que los clientes agenden citas de manera eficiente y visualicen la disponibilidad de horarios en tiempo real.
3.	Integrar un carrito de compras funcional que permita a los usuarios seleccionar productos y realizar compras.
4.	Desarrollar e implementar una pasarela de pago que soporte diferentes métodos, como tarjetas y plataformas de pago digital.
5.	Asegurar que la aplicación cumpla con los estándares de diseño de experiencia de usuario (UX) y sea fácilmente navegable.

# Metodologia de trabajo
Metodología XP para el desarrollo del proyecto
La metodología ágil Extreme Programming (XP) ha sido seleccionada como el enfoque de desarrollo para este proyecto debido a su flexibilidad, enfoque en la colaboración con el cliente y énfasis en la calidad del software. XP es una metodología que busca mejorar la productividad y la calidad del producto final mediante la implementación de prácticas ágiles y técnicas de desarrollo que fomentan la adaptabilidad y el feedback continuo

# Herramientas de control de versiones
Para el desarrollo de la aplicación móvil para la estética canina Platón, se ha elegido GitHub como la herramienta de control de versiones principal. Esta elección se basa en una serie de características y beneficios que GitHub ofrece, que son cruciales para el éxito del proyecto.

**Justificación para la Elección de GitHub**

1.	Facilidad de Uso: GitHub proporciona una interfaz intuitiva que facilita la navegación y gestión de repositorios. Esto es especialmente importante para los miembros del equipo que pueden ser nuevos en el uso de sistemas de control de versiones.
2.	Colaboración Efectiva: GitHub permite la colaboración en tiempo real entre los miembros del equipo. Las funcionalidades de pull requests y issues facilitan el trabajo conjunto, la revisión de código y la discusión sobre cambios antes de que se integren en la rama principal del proyecto.
3.	Integración Continua y Entrega Continua (CI/CD): GitHub se integra fácilmente con diversas herramientas de CI/CD, lo que permite automatizar el proceso de pruebas y despliegue. Esto es esencial para garantizar que el código siempre se mantenga en un estado funcional y que las nuevas características se implementen de manera eficiente.
4.	Gestión de Versiones: GitHub utiliza Git, un sistema de control de versiones distribuido que permite a los desarrolladores trabajar de manera independiente en diferentes ramas. Esto permite que varios miembros del equipo trabajen simultáneamente en características diferentes sin interferencias, facilitando un desarrollo más ágil y organizado.
5.	Historial y Rastreabilidad: La plataforma proporciona un historial completo de cambios realizados en el código, lo que permite a los desarrolladores rastrear modificaciones y revertir cambios si es necesario. Esta característica es vital para identificar errores y mantener la estabilidad del software.
6.	Documentación y Gestión de Proyectos: GitHub incluye funcionalidades para documentar el proyecto directamente en el repositorio a través de README.md. También se pueden utilizar proyectos para planificar y gestionar tareas, lo que ayuda a mantener un enfoque organizado en el desarrollo.
7.	Comunidad y Soporte: GitHub tiene una gran comunidad de desarrolladores y un amplio ecosistema de recursos, tutoriales y foros de soporte. Esto facilita la resolución de problemas y el aprendizaje continuo para los miembros del equipo.

# Estrategia de versionamiento

Para el desarrollo de la aplicación móvil para la estética canina Platón, se ha optado por utilizar GitHub Flow como estrategia de versionamiento. Esta metodología es particularmente adecuada para proyectos que requieren un enfoque ágil y colaborativo, permitiendo a los desarrolladores trabajar de manera eficiente y organizada en paralelo.

**Estrategia de Versionamiento: GitHub Flow flujo de trabajo**

**GitHub Flow** es una estrategia simple y efectiva que se basa en la creación de ramas y un ciclo continuo de desarrollo y despliegue. Se compone de los siguientes pasos clave:

1.	Crear una Rama Nueva:
    -	Cada vez que se inicia el desarrollo de una nueva característica, se crea una rama nueva a partir de la rama principal (main - master). Esta rama se denomina de forma descriptiva, indicando la funcionalidad - el cambio que se implementará (por ejemplo, feature/login, bugfix/password-reset).
    -	Las ramas permiten que los desarrolladores trabajen en nuevas funcionalidades sin afectar la estabilidad de la rama principal.
2.	Desarrollo y Commits:
    -	Durante el trabajo en la nueva rama, los desarrolladores realizan commits frecuentemente para registrar los cambios realizados. Esto ayuda a mantener un historial claro y permite revertir cambios si es necesario.
    -	Se recomienda que los commits sean descriptivos y representen cambios significativos para facilitar la revisión posterior.
3.	Revisión y Pull Request:
    -	Una vez que se ha completado la funcionalidad en la rama, se crea un Pull Request (PR) en GitHub. Este PR permite solicitar la revisión del código por parte de otros miembros del equipo.
    -	Durante la revisión, los revisores pueden comentar sobre el código, hacer sugerencias y solicitar cambios antes de aceptar la fusión.
4.	Pruebas y Aprobación:
    -	Antes de fusionar la rama en la rama principal, se deben realizar pruebas para garantizar que la nueva funcionalidad no introduce errores ni afecta el rendimiento de la aplicación. Esto puede incluir pruebas automatizadas y pruebas manuales.
    -	Una vez que se obtienen las aprobaciones necesarias y se confirma que la funcionalidad es estable, se procede a la fusión.
5.	Fusión y Despliegue:
    -	Tras la aprobación del Pull Request, se fusiona la rama en la rama principal. Esto actualiza la base de código con la nueva funcionalidad.
    -	Se puede realizar un despliegue automático a un entorno de pruebas o producción, dependiendo de la configuración del proyecto y las prácticas del equipo.
  
# Estrategia de Despliegue

La estrategia de despliegue **Blue-Green Deployment** es un enfoque que permite realizar actualizaciones de software con el mínimo tiempo de inactividad y con un riesgo reducido. En este modelo, se utilizan dos entornos de producción, conocidos como **Blue** y **Green**, que son casi idénticos. En un momento dado, uno de estos entornos está activo y en uso por los usuarios, mientras que el otro se prepara para recibir la nueva versión de la aplicación.

**Entornos Blue y Green**

- Entorno Blue: Este es el entorno actual en producción que los usuarios están utilizando. Contiene la versión estable de la aplicación y está completamente operativo. Todos los usuarios acceden a este entorno mientras se llevan a cabo los desarrollos y pruebas en el entorno Green.
- Entorno Green: Este entorno es donde se despliega la nueva versión de la aplicación. Se realizan todas las pruebas necesarias para asegurar que la versión es estable y cumple con todos los requisitos funcionales. Una vez que la nueva versión se valida, se realiza un cambio de tráfico, dirigiendo a los usuarios al entorno Green.

**Proceso de CI/CD**

Para implementar eficientemente la estrategia de Blue-Green Deployment, se integrará un proceso de Integración Continua/Despliegue Continuo (CI/CD). Esto asegurará que las actualizaciones de la aplicación se realicen de manera automática y que se mantenga la calidad del software en cada fase del desarrollo. A continuación, se describen las fases clave del proceso CI/CD para el proyecto:

1.	**Integración Continua (CI):**
    - **Control de Versiones:** Utilizar GitHub como herramienta de control de versiones para gestionar el código fuente. Cada desarrollador crea ramas específicas para sus funcionalidades y, al finalizar, se realizan pull requests para integrar el código al branch principal.
    - **Pruebas Automatizadas:** Cada vez que se realiza un push al repositorio, se ejecutan automáticamente pruebas unitarias y de integración para verificar que el nuevo código no rompa funcionalidades existentes.
    -Construcción Automática: Una vez que las pruebas se completan con éxito, se compila automáticamente la aplicación para crear el artefacto que será desplegado en el entorno Green.
2.	**Despliegue Continuo (CD):**
    - **Despliegue en el Entorno Green:** El artefacto construido se despliega automáticamente en el entorno Green. Se realizan pruebas adicionales, incluidas pruebas de aceptación, para verificar que la nueva versión funciona como se esperaba.
    - **Cambio de Tráfico:** Después de validar que la aplicación en el entorno Green está funcionando correctamente, se realiza el cambio de tráfico. Este es un paso crítico, ya que se redirige a los usuarios al nuevo entorno, garantizando una transición sin interrupciones.
    - **Monitoreo:** Una vez que el entorno Green está activo, se inicia un monitoreo constante para detectar cualquier problema en el rendimiento o en la experiencia del usuario. En caso de que se detecten fallos, se puede revertir rápidamente al entorno Blue, asegurando la continuidad del servicio


# Dependencias
Este proyecto utiliza las siguientes dependencias:

- **Ionic Framework**: Para el desarrollo de aplicaciones móviles.
- **Angular**: Para la construcción de la interfaz de usuario y la gestión de la lógica de la aplicación.
- **Capacitor**: Para integrar aplicaciones web con las capacidades nativas de los dispositivos móviles.
- **Node.js**: Para ejecutar el entorno de desarrollo y gestionar paquetes.

## Instalación del proyecto
Para instalar las dependencias necesarias y configurar el proyecto, sigue estos pasos:

1. **Instala Node.js**:
   - Asegúrate de tener Node.js instalado.

2. **Instala Ionic CLI**:
   - Abre tu terminal y ejecuta el comando para instalar Ionic globalmente:
     ```bash
     npm install -g @ionic/cli
     ```

3. **Clona el Repositorio**:
   - Clona el repositorio con el siguiente comando:
     ```bash
     git clone https://github.com/keren31/AppMovil_EsteticaCanina.git
     ```

4. **Directorio del Proyecto**:
   - Accede a la carpeta del proyecto para ello navega con el siguiente comando:
     ```bash
     cd AppMovil_EsteticaCanina
     ```

5. **Instala las Dependencias del Proyecto**:
   - Ejecuta el comando para instalar las dependencias que requiere el proyecto:
     ```bash
     npm install
     ```

6. **Ejecuta la Aplicación**:
   - Finalmente, puedes iniciar la aplicación en un entorno de desarrollo ejecutando:
     ```bash
     ionic serve
     ```
