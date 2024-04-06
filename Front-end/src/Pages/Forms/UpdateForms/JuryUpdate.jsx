import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/styles/AjouterBudget.css';
import { Usercontext } from '../../../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import UserApi from '../../../service/api/UserApi';
import Swal from 'sweetalert2';
const JuryUpdate = ({code}) => { 
const { juries,budget,grade,etablissement,typedePaiement, matiere, fonctionRole,personnel, logout, authenticated, loading } = Usercontext()
const navigate = useNavigate()
let data={}
const [NumJury ,SetNumJury]=useState(code)
useEffect(() => {

    loadJuryData();
    showForm();

}, [])

const loadJuryData = async () => {
    try {
      // const response=  await UserApi.getPersonnelDoti(codeDoti);
      // console.log('datataa0');
      // console.log(response.data);
      // console.log('datataa0');

      const Jurydata = juries.find((jury)=>jury.NumJury===NumJury)
      console.log('77777777');
      console.log(Jurydata);
      console.log('7777777');
       data ={
        NumJury: Jurydata.NumJury,
        NombreCopies: Jurydata.NombreCopies,
        Matiere: Jurydata.matiere.CodeMatiere,
        
        
      };
      console.log('""""""');
      console.log(data);
      console.log('""""""');
    } catch (error) {
      console.error('Error fetching Jury data:', error);
      // Handle error appropriately
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateFormData ={
        NumJury: e.target.value.NumJury,
        CodeMatiere: e.target.value.CodeMatiere,
        NombreCopies: e.target.value.NombreCopies,
        
      };
  console.log(updateFormData);
    try {
      await UserApi.updateJury(NumJury, updateFormData);
      Swal.fire({
        icon: 'success',
        title: 'woooow',
        text: "Jury Updated successfully!",
      });
      navigate('/budget');
    } catch (error) {
      console.error('Failed to update Jury:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops... Failed to Update Jury',
      });
    }
  };


  const showForm= ()=>{
   
    

    Swal.fire({
      title: 'Modifier Jury',
      html: `
      <form id="updateJuryForm">
          <div class="row">
            <div class="label-Bud col">
              <input type="text" placeholder=""  value="${data.NumJury}" name="NumJury" class="form-control" />
              <label>Numéro Du Jury</label>
            </div>
            <div class="label-Bud col">
              <select class="selectBud form-select show-tick"  value="${data.Matiere}" name="CodeMatiere">
                <option selected disabled>Matiere</option>
                ${matiere.map(matiere => `<option value="${matiere.CodeMatiere}" ${data.Matiere === matiere.CodeMatiere ? 'selected' : ''}>${matiere.LibelleAr}</option>`).join('')}
              </select>
            </div>
            <div class="label-Bud col">
              <input type="text" placeholder=""  value="${data.NombreCopies}" name="NombreCopies" class="form-control" />
              <label>Nombre de Copies</label>
            </div>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Annuler',
      allowOutsideClick: false,
      focusConfirm: false,
      
      preConfirm: () => {
        const form = document.getElementById('updateJuryForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        handleSubmit({ preventDefault: () => { }, target: { value: data } });
       
      },
      
    });
    
    
  }
  
}

export default JuryUpdate;
