# 📋 SCRIPTS SQL - Sistema Veterinario

## 🚀 Ejecución Rápida

### Opción 1: Desde la línea de comandos de Windows

```bash
# Navega a la carpeta del proyecto
cd C:\Projects\Cuarta1\database

# Ejecuta el script de creación
mysql -u root -p < crear_tablas.sql

# Ejecuta el script de datos de prueba
mysql -u root -p < datos_prueba.sql
```

### Opción 2: Desde MySQL Workbench

1. Abre MySQL Workbench
2. Conecta a tu servidor MySQL
3. File → Open SQL Script → Selecciona `crear_tablas.sql`
4. Ejecuta (⚡ o Ctrl+Shift+Enter)
5. Repite para `datos_prueba.sql`

### Opción 3: Copiar y pegar directo en MySQL

```bash
# Accede a MySQL
mysql -u root -p

# Copia y pega el contenido de crear_tablas.sql
# Luego copia y pega el contenido de datos_prueba.sql
```

---

## 📁 Archivos

| Archivo | Descripción |
|---------|-------------|
| `crear_tablas.sql` | Crea la base de datos y las 4 tablas |
| `datos_prueba.sql` | Inserta datos de ejemplo |
| `schema.sql` | Script completo con vistas, triggers y procedimientos |

---

## ✅ Verificar que se creó correctamente

```sql
USE sistema_veterinario;

-- Ver todas las tablas
SHOW TABLES;

-- Contar registros
SELECT 
    (SELECT COUNT(*) FROM propietarios) as propietarios,
    (SELECT COUNT(*) FROM mascotas) as mascotas,
    (SELECT COUNT(*) FROM historial_medico) as historiales;

-- Ver datos
SELECT * FROM propietarios;
SELECT * FROM mascotas;
SELECT * FROM historial_medico;
```

---

## 🔑 Estructura de las Tablas

### 1️⃣ propietarios
- id (PK)
- nombre
- apellido
- cedula (UNIQUE)
- telefono
- correo (UNIQUE)

### 2️⃣ mascotas
- id (PK)
- nombre
- edad
- raza
- propietario_id (FK → propietarios)

### 3️⃣ historial_medico
- id (PK)
- diagnostico
- motivo_consulta
- fecha
- mascota_id (FK → mascotas)

### 4️⃣ usuarios
- id (PK)
- email (UNIQUE)
- password
- nombre
- rol (ADMIN/VETERINARIAN)

---

## 📊 Datos de Prueba Incluidos

- **5 propietarios**
- **8 mascotas** 
- **10 registros médicos**
- **2 usuarios** (admin y veterinario)

---

## ⚠️ Notas Importantes

1. **Contraseñas**: En el script están en texto plano. En producción deben estar hasheadas.
2. **Cascade Delete**: Al eliminar un propietario, se eliminan sus mascotas y sus historiales.
3. **Relaciones**: 
   - 1 Propietario → N Mascotas
   - 1 Mascota → N Historiales Médicos
