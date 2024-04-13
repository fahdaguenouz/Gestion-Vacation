
import React, {  useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/styles/AjouterPersonnel.css';
import { Usercontext } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../../service/api/UserApi';
import Swal from 'sweetalert2';

const AjouterDetails = () => {
    const { personnel, juries, typedePaiement, matiere, loggednUser, detailCorrection, user, logout, authenticated, loading } = Usercontext()

    const navigate = useNavigate()
    useEffect(() => {
        showForm();
      }, []); 

      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

      const [formData, setFormData] = useState({
          CodeDoti: '',
          NumJury: '',
          nombre_de_copie: '',
          IdTypePaiement: '',
          date_de_correction: currentDate, // Set default value to current date
      });
    
   console.log(juries);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

       
            console.log(e.target.value);
        // Append text fields to FormData
        const personnelSelected = personnel.find(pers => pers.CodeDoti === e.target.value.CodeDoti);
        const jurySelected = juries.find(jur => jur.id === parseInt(e.target.value.id_jury));


        const typePaiementSelected = typedePaiement.find(type => type.IdTypePaiement === e.target.value.IdTypePaiement);
// console.log('hhhhhh');
// console.log(personnelSelected);
console.log(juries);
// console.log(typePaiementSelected);

// console.log('hhhhhh');

        const submissionData ={

            'CodeDoti': personnelSelected?.CodeDoti,
            'id_jury': jurySelected?.id,
            'nombre_de_copie': e.target.value.nombre_de_copie,
            'IdTypePaiement': typePaiementSelected?.IdTypePaiement,
            'prix_de_copie': typePaiementSelected?.PrixParCopie,
            'date_de_correction': e.target.value.date_de_correction ? e.target.value.date_de_correction : currentDate,
            'taux': personnelSelected?.Taux,
        };



        // Debug: Log FormData values (for debugging purposes, remove in production)
        // for (let [key, value] of data.entries()) {
        //   console.log(`${key}: ${value}`);
        // }

        // Submit the form data
        // console.log('|||||||||||');
        // console.log(formData);

        console.log(submissionData);
        console.log('|||||||||||');

        try {
            const response = await UserApi.Ajouter_Detail_correction(submissionData);
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
                             >
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
                        <select class="form-control" name="IdTypePaiement" id="IdTypePaiement"
                            value={formData.IdTypePaiement}
                             >
                            <option selected disabled>Cycle</option>
                            ${
                                typedePaiement.map((type) => {
                                    return (
                                        `<option key="${type.IdTypePaiement}" value="${type.IdTypePaiement}">${type.Libelle}</option>`
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div class="label-float col">
                        <select class="form-control" name="CodeMatiere" id="CodeMatiere"
                            value={formData.CodeMatiere}
                             >
                            <option selected disabled>Matiere</option>
                            ${
                                matiere.map((matiers) => {
                                    return (
                                        `<option key="${matiers.CodeMatiere}" value="${matiers.CodeMatiere}">${matiers.LibelleAr}</option>`
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div class="label-float col">
                        <select class="form-control" name="id_jury" id="NumJury"
                            value={formData.id_jury}
                             >
                            <option selected disabled>Jury</option>
                            ${
                                juries.map((jurie) => {
                                    return (
                                        `<option key="${jurie.NumJury}" value="${jurie.id}">${jurie.NumJury}</option>`
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                
                    <div class="label-float col">
                        <input type="number" placeholder=" " required name="nombre_de_copie" class="form-control"
                            value={formData.nombre_de_copie}
                             />
                        <label>Copie a Corrigée </label>
                    </div>
                    <div class="label-float col">
                        <input type="date" placeholder=" " required name="date_de_correction" class="form-control"
                            value={formData.date_de_correction}
                             />
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
             
            },
            
            didOpen: () => {
                const idTypePaiementSelect = document.getElementById('IdTypePaiement');
                const codeMatiereSelect = document.getElementById('CodeMatiere');
                const numJurySelect = document.getElementById('NumJury');
               
                // Handle Matiere select options based on selected IdTypePaiement
                idTypePaiementSelect.addEventListener('change', (event) => {
                    const selectedIdTypePaiement = event.target.value;
                    const filteredMatieres = matiere.filter(m => m.IdTypePaiement === selectedIdTypePaiement);
                    // Update CodeMatiere select options
                    codeMatiereSelect.innerHTML = `
                        <option selected disabled>Matiere</option>
                        ${filteredMatieres.map(m => `<option key="${m.CodeMatiere}" value="${m.CodeMatiere}">${m.LibelleAr}</option>`)}
                    `;
                });
    
                // Handle NumJury select options based on selected CodeMatiere
                codeMatiereSelect.addEventListener('change', (event) => {
                    const selectedCodeMatiere = event.target.value;
                    const filteredJuries = juries.filter(j => j.CodeMatiere === selectedCodeMatiere);
                    // Update NumJury select options
                    numJurySelect.innerHTML = `
                        <option selected disabled>Jury</option>
                        ${filteredJuries?filteredJuries.map(j => `<option key="${j.NumJury}" value="${j.id}">${j.NumJury}</option>`):'no juries pour cet matier'}
                    `;
                });
            },
            
          });
          
        
      }


    
}

export default AjouterDetails;
