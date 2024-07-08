import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Select from 'react-select';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function CreateWithOuthDimenssion({ auth }) {
    const [saveAndContinue, setSaveAndContinue] = useState(3);

    const { errors, vehicles } = usePage().props;
    const { data, setData, post, reset } = useForm({
        selectedTractor: '', // State for selected tractor
        selectedTrailers: [],
        continue: saveAndContinue // State for selected trailers (multiple)
    });
    
    const [tractors, setTractors] = useState([]);
    const [trailers, setTrailers] = useState([]);

    useEffect(() => {
        // Filter vehicles to get tractors and trailers
        const filteredTractors = vehicles.filter(vehicle => vehicle.vehicle_type === 'tractor');
        const filteredTrailers = vehicles.filter(vehicle => vehicle.vehicle_type === 'trailer');
        setTractors(filteredTractors);
        setTrailers(filteredTrailers);
    }, [vehicles]);

    const handleSubmit = (e) => {
        e.preventDefault();
      post(route('vehicles.store'), {
            onSuccess: () => {
                if (saveAndContinue) {
                    reset();
                } else {
                    window.location.href = route('vehicles.index');
                }
            },
        });

}

    const handleCancel = () => {
        window.location.href = route('vehicles.index');
    };

    return (
        <Authenticated user={auth.user} 
        header={<a href={route('vehicles.index')}>véhicules/créer</a>}
        >
            <Head title="Create Vehicle" />

            <div className="container my-5">
                <h1 className='text-dark fw-bold fs-1 mb-5 '>Enregistrement de Véhicule</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Tractor</label>
                            <Select
                                options={tractors.map(tractor => ({
                                    value: tractor.id,
                                    label: (
                                        <div>
                                            {tractor.marque} - {tractor.model}
                                            {tractor.imageUrl && (
                                                <img
                                                    src={tractor.imageUrl}
                                                    alt={`${tractor.marque} ${tractor.model}`}
                                                    style={{ width: '50px', marginLeft: '10px' }}
                                                />
                                            )}
                                        </div>
                                    )
                                }))}
                                defaultValue={tractors.find(tractor => tractor.id === data.selectedTractor)}
                                onChange={option => setData('selectedTractor', option.value)}
                                placeholder="Select Tractor"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Trailers</label>
                            <Select
                                isMulti
                                options={trailers.map(trailer => ({
                                    value: trailer.id,
                                    label: (
                                        <div>
                                            {trailer.marque} - {trailer.model}
                                            {trailer.imageUrl && (
                                                <img
                                                    src={trailer.imageUrl}
                                                    alt={`${trailer.marque} ${trailer.model}`}
                                                    style={{ width: '50px', marginLeft: '10px' }}
                                                />
                                            )}
                                        </div>
                                    )
                                }))}
                                defaultValue={trailers.filter(trailer => data.selectedTrailers.includes(trailer.id))}
                                onChange={options => setData('selectedTrailers', options.map(option => option.value))}
                                placeholder="Select Trailers"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-10 my-4 mx-auto d-flex justify-content-between">
                            <button type="submit" className="btn col-md-3 btn-outline-primary" >Enregistrer</button>
                            <button type="submit" className="btn col-md-3 btn-outline-info" onClick={() => setSaveAndContinue(4)}>Enregistrer et continuer</button>
                            <button type="button" className="btn col-md-3 btn-outline-danger" onClick={handleCancel}>Annuler</button>
                        </div>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
}
