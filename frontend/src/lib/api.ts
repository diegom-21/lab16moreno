// frontend/src/lib/api.ts

const BASE_URL = 'http://localhost:3001/api/productos';

// Define interfaces para los tipos de datos que manejas
export interface Producto {
  codProducto?: number; // Opcional porque lo genera la DB
  nomPro: string;
  precioProducto: number;
  stockProducto: number;
}

export async function getProductos(): Promise<Producto[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error(`Error al obtener productos: ${res.statusText}`);
  }
  return res.json();
}

export async function getProducto(id: number): Promise<Producto> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Error al obtener producto ${id}: ${res.statusText}`);
  }
  return res.json();
}

export async function createProducto(producto: Omit<Producto, 'codProducto'>): Promise<Producto> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(`Error al crear producto: ${res.statusText} - ${errorData.message}`);
  }
  return res.json();
}

export async function updateProducto(id: number, producto: Omit<Producto, 'codProducto'>): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(`Error al actualizar producto ${id}: ${res.statusText} - ${errorData.message}`);
  }
}

export async function deleteProducto(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  if (res.status === 404) {
    throw new Error(`Producto ${id} no encontrado para eliminar.`);
  }
  if (!res.ok && res.status !== 204) {
    const errorData = await res.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(`Error al eliminar producto ${id}: ${res.statusText} - ${errorData.message}`);
  }
}