const { MongoClient, ObjectId } = require("mongodb");
const XLSX = require("xlsx");

async function main() {
  const uri = "mongodb://admin:secret@localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("kambista");
    const operation = db.collection("operation");
    const clientColl = db.collection("client");

    // 1. Actualizar operaciones pendientes > 48h a expiradas
    const expiradas = await operation.find({
      status: 1,
      date: { $lt: new Date(Date.now() - 48 * 60 * 60 * 1000) }
    }).toArray();

    const expiredIds = expiradas.map(op => op._id);
    if (expiredIds.length > 0) {
      await operation.updateMany(
        { _id: { $in: expiredIds } },
        { $set: { status: 4 } }
      );
    }

    console.log(`🔄 Operaciones actualizadas a expiradas: ${expiredIds.length}\n`);

    // 2. Obtener reporte de operaciones expiradas
    const operacionesExpiradas = expiradas.map(op => ({
      idOperacion: op._id.toString(),
      montoDestino: op.amountDestination,
      moneda: op.currency,
      estadoExpirada: true
    }));

    console.log("📄 Reporte de Operaciones Expiradas:");
    console.table(operacionesExpiradas);

    // 3. Verificar clientes con 2 o más expiradas y degradarlos
    const expiradasPorCliente = await operation.aggregate([
      { $match: { status: 4 } },
      { $group: { _id: "$clientId", total: { $sum: 1 } } },
      { $match: { total: { $gte: 2 } } }
    ]).toArray();

    const clientesDegradados = [];

    for (const cliente of expiradasPorCliente) {
      const datos = await clientColl.findOne({ _id: cliente._id });
      if (datos && datos.category !== "standard") {
        await clientColl.updateOne(
          { _id: cliente._id },
          { $set: { category: "standard" } }
        );
        clientesDegradados.push({
          idCliente: cliente._id.toString(),
          nombre: datos.name,
          nivelAnterior: datos.category,
          nivelActual: "standard"
        });
      }
    }

    console.log("\n📄 Reporte de Clientes Degradados:");
    console.table(clientesDegradados);

    // 4. Exportar ambos reportes a Excel
    const wb = XLSX.utils.book_new();
    const hojaOperaciones = XLSX.utils.json_to_sheet(operacionesExpiradas);
    const hojaClientes = XLSX.utils.json_to_sheet(clientesDegradados);

    XLSX.utils.book_append_sheet(wb, hojaOperaciones, "Operaciones Expiradas");
    XLSX.utils.book_append_sheet(wb, hojaClientes, "Clientes Degradados");

    XLSX.writeFile(wb, "Reporte_Caso4.xlsx");
    console.log("\n✅ Archivo Excel generado: Reporte_Caso4.xlsx");

  } catch (err) {
    console.error("❌ Error ejecutando el caso 4:", err);
  } finally {
    await client.close();
  }
}

main();
