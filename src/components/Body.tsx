import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import { FakeStore } from '../interfaces/fakestore.interface';
import { getProducts } from '../services/fakestore.service';

function Body() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<FakeStore[]>([])

    useEffect(() => {
        console.log('inicio');
        if (!loading) {
            console.log('cargando');
            getData();
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
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    // const ordenarProductos = (products:FakeStore) => {
    //     const productosOrdenados = products.sort((a:FakeStore, b:FakeStore) => {
    //         if (a.price > b.price) {
    //             return 1;
    //         }
    //         if (a.price < b.price) {
    //             return -1;
    //         }
    //         console.log(productosOrdenados);
    //         setProducts(productosOrdenados);
    //         return 0;
    //     });
    // }

    return (
        <div>
            <h1>Lista de Productos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {products ? products.map((products, index) => (
                        <tr key={index}>
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