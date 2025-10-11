const dbcontable = require("../models/index.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mi_secreto_super_seguro";
const Usuario = dbcontable.Usuario;

// ✅ Crear usuario
async function createUsuario(req, res) {
  const dataUsuarios = req.body;

  try {
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(dataUsuarios.clave, 10);

    // Crear el usuario con rol y activo por defecto
    const crearUsuario = await Usuario.create({
      nombre: dataUsuarios.nombre,
      apellido: dataUsuarios.apellido,
      sector: dataUsuarios.sector,
      dni: dataUsuarios.dni,
      usuario: dataUsuarios.usuario,
      clave: hashedPassword,
      activo: true, // por defecto inactivo hasta que un admin lo apruebe
      rol: "usuario", // por defecto "usuario"
    });

    res.status(201).json({
      ok: true,
      message: "Usuario creado con éxito",
      usuario: crearUsuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
}

// ✅ Login
async function loginUsuario(req, res) {
  const { usuario, clave } = req.body;
  console.log("Datos recibidos para login:", usuario, clave);

  try {
    const user = await Usuario.findOne({ where: { usuario } });

    if (!user) {
      return res
        .status(401)
        .json({ ok: false, message: "Usuario no encontrado" });
    }

    if (!user.activo) {
      return res.status(403).json({
        ok: false,
        message: "Cuenta inactiva. Espere aprobación del administrador.",
      });
    }

    const claveValida = await bcrypt.compare(clave, user.clave);

    if (!claveValida) {
      return res
        .status(401)
        .json({ ok: false, message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id: user.usuario_id,
        nombre: user.nombre,
        usuario: user.usuario,
        rol: user.rol,
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      ok: true,
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: user.usuario_id,
        nombre: user.nombre,
        apellido: user.apellido,
        usuario: user.usuario,
        rol: user.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Obtener todos los usuarios
async function getUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json({ ok: true, body: usuarios });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Obtener un usuario por ID
async function getUsuarioById(req, res) {
  const id = req.params.id;
  try {
    const usuario = await Usuario.findOne({ where: { usuario_id: id } });
    res.status(200).json({ ok: true, body: usuario });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Actualizar usuario
async function updateUsuario(req, res) {
  const id = req.params.id;
  const dataUsuarios = req.body;

  try {
    let nuevaClave = dataUsuarios.clave;
    if (dataUsuarios.clave) {
      nuevaClave = await bcrypt.hash(dataUsuarios.clave, 10);
    }

    const actualizaUsuario = await Usuario.update(
      {
        nombre: dataUsuarios.nombre,
        apellido: dataUsuarios.apellido,
        sector: dataUsuarios.sector,
        dni: dataUsuarios.dni,
        usuario: dataUsuarios.usuario,
        clave: nuevaClave,
        activo: dataUsuarios.activo,
        rol: dataUsuarios.rol,
      },
      { where: { usuario_id: id } }
    );

    res.status(200).json({ ok: true, body: actualizaUsuario });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Eliminar usuario
async function deleteUsuario(req, res) {
  const id = req.params.id;

  try {
    await Usuario.destroy({ where: { usuario_id: id } });
    res.status(204).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Crear usuario admin (clave por defecto = nombre de usuario)
const createUsuarioAdmin = async (req, res) => {
  try {
    const dataUsuarios = req.body;

    const clavePorDefecto = dataUsuarios.usuario;
    const hashedPassword = await bcrypt.hash(clavePorDefecto, 10);

    const nuevoUsuario = await Usuario.create({
      nombre: dataUsuarios.nombre,
      apellido: dataUsuarios.apellido,
      usuario: dataUsuarios.usuario,
      sector: dataUsuarios.sector,
      dni: dataUsuarios.dni,
      rol: "admin",
      activo: dataUsuarios.activo !== undefined ? dataUsuarios.activo : true,
      clave: hashedPassword,
    });

    res
      .status(201)
      .json({
        ok: true,
        message: "Usuario admin creado con éxito",
        data: nuevoUsuario,
      });
  } catch (error) {
    console.error("Error al crear usuario admin:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor." });
  }
};

module.exports = {
  createUsuario,
  loginUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  createUsuarioAdmin,
};
