'use client';

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage(){
    const { gtin } = useParams();

    const [product, setProduct] = useState<any>(null);

    // ✅ FETCH PRODUCT
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `/07_module_b/api/product/${gtin}`,
                    { withCredentials: true }
                );

                const p = res.data.product;
                setProduct(p);

            } catch (err) {
                console.error(err);
            }
        };

        if (gtin) fetchProduct();
    }, [gtin]);

    const handleVisibility = async()=>{
        try {
            const prod = (await axios.patch(`/07_module_b/api/product/${gtin}`))
            alert("Product Status Change")
            window.location.reload()
        } catch (error) {
            alert(error)
        }

    }

    if (!product) return <p>Loading...</p>;

    return (
        <div className="w-screen min-h-screen flex flex-col items-center bg-slate-200 p-6">

            <h1 className="text-2xl font-bold">Product Details</h1>

            {/* PRODUCT DETAILS */}
            <div className="bg-white p-4 rounded-xl mt-4 w-full max-w-md">
                <Image src={product.product_image} alt="Product Image" width={100} height={100}/>
                <p><strong>{product.name}</strong> ({product.french_name})</p>
                <p>GTIN: {product.gtin}</p>
                <p>Brand: {product.brand}</p>
                <p>Origin: {product.origin}</p>

                <p>Gross: {product.gross_weight}</p>
                <p>Content: {product.content_weight}</p>
                <p>Unit: {product.unit_weight}</p>

                <p>{product.description}</p>
                <p>{product.french_description}</p>
            </div>


            <div className="flex items-center gap-3">
                <button onClick={handleVisibility} className="bg-black text-white p-2 rounded-md cursor-pointer">{!product.active?"Make ACTIVE":"Make IN-ACTIVE"}</button>
            </div>

        </div>
    );
}