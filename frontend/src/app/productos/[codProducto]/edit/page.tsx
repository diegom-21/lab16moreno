'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
// Asume que estas funciones están en tu archivo api.ts
import { getProducto, updateProducto, Producto } from '@/lib/api';

// Define una interfaz para los props que recibe este componente (el ID del producto)
interface EditProductoPageProps {
  params: {
    codProducto: string; // El ID del producto viene de la URL como string
  };
}

// Define una interfaz para el estado del formulario, similar a Producto pero con los valores como string para los inputs
interface ProductoForm {
  nomPro: string;
  precioProducto: string;
  stockProducto: string;
}

export default function EditarProducto({ params }: EditProductoPageProps) {
  const router = useRouter();
  const { codProducto } = params; // Obtiene el ID del producto de los parámetros de la URL
  const [form, setForm] = useState<ProductoForm>({ nomPro: '', precioProducto: '', stockProducto: '' });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto para cargar los datos del producto cuando el componente se monta
  useEffect(() => {
    const fetchProductData = async () => {
      if (!codProducto) return;

      try {
        setLoading(true);
        const productData = await getProducto(parseInt(codProducto, 10));
        // Cargar los datos del producto en el formulario
        setForm({
          nomPro: productData.nomPro,
          precioProducto: productData.precioProducto.toString(), // Convertir a string para el input
          stockProducto: productData.stockProducto.toString(),   // Convertir a string para el input
        });
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los datos del producto:', err);
        setError('No se pudo cargar el producto.');
        setLoading(false);
      }
    };

    fetchProductData();
  }, [codProducto]); // Dependencia: re-ejecutar si codProducto cambia

  // Manejador de cambios para los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Asegúrate de parsear a los tipos correctos antes de enviar
    const productoActualizado: Omit<Producto, 'codProducto'> = {
      nomPro: form.nomPro,
      precioProducto: parseFloat(form.precioProducto),
      stockProducto: parseInt(form.stockProducto, 10)
    };

    try {
      // Usar el codProducto de los params para la actualización
      await updateProducto(parseInt(codProducto, 10), productoActualizado);
      router.push('/productos'); // Redirigir a la lista de productos
    } catch (err) {
      console.error('Error al actualizar el producto:', err);
      // Aquí puedes añadir lógica para mostrar un mensaje de error al usuario
    }
  };

  if (loading) {
    return <div className="p-4">Cargando producto...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Producto {codProducto}</h1>
      <input
        className="border p-2 w-full"
        placeholder="Nombre"
        type="text"
        name="nomPro"
        value={form.nomPro}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Precio"
        type="number"
        step="0.01"
        name="precioProducto"
        value={form.precioProducto}
        onChange={handleChange}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Stock"
        type="number"
        name="stockProducto"
        value={form.stockProducto}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Guardar Cambios</button>
    </form>
  );
}