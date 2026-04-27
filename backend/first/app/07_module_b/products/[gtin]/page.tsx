'use client';

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage(){
    const { gtin } = useParams();

    const [product, setProduct] = useState<any>(null);
    const [isOpen, setIsOpen] = useState<any>(false);

    const [updatedProduct, setUpdatedProduct] = useState<any>({
        name: "",
        french_name: "",
        description: "",
        french_description: "",
        brand: "",
        origin: "",
        gross_weight: "",
        content_weight: "",
        unit_weight: "",
    });

    // ✅ FETCH PRODUCT
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `/07_module_b/api/products/${gtin}`,
                    { withCredentials: true }
                );

                const p = res.data.product;
                setProduct(p);

                // preload form
                setUpdatedProduct({
                    name: p.name || "",
                    french_name: p.french_name || "",
                    description: p.description || "",
                    french_description: p.french_description || "",
                    brand: p.brand || "",
                    origin: p.origin || "",
                    gross_weight: p.gross_weight || "",
                    content_weight: p.content_weight || "",
                    unit_weight: p.unit_weight || "",
                });

            } catch (err) {
                console.error(err);
            }
        };

        if (gtin) fetchProduct();
    }, [gtin]);

    // ✅ UPDATE PRODUCT
    const updateProduct = async () => {
        try {
            const payload = {
                ...updatedProduct,
                gross_weight: parseFloat(updatedProduct.gross_weight),
                content_weight: parseFloat(updatedProduct.content_weight),
                unit_weight: parseFloat(updatedProduct.unit_weight),
            };

            await axios.put(
                `/07_module_b/api/products/${gtin}`,
                payload,
                { withCredentials: true }
            );

            setIsOpen(false);
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    };

    // ✅ HIDE PRODUCT
    const hideProduct = async () => {
        try {
            await axios.patch(
                `/07_module_b/api/products/${gtin}`,
                {},
                { withCredentials: true }
            );

            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="w-screen min-h-screen flex flex-col items-center bg-slate-200 p-6">

            <h1 className="text-2xl font-bold">Product Details</h1>

            {/* PRODUCT DETAILS */}
            <div className="bg-white p-4 rounded-xl mt-4 w-full max-w-md">
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

            {/* ACTIONS */}
            <div className="flex gap-4 mt-4">
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={hideProduct}
                >
                    Hide
                </button>

                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsOpen(true)}
                >
                    Update
                </button>
            </div>

            {/* UPDATE MODAL */}
            <div className={`fixed inset-0 flex justify-center items-center bg-black/60 ${isOpen ? "block" : "hidden"}`}>
                <div className="bg-white rounded-xl w-80 p-4 space-y-3">

                    <h2 className="text-lg font-bold text-center">Update Product</h2>

                    <input placeholder="Name"
                        value={updatedProduct.name}
                        onChange={(e)=>setUpdatedProduct({...updatedProduct, name: e.target.value})}
                    />

                    <input placeholder="French Name"
                        value={updatedProduct.french_name}
                        onChange={(e)=>setUpdatedProduct({...updatedProduct, french_name: e.target.value})}
                    />

                    <input placeholder="Brand"
                        value={updatedProduct.brand}
                        onChange={(e)=>setUpdatedProduct({...updatedProduct, brand: e.target.value})}
                    />

                    <input placeholder="Origin"
                        value={updatedProduct.origin}
                        onChange={(e)=>setUpdatedProduct({...updatedProduct, origin: e.target.value})}
                    />

                    <input placeholder="Gross Weight"
                        value={updatedProduct.gross_weight}
                        onChange={(e)=>setUpdatedProduct({...updatedProduct, gross_weight: e.target.value})}
                    />

                    <input placeholder="Content Weight"
                        value={updatedProduct.content_weight}
                        onChange={(e)=>setUpdatedProduct({...updatedProduct, content_weight: e.target.value})}
                    />

                    <input placeholder="Unit Weight"
                        value={updatedProduct.unit_weight}
                        onChange={(e)=>setUpdatedProduct({...updatedProduct, unit_weight: e.target.value})}
                    />

                    <textarea placeholder="Description"
                        value={updatedProduct.description}
                        onChange={(e)=>setUpdatedProduct({...updatedProduct, description: e.target.value})}
                    />

                    <textarea placeholder="French Description"
                        value={updatedProduct.french_description}
                        onChange={(e)=>setUpdatedProduct({...updatedProduct, french_description: e.target.value})}
                    />

                    <div className="flex gap-2">
                        <button 
                            className="bg-gray-400 text-white w-full p-2 rounded"
                            onClick={()=>setIsOpen(false)}
                        >
                            Cancel
                        </button>

                        <button 
                            className="bg-black text-white w-full p-2 rounded"
                            onClick={updateProduct}
                        >
                            Save
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}