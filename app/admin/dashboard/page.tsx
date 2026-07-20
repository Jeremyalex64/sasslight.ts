"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/products";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin");
    } else {
      fetchProducts();
    }
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition"
              >
                {showAddForm ? "Cancel" : "Add Product"}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <AddProductForm
              editingProduct={editingProduct}
              onSuccess={() => {
                fetchProducts();
                setShowAddForm(false);
                setEditingProduct(null);
              }}
              onCancel={() => {
                setShowAddForm(false);
                setEditingProduct(null);
              }}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Products ({products.length})
            </h2>
            {products.length === 0 ? (
              <p className="text-gray-800 font-medium">
                No products yet. Add your first product!
              </p>
            ) : (
              <div className="grid gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 flex items-start gap-4"
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-900 mt-1">
                        {product.description}
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-2">
                        Price: {product.price}
                      </p>
                      <a
                        href={product.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Affiliate Link
                      </a>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-amber-600 text-white px-3 py-1 rounded-md hover:bg-amber-700 transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddProductForm({
  editingProduct,
  onSuccess,
  onCancel,
}: {
  editingProduct: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    affiliateLink: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        image: editingProduct.image,
        affiliateLink: editingProduct.affiliateLink,
        price: editingProduct.price,
      });
    }
  }, [editingProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;

      if (uploadMethod === "file" && imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          imageUrl = uploadData.url;
        } else {
          console.error("Image upload failed");
          return;
        }
      }

      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, image: imageUrl }),
        });
        if (res.ok) {
          onSuccess();
        }
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, image: imageUrl }),
        });
        if (res.ok) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Product Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Image
        </label>
        <div className="flex gap-4 mb-2">
          <button
            type="button"
            onClick={() => {
              setUploadMethod("url");
              setFormData({ ...formData, image: "" });
            }}
            className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
              uploadMethod === "url"
                ? "bg-amber-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => {
              setUploadMethod("file");
              setFormData({ ...formData, image: "" });
            }}
            className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
              uploadMethod === "file"
                ? "bg-amber-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Upload File
          </button>
        </div>
        {uploadMethod === "url" ? (
          <input
            type="url"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
            required
            placeholder="https://example.com/image.jpg"
          />
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
            required
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Affiliate Link
        </label>
        <input
          type="url"
          value={formData.affiliateLink}
          onChange={(e) =>
            setFormData({ ...formData, affiliateLink: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Price
        </label>
        <input
          type="text"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
