import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const AddProducts = ({ onSuccess, initialData }) => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        stock: '',
        category: 'Geral'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');

        if (initialData) {
            const updatedProducts = storedProducts.map(p => 
                p.id === initialData.id ? { ...productData, id: p.id } : p
            );
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        } else {
            const newProduct = { ...productData, id: Date.now() };
            localStorage.setItem('products', JSON.stringify([...storedProducts, newProduct]));
        }

        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-4">
                <p className="text-sm text-gray-500">Preencha os dados do novo produto.</p>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <Input 
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        placeholder="Nome do produto" 
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                        <Input 
                            name="price"
                            type="number" 
                            value={productData.price}
                            onChange={handleChange}
                            placeholder="0.00" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                        <Input 
                            name="stock"
                            type="number" 
                            value={productData.stock}
                            onChange={handleChange}
                            placeholder="Quantidade" 
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select 
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    >
                        <option value="">Selecione uma categoria...</option>
                        <option value="eletronicos">Eletrónicos</option>
                        <option value="roupa">Roupa</option>
                        <option value="alimentos">Alimentos</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="secondary" onClick={onSuccess}>
                        Cancelar
                    </Button>
                
                    <Button type="submit" variant="primary">
                        Guardar Produto
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default AddProducts;