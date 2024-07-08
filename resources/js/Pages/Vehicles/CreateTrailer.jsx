import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function CreateTrailer({ auth }) {
    const { errors, vehicle } = usePage().props;
    const [saveAndContinue, setSaveAndContinue] = useState(0);

    const { data, setData, post, reset } = useForm({
        license_plate: vehicle.license_plate || '',
        marque: vehicle.marque || '',
        model: vehicle.model || '',
        provenance: vehicle.provenance || '',
        datequisition: vehicle.datequisition || '',
        amortissement: vehicle.amortissement || '',
        continue: saveAndContinue,
        etat: vehicle.etat || '',
        valeur: vehicle.valeur || '',
        image: vehicle.image || '',
        imageUrl: vehicle.imageUrl || '',
        capaciteCharge: vehicle.capaciteCharge || '',
        status: vehicle.status || true,
        vehicle_type: vehicle.vehicle_type || 'trailer',
        dimension: {
            longueur: vehicle.dimension?.longueur || '',
            largeur: vehicle.dimension?.largeur || '',
            hauteur: vehicle.dimension?.hauteur || '',
        }
    });
    

    const handleSubmit = (e) => {
        e.preventDefault();
        data.continue=saveAndContinue
        post(route('vehicles.store'), {
            onSuccess: () => {
                if (saveAndContinue) {
                    reset();
                } else {
                    window.location.href = route('vehicles.index');
                }
            },
        });
    };

    const handleImageChange = (e) => {
        console.log(e.target.files)
        const value=e.target.files[0];
        const name = e.target.name
        console.log(value)
        setData(name,value)
    };

    const handleCancel = () => {
        window.location.href = route('vehicles.index');
    };

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('vehicles.index')}>véhicles/créer</a>}


        >
            <Head title="Create Vehicle" />

            <div className="container my-5">
                <h1 className='text-dark fw-bold fs-1 mb-5 '>Enregistrement de  Vehicule</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Matricule</label>
                            <input type="text" className="form-control" value={data.license_plate} onChange={e => setData('license_plate', e.target.value)} />
                            {errors.license_plate && <div className="text-danger">{errors.license_plate}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Marque</label>
                            <input type="text" className="form-control" value={data.marque} onChange={e => setData('marque', e.target.value)} />
                            {errors.marque && <div className="text-danger">{errors.marque}</div>}
                        </div>
                       
                    </div>

                    <div className="row">
                     
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Model</label>
                            <input type="text" className="form-control" value={data.model} onChange={e => setData('model', e.target.value)} />
                            {errors.model && <div className="text-danger">{errors.model}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Status</label>
                            <select className="form-control" value={data.status ? 'true' : 'false'} onChange={e => setData('status', e.target.value === 'true')}>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                            {errors.status && <div className="text-danger">{errors.status}</div>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Provenance</label>
                            <input type="text" className="form-control" value={data.provenance} onChange={e => setData('provenance', e.target.value)} />
                            {errors.provenance && <div className="text-danger">{errors.provenance}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Date Acquisition</label>
                            <input type="date" className="form-control" value={data.datequisition} onChange={e => setData('datequisition', e.target.value)} />
                            {errors.datequisition && <div className="text-danger">{errors.datequisition}</div>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Amortissement</label>
                            <input type="number" className="form-control" value={data.amortissement} onChange={e => setData('amortissement', e.target.value)} />
                            {errors.amortissement && <div className="text-danger">{errors.amortissement}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Etat</label>
                            <input type="text" className="form-control" value={data.etat} onChange={e => setData('etat', e.target.value)} />
                            {errors.etat && <div className="text-danger">{errors.etat}</div>}
                        </div>
                    </div>

                   


                    <div className="row">
                    <div className="col-md-6 mb-3">
                            <label className="form-label">Valeur</label>
                            <input type="number" className="form-control" value={data.valeur} onChange={e => setData('valeur', e.target.value)} />
                            {errors.valeur && <div className="text-danger">{errors.valeur}</div>}
                        </div>
                       
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Capacité de Charge</label>
                            <input type="number" className="form-control" value={data.capaciteCharge} onChange={e => setData('capaciteCharge', e.target.value)} />
                            {errors.capaciteCharge && <div className="text-danger">{errors.capaciteCharge}</div>}
                        </div>
                    </div>

                   
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Longueur</label>
                            <input type="number" className="form-control" value={data.dimension.longueur} onChange={e => {
                                data.dimension.longueur=e.target.value
                                setData('dimension', data.dimension)}} />
                            {errors.puissanceMoteur && <div className="text-danger">{errors.puissanceMoteur}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Largeur</label>
                            <input type="number" className="form-control" value={data.dimension.largeur} onChange={e =>  {
                                data.dimension.largeur=e.target.value
                                setData('dimension', data.dimension)}} />
                            {errors.kilometrage && <div className="text-danger">{errors.kilometrage}</div>}
                        </div>
                    </div>

                    <div className="row">
                    <div className="col-md-6 mb-3">
                            <label className="form-label">Hauteur</label>
                            <input type="number" className="form-control" value={data.dimension.hauteur} onChange={e =>  {
                                data.dimension.hauteur=e.target.value
                                setData('dimension', data.dimension)}} />
                            {errors.kilometrage && <div className="text-danger">{errors.kilometrage}</div>}
                        </div>
                       
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Image</label>
                            <input type="file" className="form-control" name='image' onChange={handleImageChange} />
                            {errors.image && <div className="text-danger">{errors.image}</div>}
                        </div>
                       
                    </div>

                   

                    
                   

                    <div className="row">
                        <div className="col-md-10 my-4 mx-auto d-flex justify-content-between">
                            <button type="submit" className="btn col-md-3 btn-outline-primary " >Enregistrer</button>
                            <button type="submit" className="btn col-md-3 btn-outline-info " onClick={() => setSaveAndContinue(1)}>Enregistrer et continuer</button>
                            <button type="button" className="btn  col-md-3 btn-outline-danger" onClick={handleCancel}>Anuler</button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
