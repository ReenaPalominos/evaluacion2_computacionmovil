import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import { FakeStore } from '../interfaces/fakestore.interface';
import { getProducts } from '../services/fakestore.service';

export type orden = 'asc' | 'desc'

function Body() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<FakeStore[]>([])
    const [ordenDatos, setOrdenDatos] = useState<orden>('asc');

    useEffect(() => {
        console.log('inicio');
        if (!loading) {
            console.log('cargando');
            getData();
        }
        console.log('fin');
    }, [ordenDatos])

    const getData = async () => {
        setLoading(true)
        try {
            const response = await getProducts()
            const productsData = response.data;
            console.log(productsData);
            setProducts(productsData);
            setLoading(false);
            console.log("products:", products);
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    const ordenarProductos = (ord: orden) => {
        const productosOrdenados = [...products].sort((a, b) => {
          if (ord === 'asc') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      
        setProducts(productosOrdenados);
      };
      

    return (
        <div>
            <h1>Lista de Productos</h1>
            <button onClick={() => ordenarProductos(ordenDatos === 'asc' ? 'desc' : 'asc')}>Cambiar Orden</button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {products ? products.map((products, index) => (
                        <tr key={index}>
                            <td>{products.id}</td>
                            <td>{products.title}</td>
                            <td>{products.price}</td>
                        </tr>
                    )) : ''
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Body;