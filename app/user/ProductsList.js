


import Getproduct from '@/app/components/Getproduct';
import { getProductsSort } from '@/lib/Getproduct'
 
import DeletCard from '../components/DeletCard';
import Noproduct from '../components/Noproduct';
import { Buybtn } from '../components/Buybtn';
import { getUser } from '@/lib/getUserOrder';

async function ProductsList({ queryStringURL, userName }) {

    const queryString = new URLSearchParams(queryStringURL).toString();


    let products = [];


    let cardProduct = [];
    try {
        const res = await getUser(userName)
        
        cardProduct = res?.data?.user?.adtocard
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
        <section className="bg-white rounded-2xl shadow-xl p-8">

            {products.length === 0 ? (
                <Noproduct data="yor card is amty" p="No products found in your cart." />
            ) : (
                <Getproduct productData={products}>
                    <Buybtn />
                    <DeletCard data={"delet"} />
                </Getproduct>

            )

            }
        </section>
    )
}

export default ProductsList

