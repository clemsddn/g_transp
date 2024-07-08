import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Edit() {
    const { errors, company, auth } = usePage().props;
    const [isEntreprise, setIsEntreprise] = useState(company.isEntreprise);
    const { data, setData, put, reset } = useForm({
        name: company.name || '',
        phone: company.phone || '',
        email: company.email || '',
        fax: company.fax || '',
        boitPostal: company.boitPostal || '',
        isEntreprise: company.isEntreprise || false,
        address: company.address || '',
        ville: company.ville || '',
        pays: company.pays || '',
        logo: null,
        logoUrl: company.logoUrl || '',
        divisionFiscal: company.divisionFiscal || '',
        regimeFiscal: company.regimeFiscal || '',
        rccm: company.rccm || '',
        ifu: company.ifu || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        put(route('companies.update', company.id), {
            onSuccess: () => reset(),
        });
    };

    const handleLogoChange = (e) => {
        setData('logo', e.target.files[0]);
    };

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('companies.index')}>clients/modification</a>}
        >
            <div className="container my-5">
                <h1 className='text-dark fw-bold fs-1 mb-5'>Modification de Client</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nom:</label>
                            <input type="text" className="form-control" value={data.name} onChange={e => setData('name', e.target.value)} />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Téléphone:</label>
                            <input type="text" className="form-control" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email:</label>
                            <input type="email" className="form-control" value={data.email} onChange={e => setData('email', e.target.value)} />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Fax:</label>
                            <input type="text" className="form-control" value={data.fax} onChange={e => setData('fax', e.target.value)} />
                            {errors.fax && <div className="text-danger">{errors.fax}</div>}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Boîte Postale:</label>
                            <input type="text" className="form-control" value={data.boitPostal} onChange={e => setData('boitPostal', e.target.value)} />
                            {errors.boitPostal && <div className="text-danger">{errors.boitPostal}</div>}
                        </div>

                        <div className="col-md-6 mb-3 form-check">
                            <input type="checkbox" className="form-check-input" checked={isEntreprise} onChange={e => { setIsEntreprise(e.target.checked); setData('isEntreprise', e.target.checked); }} />
                            <label className="form-check-label">Est-ce une entreprise ?</label>
                        </div>
                    </div>

                    {isEntreprise && (
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Adresse:</label>
                                <input type="text" className="form-control" value={data.address} onChange={e => setData('address', e.target.value)} />
                                {errors.address && <div className="text-danger">{errors.address}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Ville:</label>
                                <input type="text" className="form-control" value={data.ville} onChange={e => setData('ville', e.target.value)} />
                                {errors.ville && <div className="text-danger">{errors.ville}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Pays:</label>
                                <input type="text" className="form-control" value={data.pays} onChange={e => setData('pays', e.target.value)} />
                                {errors.pays && <div className="text-danger">{errors.pays}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Logo:</label>
                                <input type="file" className="form-control" onChange={handleLogoChange} />
                                {errors.logo && <div className="text-danger">{errors.logo}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Division Fiscale:</label>
                                <input type="text" className="form-control" value={data.divisionFiscal} onChange={e => setData('divisionFiscal', e.target.value)} />
                                {errors.divisionFiscal && <div className="text-danger">{errors.divisionFiscal}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Régime Fiscal:</label>
                                <input type="text" className="form-control" value={data.regimeFiscal} onChange={e => setData('regimeFiscal', e.target.value)} />
                                {errors.regimeFiscal && <div className="text-danger">{errors.regimeFiscal}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">RCCM:</label>
                                <input type="text" className="form-control" value={data.rccm} onChange={e => setData('rccm', e.target.value)} />
                                {errors.rccm && <div className="text-danger">{errors.rccm}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">IFU:</label>
                                <input type="text" className="form-control" value={data.ifu} onChange={e => setData('ifu', e.target.value)} />
                                {errors.ifu && <div className="text-danger">{errors.ifu}</div>}
                            </div>
                        </div>
                    )}

                    <div className="d-flex col-md-6 gap-1 my-4 mx-auto ">
                        <button type="submit" className="btn btn-outline-primary">Mettre à jour</button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => window.location.href = route('companies.index')}>Annuler</button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
