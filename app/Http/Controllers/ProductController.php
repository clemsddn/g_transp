<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return inertia('Products/Index', ['products' => $products]);
    }

    public function create()
    {
        $companies = Company::all();
        return Inertia::render('Products/Create', [
            'companies' => $companies,
        ]);
    }

    public function store(Request $request)
    {
        $continue = $request->input('continue');
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'provenance' => 'required|string|max:255',
            'unite' => 'required|string|max:255',
            'detail' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
            'company_id' => 'required|exists:companies,id',
        ]);
       Product::create($validated);
       if($continue==1){
        return back()->with('success', 'Product created successfully.');

       }
       return redirect()->route('products.index')->with('success', 'Product created successfully.');


    }

    public function show(Product $product)
    {
        return inertia('Products/Show', ['product' => $product]);
    }

    public function edit(Product $product)
    {
        $companies = Company::all();
        return inertia('Products/Edit', [
            'product' => $product,
            'companies' => $companies,

        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'provenance' => 'required|string|max:255',
            'unite' => 'required|string|max:255',
            'detail' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
            'company_id' => 'required|exists:companies,id',
        ]);

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
