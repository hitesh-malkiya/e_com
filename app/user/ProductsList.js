

import { Button } from '@/app/components/Botton';
import Getproduct from '@/app/components/Getproduct';
import { getCardProduct, getProducts, getProductsSort } from '@/lib/Getproduct'
import { AddToCartButton } from '../components/AddToCartButton';

async function ProductsList({ queryStringURL, userName }) {

    const queryString = new URLSearchParams(queryStringURL).toString();


    let products = [];


    let cardProduct = [];
    try {
        const res = await getCardProduct(queryString, userName)
        cardProduct = res.data.products
    } catch (err) {
        console.log('Product: fetch error', err);
        cardProduct = [];
    }

    for (const cur of cardProduct) {
        try {
            const res = await getProductsSort(queryString, cur, 'id');
            if (res?.data?.products) {
                products = products.concat(res.data.products);
            }
        } catch (err) {
            console.log('Product: fetch error', err);
            products = [];
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">


            <Getproduct productData={products}>
                <AddToCartButton />
            </Getproduct>
        </div>
    )
}

export default ProductsList

