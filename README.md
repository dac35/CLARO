# 🌸 Código Rosa - Sitio Web del Colectivo

## 📋 Descripción del Proyecto

Este es el sitio web oficial del colectivo **Código Rosa**, un equipo de jóvenes programadoras que busca mostrar su identidad al mundo a través de una landing page profesional y moderna.

> **⚠️ Proyecto Ficticio**: Este es un proyecto de demostración creado únicamente con fines educativos. Todos los datos, nombres, contactos e información presentada son completamente ficticios y no representan una organización real.

## 🎯 Objetivos

- Presentar al equipo Código Rosa y sus integrantes
- Comunicar los valores y metodología del colectivo
- Crear un espacio digital atractivo y profesional
- Demostrar habilidades técnicas en desarrollo web
- Servir como portafolio y punto de contacto

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica y accesible
- **CSS3 Modular** - Estilos organizados en módulos específicos
  - `base.css` - Variables CSS, reset y estilos compartidos
  - `header.css` - Navegación y header
  - `footer.css` - Footer responsive
  - `[page].css` - Estilos específicos por página
- **Google Fonts** - Tipografías modernas (Inter + Plus Jakarta Sans)
- **Responsive Design** - Diseño adaptable para todos los dispositivos
- **CSS Grid & Flexbox** - Layouts modernos y flexibles

## 📁 Estructura del Proyecto

```
proyecto-codigo-rosa/
├── index.html                    # Página principal (importa styles.css principal)
├── styles.css                    # Archivo CSS heredado (mantenido por compatibilidad)
├── assets/
│   ├── css/
│   │   ├── base.css              # Variables, reset, estilos base compartidos
│   │   ├── header.css            # Estilos de navegación y header
│   │   ├── footer.css            # Estilos de footer
│   │   ├── styles.css            # Archivo principal con importaciones
│   │   ├── home.css              # Estilos específicos página de inicio
│   │   ├── nosotras.css          # Estilos específicos página "Sobre Nosotras"
│   │   ├── valores.css           # Estilos específicos página "Valores"
│   │   └── contacto.css          # Estilos específicos página "Contacto"
│   ├── html/
│   │   ├── nosotras.html         # Página "Sobre Nosotras"
│   │   ├── valores.html          # Página "Nuestros Valores"
│   │   └── contacto.html         # Página de contacto
│   └── images/                   # Imágenes del proyecto
│       ├── logo.png              # Logo del colectivo
│       ├── team.png              # Imagen del equipo
│       └── AI_PROMPTS.md         # Guía para generar imágenes
└── README.md                     # Este archivo
```

## 🎨 Paleta de Colores

### Colores Principales
- **Rosa Vibrante**: `#ff6b9d` - Color principal del brand
- **Rosa Suave**: `#ffd3e1` - Acentos y fondos suaves
- **Violeta Profundo**: `#6c5ce7` - Color secundario para gradientes

### Colores de Soporte
- **Azul Tech**: `#2d3748` - Texto principal y elementos serios
- **Gris Moderno**: `#4a5568` - Texto secundario
- **Gris Claro**: `#f7fafc` - Fondos de secciones
- **Blanco Puro**: `#ffffff` - Fondos principales
- **Negro Suave**: `#1a202c` - Headers y texto destacado

### Gradientes
- **Principal**: `linear-gradient(135deg, #ff6b9d 0%, #6c5ce7 100%)`
- **Suave**: `linear-gradient(135deg, #ffd3e1 0%, #f7fafc 100%)`

## 🔤 Tipografías

- **Principal**: Inter - Para texto general, interfaz y navegación
- **Display**: Plus Jakarta Sans - Para títulos y elementos destacados

## 📱 Características Responsive

- **Mobile First**: Diseño optimizado para dispositivos móviles
- **Breakpoints**:
  - Móvil: < 480px
  - Tablet: 481px - 768px
  - Desktop: > 768px

