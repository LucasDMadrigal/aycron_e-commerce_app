
# Guía Técnica de Presentación – Aycron Frontend

---

## ✅ Objetivo de la demo

Presentar el recorrido de un usuario desde que entra a la tienda hasta agregar productos al carrito y proteger el acceso según su autenticación y rol.

---

## 🔗 Accesos importantes

- Frontend: [https://aycron-store.onrender.com](https://aycron-store.onrender.com)
- Backend API: [https://aycron-e-commerce-api.onrender.com](https://aycron-e-commerce-api.onrender.com)
- Repositorio: [GitHub - Frontend](https://github.com/LucasDMadrigal/aycron_e-commerce_frontend)

---

## 📸 Flujo de demo sugerido

1. Entrar a la landing
2. Ir a la tienda (MainStore)
3. Buscar y filtrar productos
4. Ver detalle y agregar al carrito
5. Ir al carrito (Cart)
6. Loguearse y ver el botón para AdminPanel si el usuario es admin
7. Mostrar cómo se protegen rutas usando React Router

---

## 🧠 Detalles técnicos para mencionar

- State global con Redux Toolkit (`store.js`, `reducers/`, `actions/`)
- Protección de rutas con `<PrivateRoute />` o lógica equivalente
- Uso de `useEffect`, `useSelector`, `useDispatch` para flujo de datos
- Manejo de token JWT en localStorage
- Uso de `fetch`/`axios` con URLs extraídas desde `.env`

---

## 🧩 Consideraciones

- El proyecto está listo para extenderse con panel de admin, checkout o tests.
- El backend ya está desplegado, solo requiere conexión vía `.env`.
