<?php
namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::all();
        return Inertia::render('Companies/Index', ['companies' => $companies]);
    }

    public function create()
    {
        return Inertia::render('Companies/Create');
    }

    public function store(Request $request)
    {
        $is_ent = $request->input('isEntreprise');
        if($is_ent){

            $request->validate([
                'name' => 'required',
                'phone' => 'required|unique:companies',
                'email' => 'required|unique:companies|email',
                'fax' => 'required',
                'boitPostal' => 'required',
                'isEntreprise' => 'required|boolean',
                'address' => 'required',
                'ville' => 'required',
                'pays' => 'required',
                'logo' => 'nullable',
                'logoUrl' => 'nullable',
                'divisionFiscal' => 'required',
                'regimeFiscal' => 'required',
                'rccm' => 'required',
                'ifu' => 'required',
            ]);
        }else{
            $request->validate([
                'name' => 'required',
                'phone' => 'required|unique:companies',
                'email' => 'required|unique:companies|email',
                'fax' => 'required',
                'boitPostal' => 'required',
                'isEntreprise' => 'required|boolean',
                'address' => 'nullable',
                'ville' => 'nullable',
                'pays' => 'nullable',
                'logo' => 'nullable',
                'logoUrl' => 'nullable',
                'divisionFiscal' => 'nullable',
                'regimeFiscal' => 'nullable',
                'rccm' => 'nullable',
                'ifu' => 'nullable',
            ]);
        }
       
        $user = User::findOrFail(auth()->user()->id);
        $data = $request->all();
        $data['isEntreprise']=$is_ent;
        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('logos/companies', 'public');
            $data["logoUrl"]= Storage::disk('public')->url($data["logo"]);

        }
        $user->companies()->create($data);

        return redirect()->route('companies.index')->with('success', 'Company created successfully.');
    }

    public function edit(Company $company)
    {
        return Inertia::render('Companies/Edit', ['company' => $company]);
    }

    public function update(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'required|unique:companies,phone,' . $company->id,
            'email' => 'required|unique:companies,email,' . $company->id . '|email',
            'fax' => 'required',
            'boitPostal' => 'required',
            'isEntreprise' => 'required|boolean',
            'address' => 'required',
            'ville' => 'required',
            'pays' => 'required',
            'logo' => 'nullable',
            'logoUrl' => 'nullable',
            'divisionFiscal' => 'nullable',
            'regimeFiscal' => 'nullable',
            'rccm' => 'nullable',
            'ifu' => 'nullable',
        ]);

        $company->fill($request->all());
        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('logos/companies', 'public');
            $data["logoUrl"]= Storage::disk('public')->url($data["logo"]);

        }
        $company->save();

        return redirect()->route('companies.index')->with('success', 'Company updated successfully.');
    }

    public function show(Company $company)
    {
        return inertia('Companies/Show', ['company' => $company]);
    }

    public function destroy(Company $company)
    {
        $company->delete();

        return redirect()->route('companies.index')->with('success', 'Company deleted successfully.');
    }
}
