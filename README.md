<p align="center">
  <img src="https://github.com/DJMS-Team/djms-front/assets/103274890/c418a0a3-75a0-4e13-a54d-42dce8d85659" alt="logo" width="400" height="400">
</p>

# DMajorStore

Bienvenido a DMajorStore, tu plataforma de e-commerce para productos tecnológicos y configuración de setups ideales. Esta guía te ayudará a navegar por las diferentes funcionalidades y roles dentro de la aplicación.

## Despliegue URL

https://www.dmajorstore.online/

## Guía de instalación

- [Guía DMajor Store](https://www.youtube.com/watch?v=Q7FqbyjuRn4)

```bash
$ npm install
```

## Ejecución la aplicación

```bash
# development
$ npm run dev

# production mode
$ npm run build
$ npm run start
```

## Variables de entorno (.env)

Se debe crear el archivo .env en la raiz del proyecto y colocar los siguientes valores.

```env
NEXT_PUBLIC_API_BASE_URL=https://djms-api.icybeach-62331649.eastus.azurecontainerapps.io
NEXT_PUBLIC_BREVO_API=Contacta-al-equipo
NEXT_PUBLIC_API_URL=https://api.totalgpt.ai
NEXT_PUBLIC_API_KEY=Contacta-al-equipo
```

## Tests

Para el frontend realizamos algunas pruebas utilizando Selenium. Para ejecutar estas pruebas, se debe correr el siguiente comando

```bash
npx mocha test\
```


## Tecnologías

- **Desarrollo**: Next.js, Tailwind CSS
- **Despliegue (CD)**: Vercel. Para hacer un despliegue continuo enlazamos el repositorio a una cuenta de Vercel, haciendo el despliegue real en la rama main y una vista previa en el resto de ramas.
- **Integración (CI)**: GitHub Actions. Para hacer una integración continua creamos un flujo de trabajo en GitHub que cada vez que hiciéramos push ejecutara ciertos comandos, tales como `npm run build`.

## Figma

- [Prototipos](https://www.figma.com/design/ZZPMg3fxJ1W6OzkyTaBh4Y/DMaJor-Store?node-id=63-2&t=3eUJnyWkwDMcYTe6-0)
- [Estudio de mercado](https://www.figma.com/design/ZZPMg3fxJ1W6OzkyTaBh4Y/DMaJor-Store?node-id=368-2&t=3eUJnyWkwDMcYTe6-0)

## Roles y Funcionalidades

Es importante resaltar que un usuario puede comprar y vender productos.

### Cliente

1. **Inicio y Exploración**
   - Ingresa a la landing page y navega por todos los productos disponibles.
   - Explora las categorías y utiliza filtros como el precio más bajo y ordenación por precio.
   - Busca productos específicos utilizando palabras clave como "RAM".

2. **Detalles del Producto**
   - Visualiza detalles del producto, incluyendo fotos, preguntas y reseñas de otros usuarios.
   - Realiza comentarios y reseñas después de iniciar sesión.

3. **Carrito de Compras**
   - Añade productos al carrito desde la página de detalles o la vista previa de productos.
   - Modifica la cantidad de productos en el carrito antes de proceder al checkout.
   - Realiza el login si no lo has hecho aún para poder comprar.

4. **Checkout y Pagos**
   - Accede al carrito para realizar el checkout.
   - Crea o actualiza tu dirección de envío si es necesario.
   - Procede al pago a través de la pasarela segura de pagos.
   - Recibe una confirmación por correo electrónico después de completar la compra.

5. **Gestión de Perfil y Historial**
   - Accede a tu perfil para gestionar tu información personal.
   - Verifica el historial de compras y revisa el detalle de tus órdenes anteriores.
   - Escribe reseñas sobre productos que has comprado.

6. **Gestión de Productos**
   - Crea nuevos productos para la venta.
   - Edita la información de productos existentes.
   - Desactiva productos que ya no deseas vender.

7. **Historial de Ordenes**
   - Accede a la sección de historial de ordenes desde tu perfil para ver tus ventas.

### Admin

1. **Administración General**
   - Gestiona usuarios registrados en la plataforma.
   - Monitorea el rendimiento del sitio a través de gráficas y estadísticas.

## DMajor AI

Descubre y aprovecha al máximo nuestra avanzada herramienta de inteligencia artificial, DMajor AI. Diseñada para satisfacer las necesidades específicas de los usuarios, DMajor AI te ofrece recomendaciones personalizadas y asistencia especializada para configurar tu setup ideal. Ya sea que estés buscando optimizar tu entorno de trabajo o mejorar tu experiencia tecnológica, nuestra IA te guiará paso a paso, asegurando que cada configuración se adapte perfectamente a tus preferencias y requerimientos. Explora nuevas posibilidades y toma decisiones informadas con DMajor AI, tu compañero inteligente en la creación de un espacio tecnológico que se ajuste a ti.
