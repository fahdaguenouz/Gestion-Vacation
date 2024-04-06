import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/styles/AjouterBudget.css';
import { Usercontext } from '../../../context/AuthProvider';
import UserApi from '../../../service/api/UserApi';
import { useNavigate } from 'react-router-dom';
import Budget from '../../budget';
import Swal from 'sweetalert2';
function  AjouterBudget  ()  {
  const { budget, typedePaiement,addBudgetItem, user, logout, authenticated, loading } = Usercontext()
  const navigate = useNavigate()
  useEffect(() => {
    showForm();
  }, []); 
  const [formData, setFormData] = useState({
    MontantInitial: '',
    IdTypePaiement: '',
    Date: '',
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
    const year = e.target.value.Date ? new Date(e.target.value.Date).getFullYear() : '';

    const submissionData = {
      MontantInitial: e.target.value.MontantInitial,
      IdTypePaiement: e.target.value.IdTypePaiement,
      Date: e.target.value.Date,
      anne: year, // Set the year extracted from the date
      ResteDuMontant: e.target.value.MontantInitial,
    };
    // console.log(budget);
    // addBudgetItem(submissionData);
    // console.log(budget);
    console.log('e.target:', e.target);
    console.log('value:', e.target.value);
    console.log('data:', submissionData);
    try {
      const response = await UserApi.Ajouter_Budget(submissionData);
      // console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'woooow',
        text: "Budget added successfully!",
      });
      navigate('/budget'); // Redirect on success
    } catch (error) {
      console.error('Failed to add Budget:', error.response ? error.response.data : error);
      let errorMessage='';
      let errorMessages = [];
    
      if (error.response && error.response.data && error.response.data.errors) {
        const { Date, IdTypePaiement, MontantInitial } = error.response.data.errors;
        if (Date) {
          errorMessages.push(Date);
        }
        if (IdTypePaiement) {
          errorMessages.push('the cycle field is required');
        }
        if (MontantInitial) {
          errorMessages.push(MontantInitial);
        }
      }
    
      if (errorMessages.length > 0) {
        errorMessage = errorMessages.join('<br>');
      }
    
      Swal.fire({
        icon: 'error',
        title: 'Oops... Failed to add Budget',
       
        html:`<div style="color: red; text-align: left;">${errorMessage}</div>` ,
      });
        }


  }


const showForm= ()=>{

    Swal.fire({
      title: 'Ajouter Budget',
      html: `
        <form id="ajouterBudgetForm">
          <div class="row">
            <div class="label-Bud col">
              <input type="number" placeholder=""  value={formData.MontantInitial} name="MontantInitial" class="form-control" />
              <label>Montant Initial</label>
            </div>
            <div class="label-Bud col">
              <select class="selectBud form-select show-tick"  value={formData.IdTypePaiement} name="IdTypePaiement">
                <option selected disabled>Cycle</option>
                ${typedePaiement.map(typedePaiements => `<option value="${typedePaiements.IdTypePaiement}">${typedePaiements.Libelle}</option>`).join('')}
              </select>
            </div>
            <div class="label-Bud col">
              <input type="date" placeholder=""  value={formData.Date} name="Date" class="form-control" />
              <label>Date de Budget</label>
            </div>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      allowOutsideClick:false,
      focusConfirm: false,
      preConfirm: () => {
        const form = document.getElementById('ajouterBudgetForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        handleSubmit({ preventDefault: () => { }, target: { value: data } });
      }
    })
  }
  

  // return (
  //   <div className='' id='conBud'>
  //   </div>
  // );

  // return (
  //   // <div className='' id='conBud'>
  //   //   <form onSubmit={handleSubmit}>
  //   //     <h2 className='H2BU'>Budget</h2>
      
  //   //   <div className='row '>
  //   //     <div className="label-Bud col  ">
  //   //       <input type="number" placeholder=" " onChange={handleChange} name='MontantInitial' value={formData.MontantInitial} />
  //   //       <label>Montant Initial</label>
  //   //     </div>
  //   //     <div className="label-Bud col">
  //   //       <select className="selectBud show-tick" onChange={handleChange} name='IdTypePaiement' value={formData.IdTypePaiement}>
  //   //         <option selected disabled>Cycle</option>
  //   //         {
  //   //           typedePaiement.map((typedePaiements) => {
  //   //             return (
  //   //               <option key={typedePaiements.IdTypePaiement} value={typedePaiements.IdTypePaiement}>{typedePaiements.Libelle}</option>
  //   //             )
  //   //           })
  //   //         }
  //   //       </select>
  //   //     </div>
  //   //     <div className="label-Bud col  ">
  //   //       <input type="date" placeholder=" " onChange={handleChange} name='Date' value={formData.Date} />
  //   //       <label>Date de Budget</label>
  //   //     </div>
  //   //   </div>
  //   //   <div className="row">
  //   //     <div className="col">
  //   //       <button type='submit' className='btn btn-dark me-2 w-25' id='buttonBud'>Ajouter</button>
  //   //       <button type='button' className='btn btn-dark w-25' id='buttonBud'>Annuler</button>

  //   //     </div>
  //   //   </div>
  //   //   </form>
  //   // </div>
  // );
};

export default AjouterBudget;





