// app/colecion/page.tsx
import { prisma } from "@/lib/prisma";
import Products from "../components/Products";

export default async function ColecionPage() {
  // Aquí ocurre la magia: pedimos los datos directamente a la DB
  const productosDesdeDB = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' } // Opcional: mostrar los más nuevos primero
  });

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-center text-4xl font-bold mb-10">Nuestra Colección</h1>
      
      {/* Le pasamos los datos al componente que acabamos de ajustar */}
      <Products products={productosDesdeDB} />
    </main>
  );
}