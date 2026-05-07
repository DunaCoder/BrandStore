import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
// Nota: Ajusta la ruta si tu cliente se genera en la ruta por defecto
import { PrismaClient } from "@prisma/client"; 

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🚀 Iniciando siembra de datos con Adapter...");

  // Opcional: Limpiar la tabla antes de empezar
  await prisma.product.deleteMany();

  const productosData = [
    {
      name: "PlayStation 5",
      description: "Consola de última generación. SSD 825GB, 4K, Ray Tracing.",
      price: 499.99,
      stock: 50,
      isVisible: true,
      images: ["https://full-store-api-39oh.vercel.app/imagenes/ps5.webp"],
    },
    {
      name: "Samsung Galaxy S23",
      description: "Smartphone Android con 256GB. Pantalla AMOLED 2X, Cámara 50MP.",
      price: 999.00,
      stock: 120,
      isVisible: true,
      images: ["https://full-store-api-39oh.vercel.app/imagenes/SamsungS23.webp"],
    },
    {
      name: "Figura Spy x Family - Yor Forger",
      description: "Figura coleccionable de 30 cm. Material PVC premium.",
      price: 59.99,
      stock: 200,
      isVisible: true,
      images: ["https://full-store-api-39oh.vercel.app/imagenes/yorForge.webp"],
    },
    {
      name: "Monitor Gamer 27\"",
      description: "100Hz, 1ms, QHD. Panel IPS con soporte G-Sync.",
      price: 449.99,
      stock: 35,
      isVisible: true,
      images: ["https://full-store-api-39oh.vercel.app/imagenes/Monitor-Gamer.webp"],
    }
  ];

  // Usamos un bucle para insertar y ver los logs
  for (const p of productosData) {
    const item = await prisma.product.create({
      data: p,
    });
    console.log(`✅ Creado: ${item.name}`);
  }

  console.log("✨ ¡Proceso completado!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Error en el seed:", e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });