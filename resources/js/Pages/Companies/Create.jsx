import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function CreateCompany({ auth }) {
    const { errors } = usePage().props;
    const [saveAndContinue, setSaveAndContinue] = useState(0);

    const { data, setData, post, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        fax: '',
        boitPostal: '',
        isEntreprise: false,
        address: '',
        ville: '',
        pays: '',
        logo: '',
        logoUrl: '',
        divisionFiscal: '',
        regimeFiscal: '',
        rccm: '',
        ifu: '',
        continue: saveAndContinue,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        data.continue = saveAndContinue;
        post(route('companies.store'), {
            onSuccess: () => {
                if (saveAndContinue) {
                    reset();
                } else {
                    window.location.href = route('companies.index');
                }
            },
        });
    };

   const handleLogoChange = (e) => {
        console.log(e.target.files)
        const value=e.target.files[0];
        const name = e.target.name
        console.log(value)
        setData(name,value)
    };

    const handleCancel = () => {
        window.location.href = route('companies.index');
    };

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('companies.index')}>clients/create</a>}
        >
            <Head title="Create Company" />

            <div className="container my-5">
                <h1 className='text-dark fw-bold fs-1 mb-5'>Enregistrement de Société</h1>
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
                    </div>

                    <div className="row">
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
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Boîte Postale:</label>
                            <input type="text" className="form-control" value={data.boitPostal} onChange={e => setData('boitPostal', e.target.value)} />
                            {errors.boitPostal && <div className="text-danger">{errors.boitPostal}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                                    <label className="form-label">Adresse:</label>
                                    <input type="text" className="form-control" value={data.address} onChange={e => setData('address', e.target.value)} />
                                    {errors.address && <div className="text-danger">{errors.address}</div>}
                                </div>


                    </div>
                    <div className="row">
                        
                    <div className="col-md-6 mb-3">
                            <div className="form-check">
                                <input type="checkbox"  id='is_enr' className="form-check-input" checked={data.isEntreprise} onChange={e => { setData('isEntreprise', e.target.checked); }} />
                                <label className="form-check-label" htmlFor='is_enr'>Est-ce une entreprise ?</label>
                            </div>
                        </div>
                    </div>

                    {data.isEntreprise && (
                        <>
                            <div className="row">
                               
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
                            </div>

                           

                            <div className="row">
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
                            </div>

                            <div className="row">
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
                            <div className="row">
                               

                               <div className="col-md-6 mb-3">
                                   <label className="form-label">Logo:</label>
                                   <input type="file" name="logo" className="form-control" onChange={handleLogoChange } />
                                   {errors.logo && <div className="text-danger">{errors.logo}</div>}
                               </div>
                           </div>
                        </>
                    )}

                    <div className="row">
                        <div className="col-md-10 mx-auto my-4 d-flex gap-1">
                            <button type="submit" className="btn col-md-3 btn-outline-primary" onClick={() => setSaveAndContinue(0)}>Enregistrer</button>
                            <button type="submit" className="btn col-md-3 btn-outline-info" onClick={() => setSaveAndContinue(1)}>Enregistrer et Continuer</button>
                            <button type="button" className="btn col-md-3 btn-outline-danger" onClick={handleCancel}>Annuler</button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
