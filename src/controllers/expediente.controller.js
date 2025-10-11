// controllers/expediente.controller.js
const dbcontable = require("../models/index.model");
const Expediente = dbcontable.Expediente;
const Usuario = dbcontable.Usuario;

// ✅ Crear expediente
async function createExpediente(req, res) {
  try {
    const data = req.body;

    if (!data.numero || !data.asunto || !data.clase || !data.usuario_id) {
      return res
        .status(400)
        .json({ ok: false, message: "Faltan campos obligatorios" });
    }

    // 🔎 Buscar si ya existe
    let expediente = await Expediente.findOne({
      where: { numero: data.numero },
    });

    if (expediente) {
      // 👉 Ya existe → actualizar como reingreso
      expediente.reingresos = (expediente.reingresos || 0) + 1;
      expediente.fechaReingreso = new Date();
      expediente.tipoMovimiento =
        expediente.reingresos === 1
          ? "reingreso 1"
          : `reingreso ${expediente.reingresos}`;

      expediente.usuario_id = data.usuario_id; // 👈 actualizar usuario si cambió
      expediente.asunto = data.asunto;
      expediente.clase = data.clase;

      expediente.terminado = false; // 👈 marcar como pendiente nuevamente

      await expediente.save();

      return res.status(200).json({
        ok: true,
        message: `Expediente reingresado (${expediente.tipoMovimiento}) ✅`,
        body: expediente,
      });
    }

    // 👉 Si no existe → crear nuevo
    const nuevoExpediente = await Expediente.create({
      numero: data.numero,
      asunto: data.asunto,
      clase: data.clase,
      usuario_id: data.usuario_id,
      tipoMovimiento: "ingreso",
      terminado: false,
      fechaIngreso: new Date(),
      reingresos: 0,
    });

    res.status(201).json({
      ok: true,
      message: "Expediente registrado ✅",
      body: nuevoExpediente,
    });
  } catch (error) {
    console.error("Error en createExpediente:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// ✅ Obtener todos los expedientes
async function getExpedientes(req, res) {
  try {
    const expedientes = await Expediente.findAll();
    res.status(200).json({ ok: true, body: expedientes });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Obtener expedientes por usuario

async function getExpedientesByUsuario(req, res) {
  const usuarioId = req.params.id;
  if (!usuarioId) {
    return res
      .status(400)
      .json({ ok: false, message: "Usuario ID es obligatorio" });
  }

  try {
    const expedientes = await Expediente.findAll({
      where: { usuario_id: usuarioId },
    });
    res.status(200).json({ ok: true, body: expedientes });
  } catch (error) {
    console.error("Error getExpedientesByUsuario:", error);
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Obtener expediente por ID
async function getExpedienteById(req, res) {
  const id = req.params.id;
  try {
    const expediente = await Expediente.findOne({
      where: { expediente_id: id },
    });
    res.status(200).json({ ok: true, body: expediente });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Actualizar expediente
async function updateExpediente(req, res) {
  const id = req.params.id;
  const data = req.body;

  try {
    await Expediente.update(
      {
        numero: data.numero,
        asunto: data.asunto,
        clase: data.clase,
        usuario_id: data.usuario_id,
        tipoMovimiento: data.tipoMovimiento, // 🔹 Nuevo campo obligatorio
        observacion: data.observacion,
        fechaInicio: data.fechaInicio,
        comentarios: data.comentarios,
        terminado: data.terminado,
        fechaEnvio: data.fechaEnvio,
      },
      { where: { expediente_id: id } }
    );

    const actualizado = await Expediente.findOne({
      where: { expediente_id: id },
    });
    res.status(200).json({ ok: true, body: actualizado });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Eliminar expediente
async function deleteExpediente(req, res) {
  const id = req.params.id;
  try {
    await Expediente.destroy({ where: { expediente_id: id } });
    res.status(204).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Historial de expedientes (con usuario relacionado)
async function getExpedientesHistorial(req, res) {
  try {
    const expedientes = await Expediente.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["usuario_id", "nombre", "apellido", "usuario"],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    res.status(200).json({ ok: true, body: expedientes });
  } catch (error) {
    console.error("Error getExpedientesHistorial:", error);
    res.status(500).json({ ok: false, message: error.message });
  }
}

// ✅ Obtener expediente por número (todos los registros con ese número)
const getExpedienteByNumero = async (req, res) => {
  try {
    const numero = req.params.numero;

    const expedientes = await Expediente.findAll({
      where: { numero },
      include: [
        {
          model: Usuario,
          as: "usuario", // 👈 usa el alias si definiste asociación con alias
          attributes: ["usuario_id", "nombre", "apellido", "usuario"],
        },
      ],
      order: [["createdAt", "ASC"]], // 👈 opcional: para que te devuelva en orden cronológico
    });

    if (!expedientes || expedientes.length === 0) {
      return res.status(404).json({ ok: false, msg: "No encontrado" });
    }

    res.json({ ok: true, body: expedientes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, msg: "Error en servidor" });
  }
};

module.exports = {
  createExpediente,
  getExpedientes,
  getExpedienteById,
  updateExpediente,
  deleteExpediente,
  getExpedientesByUsuario,
  getExpedientesHistorial,
  getExpedienteByNumero,
};
