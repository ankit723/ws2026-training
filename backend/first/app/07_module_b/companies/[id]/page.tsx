'use client';

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompanyPage(){
    const { id } = useParams();

    const [companyDetails, setCompanyDetails] = useState<any>(null);
    const [products, setProducts] = useState<any>([]);

    const [isOpen, setIsOpen] = useState<any>(false);
    const [isProductOpen, setIsProductOpen] = useState<any>(false);

    const [newCompany, setNewCompany] = useState<any>({
        name: "",
        email: "",
        number: "",
        address: "",
        
        owner_name: "",
        owner_email: "",
        owner_number: "",
        
        contact_name: "",
        contact_email: "",
        contact_number: "",
    });

    const [newProduct, setNewProduct] = useState({
        gtin: "",
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const companyRes = await axios.get(`/07_module_b/api/companies/${id}`, {
                    withCredentials: true
                });

                const c = companyRes.data.company;
                setCompanyDetails(c);

                setNewCompany({
                    name: c?.name || "",
                    email: c?.email || "",
                    number: c?.tel_number || "",
                    address: c?.address || "",

                    owner_name: c?.owner?.name || "",
                    owner_email: c?.owner?.email || "",
                    owner_number: c?.owner?.phone || "",

                    contact_name: c?.contact?.name || "",
                    contact_email: c?.contact?.email || "",
                    contact_number: c?.contact?.phone || "",
                });

                // ✅ fetch products
                const productRes = await axios.get(
                    `/07_module_b/api/companies/${id}/product`,
                    { withCredentials: true }
                );

                setProducts(productRes.data.products);

            } catch (err) {
                console.error(err);
            }
        };

        if (id) fetchData();
    }, [id]);

    const submitCompany = async () => {
        try {
            await axios.put(
                `/07_module_b/api/companies/${id}`,
                newCompany,
                { withCredentials: true }
            );

            setIsOpen(false);
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    };

    const deactivateCompany = async () => {
        try {
            await axios.patch(
                `/07_module_b/api/companies/${id}`,
                {},
                { withCredentials: true }
            );

            window.location.reload();

        } catch (err) {
            console.error(err);
        }
    };

    const submitProduct = async () => {
        try {
            const payload = {
                ...newProduct,
                gross_weight: parseFloat(newProduct.gross_weight),
                content_weight: parseFloat(newProduct.content_weight),
                unit_weight: parseFloat(newProduct.unit_weight),
            };

            const res = await axios.post(
                `/07_module_b/api/companies/${id}/product`,
                payload,
                { withCredentials: true }
            );

            setProducts([...products, res.data.product]);
            setIsProductOpen(false);

            setNewProduct({
                gtin: "",
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

        } catch (err) {
            console.error(err);
        }
    };

    if (!companyDetails) return <p>Loading...</p>;

    return (
        <div className="w-screen min-h-screen flex flex-col items-center bg-slate-200 p-6">

            <h1 className="text-2xl font-bold">Company Details</h1>

            {/* COMPANY DETAILS */}
            <div className="border rounded-xl bg-white p-3 flex flex-col mt-4 w-full max-w-md">
                <p>Name: {companyDetails.name}</p>
                <p>Email: {companyDetails.email}</p>
                <p>Telephone: {companyDetails.tel_number}</p>

                <p>Owner: {companyDetails?.owner?.name}</p>
                <p>Owner Email: {companyDetails?.owner?.email}</p>
                <p>Owner Phone: {companyDetails?.owner?.phone}</p>
                
                <p>Contact: {companyDetails?.contact?.name}</p>
                <p>Contact Email: {companyDetails?.contact?.email}</p>
                <p>Contact Phone: {companyDetails?.contact?.phone}</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={deactivateCompany}>
                    Deactivate
                </button>

                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsOpen(true)}>
                    Update
                </button>

                <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setIsProductOpen(true)}>
                    Add Product
                </button>
            </div>

            {/* PRODUCT LIST */}
            <div className="mt-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-2">Products</h2>

                {/* ================= ACTIVE PRODUCTS ================= */}
                <div className="bg-white rounded-lg p-3 space-y-2 mb-4">
                    <h3 className="font-semibold text-green-600 mb-2">
                        Active Products
                    </h3>

                    {products.filter((p:any) => !p.hidden).length === 0 ? (
                        <p>No active products</p>
                    ) : (
                        products
                            .filter((p:any) => !p.hidden)
                            .map((p:any) => (
                                <Link
                                    key={p.gtin}
                                    href={`/07_module_b/products/${p.gtin}`}
                                    className="block border p-2 rounded hover:bg-gray-50"
                                >
                                    <p><strong>{p.name}</strong> ({p.french_name})</p>
                                    <p>GTIN: {p.gtin}</p>
                                    <p>Brand: {p.brand}</p>
                                    <p>Origin: {p.origin}</p>
                                    <p>
                                        Weights: {p.gross_weight} / {p.content_weight} / {p.unit_weight}
                                    </p>
                                </Link>
                            ))
                    )}
                </div>

                {/* ================= HIDDEN PRODUCTS ================= */}
                <div className="bg-gray-100 rounded-lg p-3 space-y-2">
                    <h3 className="font-semibold text-red-600 mb-2">
                        Hidden Products
                    </h3>

                    {products.filter((p:any) => p.hidden).length === 0 ? (
                        <p>No hidden products</p>
                    ) : (
                        products
                            .filter((p: any) => p.hidden)
                            .map((p: any) => (
                                <div
                                    key={p.gtin}
                                    className="border p-2 rounded opacity-60"
                                >
                                    <p><strong>{p.name}</strong> ({p.french_name})</p>
                                    <p>GTIN: {p.gtin}</p>
                                    <p>Brand: {p.brand}</p>
                                    <p>Origin: {p.origin}</p>
                                    <p>
                                        Weights: {p.gross_weight} / {p.content_weight} / {p.unit_weight}
                                    </p>
                                </div>
                            ))
                    )}
                </div>
            </div>

            {/* UPDATE COMPANY MODAL */}
            <div className={`fixed inset-0 flex justify-center items-center bg-black/60 ${isOpen ? "block" : "hidden"}`}>
                <div className="bg-white rounded-xl w-80 p-4 space-y-4">
                    <h2 className="text-lg font-bold text-center">Update Company</h2>

                    <input placeholder="Name" value={newCompany.name} onChange={(e)=>setNewCompany({...newCompany, name: e.target.value})}/>
                    <input placeholder="Email" value={newCompany.email} onChange={(e)=>setNewCompany({...newCompany, email: e.target.value})}/>
                    <input placeholder="Number" value={newCompany.number} onChange={(e)=>setNewCompany({...newCompany, number: e.target.value})}/>
                    <input placeholder="Address" value={newCompany.address} onChange={(e)=>setNewCompany({...newCompany, address: e.target.value})}/>

                    <div className="flex gap-2">
                        <button className="bg-gray-400 text-white w-full p-2 rounded" onClick={()=>setIsOpen(false)}>Cancel</button>
                        <button className="bg-black text-white w-full p-2 rounded" onClick={submitCompany}>Save</button>
                    </div>
                </div>
            </div>

            {/* CREATE PRODUCT MODAL */}
            <div className={`fixed inset-0 flex justify-center items-center bg-black/60 ${isProductOpen ? "block" : "hidden"}`}>
                <div className="bg-white rounded-xl w-80 p-4 space-y-3">
                    <h2 className="text-lg font-bold text-center">Create Product</h2>

                    <input placeholder="GTIN" value={newProduct.gtin} onChange={(e)=>setNewProduct({...newProduct, gtin: e.target.value})}/>
                    <input placeholder="Name" value={newProduct.name} onChange={(e)=>setNewProduct({...newProduct, name: e.target.value})}/>
                    <input placeholder="French Name" value={newProduct.french_name} onChange={(e)=>setNewProduct({...newProduct, french_name: e.target.value})}/>
                    <input placeholder="Brand" value={newProduct.brand} onChange={(e)=>setNewProduct({...newProduct, brand: e.target.value})}/>
                    <input placeholder="Origin" value={newProduct.origin} onChange={(e)=>setNewProduct({...newProduct, origin: e.target.value})}/>
                    <input placeholder="Gross Weight" value={newProduct.gross_weight} onChange={(e)=>setNewProduct({...newProduct, gross_weight: e.target.value})}/>
                    <input placeholder="Content Weight" value={newProduct.content_weight} onChange={(e)=>setNewProduct({...newProduct, content_weight: e.target.value})}/>
                    <input placeholder="Unit Weight" value={newProduct.unit_weight} onChange={(e)=>setNewProduct({...newProduct, unit_weight: e.target.value})}/>
                    <textarea placeholder="Description" value={newProduct.description} onChange={(e)=>setNewProduct({...newProduct, description: e.target.value})}/>
                    <textarea placeholder="French Description" value={newProduct.french_description} onChange={(e)=>setNewProduct({...newProduct, french_description: e.target.value})}/>

                    <div className="flex gap-2">
                        <button className="bg-gray-400 text-white w-full p-2 rounded" onClick={()=>setIsProductOpen(false)}>Cancel</button>
                        <button className="bg-green-600 text-white w-full p-2 rounded" onClick={submitProduct}>Create</button>
                    </div>
                </div>
            </div>

        </div>
    );
}