## 🏗️ Arquitectura CSS Modular

### 📦 **Organización de Archivos:**

#### **base.css** - Fundamentos
- Variables CSS (colores, tipografías, espaciado)
- Reset CSS y estilos base
- Componentes compartidos (grid, tarjetas, animaciones)
- Media queries base

#### **header.css** - Navegación
- Estilos del header sticky
- Navegación responsive
- Logo y efectos hover
- Media queries específicos

#### **footer.css** - Pie de página
- Footer de dos columnas
- Logo y texto
- Responsive design
- Efectos de hover

#### **[page].css** - Páginas específicas
- `home.css`: Hero section, identidad
- `nosotras.css`: Tarjetas de equipo extendidas
- `valores.css`: Tarjetas de valores con citas destacadas
- `contacto.css`: Información de contacto estilizada

### 🔗 **Sistema de Importaciones:**

```css
/* styles.css - Archivo principal */
@import './base.css';       /* Variables y base */
@import './header.css';     /* Navegación */
@import './footer.css';     /* Footer */
@import './home.css';       /* Página específica */
```

### ✅ **Ventajas del Sistema:**
- **Mantenibilidad**: Cada módulo tiene una responsabilidad específica
- **Escalabilidad**: Fácil añadir nuevas páginas y componentes
- **Performance**: Solo se cargan los estilos necesarios por página
- **Deploy-friendly**: Rutas relativas funcionan en cualquier servidor
- **Colaboración**: Diferentes desarrolladores pueden trabajar en módulos independientes

## 🚀 Funcionalidades

### **Características Implementadas:**
- ✅ Navegación sticky con efectos hover
- ✅ Grid responsivo para el equipo
- ✅ Imágenes reales implementadas (logo y equipo)
- ✅ Animaciones CSS suaves
- ✅ Paleta de colores moderna y consistente
- ✅ Tipografía optimizada para legibilidad
- ✅ **Arquitectura CSS modular y escalable**
- ✅ **Rutas relativas para deployments sin problemas**
- ✅ **Estilos específicos por página para mejor mantenimiento**

### Por Implementar (Futuras Mejoras)
- 🔄 Imágenes generadas con IA para el equipo y logo
- 🔄 Formulario de contacto funcional
- 🔄 Blog/News section
- 🔄 Galería de proyectos
- 🔄 Dark mode toggle
- 🔄 Animaciones con JavaScript

## 🖼️ Espacios para Contenido Generado con IA

### 1. Logo del Colectivo
- **Ubicación**: Footer y header
- **Dimensiones sugeridas**: 80x80px
- **Estilo**: Minimalista, colores rosa/violeta, símbolo que represente coding + feminidad
- **Prompt sugerido**: "Logo minimalista para colectivo de programadoras, combina elementos de código con flores, colores rosa y violeta, estilo moderno y tecnológico"

### 2. Imagen del Equipo
- **Ubicación**: Hero section de la página principal
- **Dimensiones sugeridas**: 400x300px
- **Estilo**: Ilustración moderna que represente diversidad y tecnología
- **Prompt sugerido**: "Ilustración de cuatro mujeres jóvenes trabajando en tecnología, diversas, ambiente colaborativo, laptops y código, estilo flat design moderno, colores rosa violeta y azul"

## 👥 Equipo Código Rosa

1. **Lucía González** - Líder de Diseño UX/UI
2. **Valentina Martínez** - Desarrolladora Frontend
3. **Sofía Ramírez** - Estratega de Contenidos
4. **Emma Torres** - Creatividad e Innovación IA

## 📬 Contacto

- **Email principal**: hola@codigorosa.dev
- **Proyectos**: proyectos@codigorosa.dev
- **Mentorías**: aprende@codigorosa.dev

## 📄 Licencia

© 2025 Código Rosa. Todos los derechos reservados.

---

**🌸 "Construyendo el futuro con código y creatividad"**
