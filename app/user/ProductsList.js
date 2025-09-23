


import Getproduct from '@/app/components/Getproduct';
import { getCardProduct, getProductsSort } from '@/lib/Getproduct'
 
import DeletCard from '../components/DeletCard';
import Noproduct from '../components/Noproduct';
import { Buybtn } from '../components/Buybtn';

async function ProductsList({ queryStringURL, userName }) {

    const queryString = new URLSearchParams(queryStringURL).toString();


    let products = [];


    let cardProduct = [];
    try {
        const res = await getCardProduct(queryString, userName)
        cardProduct = res.data.products
    } catch (err) {

        cardProduct = [];
    }

    for (const cur of cardProduct) {
        try {
            const res = await getProductsSort(queryString, cur, 'id');
            if (res?.data?.products) {
                products = products.concat(res.data.products);
            }
        } catch (err) {

            products = [];
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">

            {products.length === 0 ? (
                <Noproduct data="yor card is amty" p="No products found in your cart." />
            ) : (
                <Getproduct productData={products}>
                    <Buybtn />
                    <DeletCard data={"delet"} />
                </Getproduct>

            )

            }
        </div>
    )
}

export default ProductsList

