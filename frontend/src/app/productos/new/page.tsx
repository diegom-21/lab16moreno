'use client';

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react'; // Importa ChangeEvent y FormEvent para tipos
import { createProducto } from '@/lib/api';

// Define una interfaz para el tipo de producto, útil para la tipificación
interface ProductoForm {
    nomPro: string;
    precioProducto: string; // Se mantiene como string para el input
    stockProducto: string;  // Se mantiene como string para el input
}

export default function CrearProducto() {
    const router = useRouter();
    // Inicializa el estado con los tipos correctos
    const [form, setForm] = useState<ProductoForm>({ nomPro: '', precioProducto: '', stockProducto: '' });

    // Manejador de cambios para los inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Asegúrate de parsear a los tipos correctos antes de enviar
        const productoParaCrear = {
            nomPro: form.nomPro,
            precioProducto: parseFloat(form.precioProducto),
            stockProducto: parseInt(form.stockProducto, 10) // Base 10 para parseInt
        };

        try {
            await createProducto(productoParaCrear);
            router.push('/productos');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            // Aquí puedes añadir lógica para mostrar un mensaje al usuario
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
            <input
                className="border p-2 w-full"
                placeholder="Nombre"
                type="text"
                name="nomPro" // Agrega el atributo name
                value={form.nomPro}
                onChange={handleChange}
                required // Agrega validación básica
            />
            <input
                className="border p-2 w-full"
                placeholder="Precio"
                type="number"
                step="0.01"
                name="precioProducto" // Agrega el atributo name
                value={form.precioProducto}
                onChange={handleChange}
                required
            />
            <input
                className="border p-2 w-full"
                placeholder="Stock"
                type="number"
                name="stockProducto" // Agrega el atributo name
                value={form.stockProducto}
                onChange={handleChange}
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Crear</button>
        </form>
    );
}