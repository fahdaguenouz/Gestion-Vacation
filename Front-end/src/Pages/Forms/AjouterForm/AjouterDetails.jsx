
import React, {  useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/styles/AjouterPersonnel.css';
import { Usercontext } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../../service/api/UserApi';
import Swal from 'sweetalert2';

const AjouterDetails = () => {
    const { personnel, etablissement, juries, typedePaiement, matiere, loggednUser, detailCorrection, user, logout, authenticated, loading } = Usercontext()

    const navigate = useNavigate()
    useEffect(() => {
        showForm();
      }, []); 

    const [formData, setFormData] = useState({
        CodeDoti: '',
        NumJury: '',
        nombre_de_copie: '',
        IdTypePaiement: '',
        date_de_correction:'',
    });
    
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

       

        // Append text fields to FormData
        const personnelSelected = personnel.find(pers => pers.CodeDoti === formData.CodeDoti);
        const jurySelected = juries.find(jur => jur.NumJury === formData.NumJury);
        const typePaiementSelected = typedePaiement.find(type => type.IdTypePaiement === formData.IdTypePaiement);
// console.log('hhhhhh');
// console.log(personnelSelected);
// console.log(jurySelected);
// console.log(typePaiementSelected);

// console.log('hhhhhh');

        const submissionData ={

            'CodeDoti': personnelSelected?.CodeDoti,
            'NumJury': jurySelected?.NumJury,
            'nombre_de_copie': formData.nombre_de_copie,
            'IdTypePaiement': typePaiementSelected?.IdTypePaiement,
            'prix_de_copie': typePaiementSelected?.PrixParCopie,
            'date_de_correction':formData.date_de_correction,
            'taux': personnelSelected?.Taux,
        };



        // Debug: Log FormData values (for debugging purposes, remove in production)
        // for (let [key, value] of data.entries()) {
        //   console.log(`${key}: ${value}`);
        // }

        // Submit the form data
        // console.log('|||||||||||');
        // console.log(formData);

        // console.log(submissionData);
        // console.log('|||||||||||');

        try {
            const response = UserApi.Ajouter_Detail_correction(submissionData);
            // console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'woooow',
                text: "Details added successfully!",
              });            
              navigate('/dashboard'); // Redirect on success
        } catch (error) {
            console.error('Failed to add Details:', error.response ? error.response.data : error);
            Swal.fire({
                icon: 'error',
                title: 'Oops... Failed to add Details',
              });
        }
    };

    const showForm= ()=>{
       
        
    
        Swal.fire({
            title: 'Ajouter Details',
            html: `
            <div class='container' id='cont'>
            <h2>Ajouter</h2>
            <form onSubmit={handleSubmit} id="AjouterDetailsForm" encType="multipart/form-data">
                <div class="row">
                    <div class="label-float col">
                        <select class="form-control" name="CodeDoti"
                            value={formData.CodeDoti}
                            onChange={handleChange} >
                            <option selected disabled>Code Doti  </option>
                            ${
                                personnel.map((personnel) => {
                                    return (
                                        `<option key="${personnel.CodeDoti}" value="${personnel.CodeDoti}">${personnel.CodeDoti}</option>`
                                    )
                                })
                            }
                        </select>
                    </div>
                    
                </div>
                <div class='row '>
                    <div class="label-float col">
                        <select class="form-control" name="NumJury"
                            value={formData.NumJury}
                            onChange={handleChange} >
                            <option selected disabled>Jury</option>
                            ${
                                juries.map((jurie) => {
                                    return (
                                        `<option key="${jurie.NumJury}" value="${jurie.NumJury}">${jurie.matiere.LibelleAr}</option>`
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div class='row '>
          
          
                    <div class="label-float col">
                        <select class="form-control" name="IdTypePaiement"
                            value={formData.IdTypePaiement}
                            onChange={handleChange} >
                            <option selected disabled>Cycle</option>
                            ${
                                typedePaiement.map((typedePaiements) => {
                                    return (
                                        `<option key="${typedePaiements.IdTypePaiement}" value="${typedePaiements.IdTypePaiement}">${typedePaiements.Libelle}</option>`
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div class="label-float col">
                        <input type="number" placeholder=" " required name="nombre_de_copie" class="form-control"
                            value={formData.nombre_de_copie}
                            onChange={handleChange} />
                        <label>Copie a Corrigée </label>
                    </div>
                    <div class="label-float col">
                        <input type="date" placeholder=" " required name="date_de_correction" class="form-control"
                            value={formData.date_de_correction}
                            onChange={handleChange} />
                        <label>date de correction </label>
                    </div>
                </div>
          
          
                <div class="row">
          
          
                </div>
                
            </form>
          </div>`,
            showCancelButton: true,
            confirmButtonText: 'Ajouter',
            cancelButtonText: 'Annuler',
            allowOutsideClick: false,
            focusConfirm: false,
            
            preConfirm: () => {
              const form = document.getElementById('AjouterDetailsForm');
              const formData = new FormData(form);
              const data = Object.fromEntries(formData.entries());
              handleSubmit({ preventDefault: () => { }, target: { value: data } });
             
            }
          });
          
        
      }


    
}

export default AjouterDetails;
