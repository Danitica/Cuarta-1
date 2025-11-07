-- Datos de prueba para el sistema veterinario

USE sistema_veterinario;

-- Insertar propietarios
INSERT INTO propietarios (nombre, apellido, cedula, telefono, correo) VALUES
('Juan', 'Pérez', '1234567890', '555-0101', 'juan.perez@email.com'),
('María', 'González', '0987654321', '555-0102', 'maria.gonzalez@email.com'),
('Carlos', 'Rodríguez', '1122334455', '555-0103', 'carlos.rodriguez@email.com'),
('Ana', 'Martínez', '5544332211', '555-0104', 'ana.martinez@email.com'),
('Luis', 'López', '6677889900', '555-0105', 'luis.lopez@email.com');

-- Insertar mascotas
INSERT INTO mascotas (nombre, edad, raza, propietario_id) VALUES
('Max', 5, 'Labrador', 1),
('Luna', 3, 'Siamés', 1),
('Rocky', 7, 'Pastor Alemán', 2),
('Mia', 2, 'Persa', 3),
('Bella', 4, 'Golden Retriever', 3),
('Charlie', 6, 'Bulldog Francés', 4),
('Coco', 1, 'Canario', 5),
('Toby', 8, 'Beagle', 2);

-- Insertar historial médico
INSERT INTO historial_medico (diagnostico, motivo_consulta, fecha, mascota_id) VALUES
('Gastroenteritis leve', 'Vómitos y diarrea', '2024-01-15', 1),
('Vacunación antirrábica', 'Vacunación anual', '2024-02-20', 1),
('Conjuntivitis', 'Ojos irritados y llorosos', '2024-03-10', 2),
('Control rutinario', 'Chequeo general de salud', '2024-04-05', 3),
('Otitis externa', 'Sacude la cabeza frecuentemente', '2024-05-12', 4),
('Vacunación múltiple', 'Vacunas de cachorros', '2024-06-18', 5),
('Dermatitis alérgica', 'Rascado constante, piel enrojecida', '2024-07-22', 6),
('Chequeo post-operatorio', 'Control después de esterilización', '2024-08-30', 7),
('Infección respiratoria', 'Tos y estornudos', '2024-09-14', 8),
('Limpieza dental', 'Acumulación de sarro', '2024-10-10', 3);

-- Insertar usuario administrador de prueba
-- Email: elena.fernandez@ejemplo.com | Password: password
INSERT INTO usuarios (email, password, nombre, rol) VALUES
('elena.fernandez@ejemplo.com', 'password', 'Elena Fernández', 'ADMIN'),
('veterinario@veterinaria.com', 'password', 'Dr. Veterinario', 'VETERINARIAN');
