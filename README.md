<h1 align="center">💎 Joyería Hoseki</h1>
<p align="center">
  Aplicación web desarrollada con <strong>React + Vite</strong> para una experiencia moderna e intuitiva 💍
</p>

<p align="center">
  <a href="https://hoseki.vercel.app" target="_blank">🌐 Ver demo en vivo</a>
</p>

---

## 📝 Descripción general

**Joyería Hoseki** es una tienda virtual que exhibe piezas de joyería con un diseño elegante y limpio.  
Construida para demostrar el uso de tecnologías modernas con una curva de aprendizaje amigable para principiantes.

---

## 🔧 Tecnologías utilizadas

### 🧰 Stack principal

| Herramienta        | Descripción                                        |
|--------------------|----------------------------------------------------|
| ⚛️ **React**       | Librería para construir interfaces dinámicas        |
| ⚡ **Vite**         | Herramienta de desarrollo ultra rápida             |
| 🎨 **Tailwind CSS**| Estilado de componentes (si está aplicado)         |
| 📦 **npm**         | Gestor de dependencias de Node.js                  |

---

## ⚙️ Requisitos

### 🛠️ Antes de empezar

Asegúrate de tener:

- Node.js `>= 16`
- npm (se incluye con Node.js)

```bash
node --version
npm --version
```

---

## 🚀 Instalación paso a paso

### 🧑‍💻 Ejecutar en local

```bash
# 1. Clona el repositorio
git clone https://github.com/Elsilla/SA-HA1.git

# 2. Entra al directorio
cd SA-HA1

# 3. Instala dependencias
npm install

# 4. Inicia el servidor local
npm run dev
```

🔎 Accede a la app desde: [http://localhost:5173](http://localhost:5173)

---

## 📂 Estructura del proyecto

```bash
SA-HA1/
├── public/           → Archivos estáticos
├── src/
│   ├── App.jsx       → Componente raíz
│   ├── main.jsx      → Entrada principal
│   ├── assets/       → Imágenes y recursos
│   ├── components/   → Componentes reutilizables
│   └── pages/        → Páginas o vistas principales
├── package.json      → Configuración del proyecto
├── vite.config.js    → Configuración de Vite
└── README.md         → Documentación (este archivo)
```

---

## 🧩 Componentes clave

### 📌 `App.jsx`

Componente raíz que define la estructura principal.

### 📌 `/components`

Aquí se encuentran botones, cards, y otros elementos reutilizables.

### 📌 `/pages`

Contiene las vistas principales de la aplicación como la portada o páginas de producto.

---

## 🖼️ Capturas de pantalla 

```md
### 🏠 Pantalla principal
![Home](src/assets/images/screenshot/home.jpg)

### 💍 Colecciones
![Detalle](src/assets/images/screenshot/colecciones.jpg)
```


---

## 🔐 Variables de entorno

En proyectos React con Vite, las **variables de entorno** permiten configurar valores sensibles o que cambian según el entorno (desarrollo, pruebas, producción).

### 📄 ¿Dónde se definen?

Debes crear un archivo llamado `.env` en la raíz del proyecto.  
Este archivo debe contener solo **variables con el prefijo `VITE_`**, para que puedan ser leídas desde el código del frontend.

### 🧪 Ejemplo de `.env`

```env
# URL de la API principal
VITE_API_URL=https://api.hoseki.com

# Clave pública de autenticación (si aplica)
VITE_PUBLIC_TOKEN=12345-abcdef

# Otras configuraciones específicas
VITE_FEATURE_SHIPPING=true
VITE_DEFAULT_LANGUAGE=es
```

> ❗ No incluyas claves privadas, contraseñas o tokens secretos en variables accesibles desde el frontend.

---

### 🧼 Buenas prácticas

- ✅ Agrega `.env` a tu archivo `.gitignore` para evitar subirlo a GitHub.
- ✅ Crea un archivo `.env.example` con valores ficticios para que otros desarrolladores sepan qué variables deben definir.
- ✅ Usa diferentes archivos según el entorno: `.env`, `.env.development`, `.env.production`.

---

### 🛠️ Cómo usar variables en el código

Puedes acceder a ellas desde cualquier archivo JavaScript o JSX con:

```js
const apiUrl = import.meta.env.VITE_API_URL;
```

---

### 📌 Ejemplo de uso real

```jsx
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/productos`)
    .then(res => res.json())
    .then(data => setProductos(data));
}, []);
```

Esto permite que, sin cambiar el código, puedas conectar a APIs diferentes para desarrollo y producción.

---

---

## 🌐 Despliegue

### 🚢 En Vercel

**Joyería Hoseki** está desplegada en [Vercel](https://vercel.com), plataforma moderna para aplicaciones frontend.

Pasos para desplegar:

1. Inicia sesión en [vercel.com](https://vercel.com)
2. Importa tu repositorio desde GitHub
3. Elige framework: `React + Vite`
4. Click en **Deploy**

🔗 **Enlace actual**: [hoseki.vercel.app](https://hoseki.vercel.app)

---

## 🔄 Scripts disponibles

| Comando             | ¿Qué hace?                                |
|---------------------|--------------------------------------------|
| `npm run dev`       | Modo desarrollo con recarga automática 🔁 |
| `npm run build`     | Construcción para producción 📦            |
| `npm run preview`   | Servir build local 🧪                      |

---

## 📚 Recursos de aprendizaje

- 📘 [React Docs (oficial)](https://react.dev/)
- ⚡ [Guía de Vite](https://vitejs.dev/guide/)
- 🎓 [Curso React + Vite en YouTube](https://www.youtube.com/results?search_query=react+vite+desde+cero)

---

## 🤝 Cómo contribuir

### Pasos para colaborar

1. Haz un fork del proyecto
2. Crea una nueva rama:  
```bash
git checkout -b mejora/feature-nueva
```
3. Haz tus cambios y commit:  
```bash
git commit -m "Agrega nueva funcionalidad"
```
4. Sube tu rama y crea un Pull Request

---

## 📄 Licencia

Distribuido bajo licencia **MIT**.  
Consulta el archivo `LICENSE` para más detalles.

---

<p align="center"><strong>✨ Gracias por visitar Joyería Hoseki ✨</strong></p>