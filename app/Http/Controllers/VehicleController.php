<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vehicle;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::where('vehicle_type', '!=', 'off')
        ->with(['user', 'driver', 'trips', 'dimension',  'tractor'])
        ->get();
        return Inertia::render('Vehicles/Index', ['vehicles' => $vehicles]);
    }

    public function create(string $type)
    {   

        
        if($type =='truck_trailer') {
            return Inertia::render('Vehicles/CreateWithOuthDimenssion',
        [
            'vehicles'=> Vehicle::all(),

        ]);


        }
        if($type =='truck'){
            return Inertia::render('Vehicles/CreateWithDimenssion', 
            ['vehicle'=> new Vehicle()]
        );


        }
        if($type =='tractor'){
            return Inertia::render('Vehicles/CreateTractor',
            ['vehicle'=> new Vehicle()]
        );


        }
        if($type =='trailer'){
            return Inertia::render('Vehicles/CreateTrailer',
            ['vehicle'=> new Vehicle()]

        );
            


        }
       

            return Inertia::render('Vehicles/Create',
            ['vehicle'=> new Vehicle()]

        );

    }

    public function store(Request $request)
    {
       
            
        $data = $request->all();
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images/vehicles', 'public');
            $data["imageUrl"]= Storage::disk('public')->url($data["image"]);

        }
        $user= User::findOrFail(auth()->user()->id) ;


        if($data['continue']=='4'){
            $tractor = Vehicle::findOrFail($data['selectedTractor']);
            
            foreach( $data['selectedTrailers'] as $trailer ){
                $vehicle = Vehicle::findOrFail($trailer);
                $vehicle->tractor_id=$tractor->id;
                $vehicle->is_maried = true;
                $vehicle->vehicle_type='off';
                $vehicle->save();

            }

            $tractor->is_maried = true;
            $tractor->vehicle_type='truck';
            $tractor->save();
            
            back()->with('success', 'Vehicle created successfully.');

        }
        if($data['continue']=='3'){
            $tractor = Vehicle::findOrFail($data['selectedTractor']);
             
            foreach( $data['selectedTrailers'] as $trailer ){
                $vehicle = Vehicle::findOrFail($trailer);
                $vehicle->tractor_id=$tractor->id;
                $vehicle->is_maried = true;
                $vehicle->vehicle_type='off';
                $vehicle->save();

            }

            $tractor->is_maried = true;
            $tractor->vehicle_type='truck';
            $tractor->save();
        }
        //dd($data['continue']);
        $vehicle=$user->vehicles()->create($data);
    try{
        $vehicle->dimension()->create($data['dimension']);


    }catch(Exception $ex ){
    }
        if($data['continue']=='1'){
            back()->with('success', 'Vehicle created successfully.');

        }else{
            return redirect()->route('vehicles.index')->with('success', 'Vehicle created successfully.');

        }
    }

    public function show(Vehicle $vehicle)
    {
        return Inertia::render('Vehicles/Show', ['vehicle' => $vehicle]);
    }

    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('Vehicles/Edit', ['vehicle' => $vehicle]);
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        $request->validate([
            'license_plate' => 'required|unique:vehicles,license_plate,' . $vehicle->id,
            'image' => 'nullable|image|max:2048', // Valider le champ image
            // Valider les autres champs...
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($vehicle->image) {
                Storage::disk('public')->delete($vehicle->image);
            }

            $data['image'] = $request->file('image')->store('images/vehicles', 'public');
        }

        $vehicle->update($data);

        return redirect()->route('vehicles.index')->with('success', 'Vehicle updated successfully.');
    }

    public function destroy(Vehicle $vehicle)
    {
        if ($vehicle->image) {
            Storage::disk('public')->delete($vehicle->image);
        }

        $vehicle->delete();

        return redirect()->route('vehicles.index')->with('success', 'Vehicle deleted successfully.');
    }
}
