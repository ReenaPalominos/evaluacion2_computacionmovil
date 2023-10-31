import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { FakeStore } from '../interfaces/fakestore.interface';
import { getProducts } from '../services/fakestore.service';
import { Loading } from './Loading';
import { Error } from './Error';

export type orden = 'asc' | 'desc'

function Body() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [products, setProducts] = useState<FakeStore[]>([])
    const [ordenDatos, setOrdenDatos] = useState<orden>('asc')
    
    useEffect(() => {
        console.log('inicio');
        if (!loading) {
            console.log('cargando');
            getData();
            setOrdenDatos('asc');
        }
        console.log('fin');
    }, [])

    const getData = async () => {
        setLoading(true)
        try {
            const response = await getProducts()
            const productsData = response.data;
            console.log(productsData);
            setProducts(productsData);
            setLoading(false);
            console.log("products:", products);
            setError(false);
            
        } catch (error) {
            setError(true);
            console.error(error);
        }
        setLoading(false)
    }
   

    useEffect(() => {
      console.log("ordenando");
        if (ordenDatos === 'asc') {
            const productosOrdenados = [...products].sort((a, b) => {
                return a.price - b.price;
            });
            setProducts(productosOrdenados);
        } else {
            const productosOrdenados = [...products].sort((a, b) => {
                return b.price - a.price;
            });
            setProducts(productosOrdenados);
      }
    }, [ordenDatos])

    
    return (
        <div>
            <h1>Lista de Productos</h1>
            <button onClick={() => setOrdenDatos('asc')} hidden={ordenDatos === 'asc'}>Ascendente</button>
            <button onClick={() => setOrdenDatos('desc')} hidden={ordenDatos === 'desc'}>Descendente</button>
            {loading ? (
                <Loading />
            ) : error ? (
                <Error />
            ) : (
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
            )}
        </div>
    );
}

export default Body;