import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/styles/AjouterPersonnel.css';
import { Usercontext } from '../../../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import UserApi from '../../../service/api/UserApi';
import Swal from 'sweetalert2';

export default function DetailsUpdate( {code}) {

    const { personnel, etablissement, juries, typedePaiement, matiere, loggednUser, detailCorrection, user, logout, authenticated, loading } = Usercontext()
  const navigate = useNavigate()
  // const { CodeDoti } = useParams();
  const [IdDetail ,SetIdDetails]=useState(code)
  // console.log('llllllll');
  //     console.log(code);
  //     console.log('lllllll');
  const [formData, setFormData] = useState({
    CodeDoti: '',
    NumJury: '',
    nombre_de_copie: '',
    IdTypePaiement: '',
    date_de_correction:'',
});
 
  useEffect(() => {
    
        loadDetailsData();
        showForm();
  }, [])

  if (loading || !authenticated) {
    return <div>Loading...</div>;
  }
  
  const loadDetailsData = async () => {
    try {
      // const response=  await UserApi.getPersonnelDoti(codeDoti);
      // console.log('datataa0');
      // console.log(response.data);
      // console.log('datataa0');

      const DetailsData = detailCorrection.find((detail)=>detail.id===IdDetail)
        console.log('77777777');
        console.log(DetailsData);
        console.log('7777777');
      setFormData({
        CodeDoti: DetailsData.CodeDoti,
        NumJury: DetailsData.NumJury,
        IdTypePaiement: DetailsData.IdTypePaiement,
        nombre_de_copie: DetailsData.nombre_de_copie,
        date_de_correction: DetailsData.date_de_correction,
      });
    //   console.log('""""""');
    //   console.log(matiere);
    //   console.log('""""""');
    } catch (error) {
      console.error('Error fetching Details data:', error);
      // Handle error appropriately
    }
  };

  const handelAnnnuler=()=>{
    setModisfierDispaly(false);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateFormData = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      updateFormData.append(key, formData[key]);
  })
    try {
      // await UserApi.updatePersonnel(codeDoti, updateFormData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      Swal.fire({
        icon: 'success',
        title: 'woooow',
        text: "Details Updated successfully!",
      });      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update Details :', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops... Failed to Update Details',
      });
    }

  };

  const showForm= ()=>{
   
    

    Swal.fire({
      title: 'Modifier Details',
      html: ` <div class='container' id='cont'>
     
      <form onSubmit={handleSubmit} id="UpdateDetailsForm" encType="multipart/form-data">
          <div class="row">
              <div class="label-float col">
                  <select class="form-control" name="CodeDoti"
                      value={formData.CodeDoti}
                      onChange={handleChange} >
                      <option selected disabled>Nom et Prenom </option>
                      {
                          personnel.map((personnel) => {
                              return (
                                  <option key={personnel.CodeDoti} value={personnel.CodeDoti}>{personnel.LibelleFr}</option>
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
                      {
                          juries.map((jurie) => {
                              return (
                                  <option key={jurie.NumJury} value={jurie.NumJury}>{jurie.matiere.LibelleAr}</option>
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
                      {
                          typedePaiement.map((typedePaiements) => {
                              return (
                                  <option key={typedePaiements.IdTypePaiement} value={typedePaiements.IdTypePaiement}>{typedePaiements.Libelle}</option>
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
        const form = document.getElementById('UpdateDetailsForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        handleSubmit({ preventDefault: () => { }, target: { value: data } });
       
      }
    });
    
    
    
  }

 
  
}
