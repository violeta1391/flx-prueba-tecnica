![Logo Flexxus](https://flexxus.com.ar/wp-content/uploads/elementor/thumbs/logo-flexxus-header-pv8liah8khv6xfynvz03so9v98sk2tr50hts9we7dk.png)

# 🚀 **Prueba Técnica Flexxus**: CRUD de Usuarios en React

---

## 📝 **Introducción**

Este proyecto es la resolución de la prueba técnica propuesta por **Flexxus** para la posición de desarrollador/a FullStack.  
Consiste en implementar un **CRUD** (Crear, Leer, Actualizar, Eliminar) de usuarios usando **React** como frontend e interactuando con una API simulada.

---

## 🌐 **Demo en Vivo**

Accedé a la aplicación desplegada a través del siguiente enlace:  
🔗 [https://flx-prueba-tecnica-phi.vercel.app/usuarios/listado](https://flx-prueba-tecnica-phi.vercel.app/usuarios/listado)

---

## 🗂️ **Estructura del Proyecto**

```
📁 client/ → Código fuente del frontend en React  
📁 api/    → Simulación de json-server con db.json  
📁 docs/   → Ejercicios de algoritmos, estructuras de datos y SQL
```

---

## ⚛️ **Frontend (`client/`)**

Desarrollado con **React** y **Ant Design**, el frontend incluye:

- ✅ CRUD completo de usuarios.
- ✅ Validaciones de formulario (crear/editar).
- 🔍 Búsqueda por nombre o apellido.
- 🔘 Filtro por estado (activo/inactivo).
- ⏳ Simulación de carga con `setTimeout` y loaders.
- 🧠 Gestión de estado con **React Context**.
- 🧩 Uso de componentes funcionales, hooks y código reutilizable.

---

## 🧰 **Backend (`api/`)**

Implementa una **Serverless Function** para simular el comportamiento de `json-server` en Vercel.  
📄 `api/index.js` maneja las solicitudes REST sobre `db.json`.

### 🧾 Consideraciones sobre Persistencia

> ⚠️ **Importante**: Al estar desplegada como Serverless Function, los datos **no se persisten** entre llamadas.  
> Para persistencia real, ejecutá el proyecto localmente usando `json-server`.

---

## 🚀 **Despliegue**

El proyecto está desplegado en **Vercel**, utilizando:

- Soporte nativo para **React + Serverless**
- Archivo `vercel.json` para configurar el build y el enrutamiento de la API

---

## 📌 **Instrucciones Originales del Proyecto**

### 1️⃣ Fork del Repositorio

Realizá un fork y cloná el proyecto en tu máquina.

---

### 2️⃣ Inicializar el Proyecto

#### 📁 `DOCS/`
Contiene ejercicios de algoritmos en JS con tests + consultas SQL.

#### 📁 `API/`

Simulación de json-server:

```bash
cd ./api
npm install
npm run server
```

Puerto por defecto: `4000`.

#### 📁 `CLIENT/`

Crear el frontend en React:

```bash
npx create-react-app client
cd client
npm install
npm start
```

Instalar **Ant Design**:

```bash
npm install antd
```

---

### 3️⃣ Normas de Desarrollo

- 🔧 React + hooks + componentes funcionales  
- 🧹 Código limpio y comentado  
- 🔁 CRUD completo  
- 🧮 Validaciones de formulario  
- 🗂️ React Context o Redux  
- 🆔 UUID para IDs únicos  
- 🎨 Respetar diseño Figma  
- ♻️ Reutilizar componentes, evitar duplicación

---

### 4️⃣ Requerimientos del Software

- 📄 Listar usuarios  
- ➕ Crear usuarios  
- ✏️ Editar usuarios  
- ❌ Eliminar usuarios  
- 🔍 Buscar por nombre o apellido  
- 🧮 Filtrar por estado  
- 📑 Paginado (`limit` & `offset`)  
- ⏳ Simular carga + loader

---

### ✅ **Validación de Tests **

Se ejecutaron los tests incluidos en la carpeta `DOCS` para verificar la correcta resolución de los ejercicios de algoritmos y estructuras de datos.  
Las instrucciones se encuentran en el `README.md` dentro de esa carpeta.

---

## 🚚 **Entrega del Proyecto**

Subir los cambios al repositorio remoto:

```bash
git add .
git commit -m "Finalización de prueba técnica"
git push origin main
```

> Se valorará el despliegue en plataformas como **Vercel**.

---

## 🧰 **Recursos**

- 🎨 [Diseño en Figma](https://shorturl.at/rwxV4)  
- 🧩 [Documentación Ant Design](https://4x.ant.design/components/overview/)  
- 📄 [Documentación json-server](https://github.com/typicode/json-server)

---

## 🪪 **Licencia**

Este proyecto está bajo la **Licencia MIT**.  
Consultá el archivo `LICENSE` para más detalles.