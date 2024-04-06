import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/styles/AjouterBudget.css';
import { Usercontext } from '../../../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import UserApi from '../../../service/api/UserApi';
import Swal from 'sweetalert2';

const BudgetUpdate = ( {code}) => {
    const { budget,grade,etablissement,typedePaiement, matiere, fonctionRole,personnel, logout, authenticated, loading } = Usercontext()
    const navigate = useNavigate()
    let data={}
    const [IdBudget ,SetIdBudget]=useState(code)
    useEffect(() => {
    
        loadBudgetData();
        showForm();
    
  }, [])

  const loadBudgetData = async () => {
    try {
      // const response=  await UserApi.getPersonnelDoti(codeDoti);
      // console.log('datataa0');
      // console.log(response.data);
      // console.log('datataa0');

      const BudgetData = budget.find((bud)=>bud.IdBudget===IdBudget)
    //   console.log('77777777');
    //   console.log(budget);
    //   console.log('7777777');
       data ={
        IdBudget: BudgetData.IdBudget,
        Cycle: BudgetData.type_paiement.Libelle,
        MontantInitial: BudgetData.MontantInitial,
        Date: BudgetData.Date,
        anne: BudgetData.anne,
        ResteDuMontant: BudgetData.ResteDuMontant,
      };
      console.log('""""""');
      console.log(data);
      console.log('""""""');
    } catch (error) {
      console.error('Error fetching Budget data:', error);
      // Handle error appropriately
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateFormData ={
        IdBudget: e.target.value.IdBudget,
        IdTypePaiement: e.target.value.type_paiement.IdTypePaiement,
        MontantInitial: e.target.value.MontantInitial,
        Date: e.target.value.Date,
        anne: e.target.value.anne,
        ResteDuMontant: e.target.value.ResteDuMontant,
      };
  console.log(updateFormData);
    try {
      await UserApi.updatBudget(IdBudget, updateFormData);
      Swal.fire({
        icon: 'success',
        title: 'woooow',
        text: "Budget Updated successfully!",
      });
      navigate('/budget');
    } catch (error) {
      console.error('Failed to update Budget:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops... Failed to Update Budget',
      });
    }
  };


  const showForm= ()=>{
   
    

    Swal.fire({
      title: 'Modifier Budget',
      html: `
      <form id="updateBudgetForm">
          <div class="row">
            <div class="label-Bud col">
              <input type="number" placeholder=""  value="${data.MontantInitial}" name="MontantInitial" class="form-control" />
              <label>Montant Initial</label>
            </div>
            <div class="label-Bud col">
              <select class="selectBud form-select show-tick"  value="${data.Cycle}" name="IdTypePaiement">
                <option selected disabled>Cycle</option>
                ${typedePaiement.map(typedePaiements => `<option value="${typedePaiements.IdTypePaiement}" ${data.Cycle === typedePaiements.Libelle ? 'selected' : ''}>${typedePaiements.Libelle}</option>`).join('')}
              </select>
            </div>
            <div class="label-Bud col">
              <input type="date" placeholder=""  value="${data.Date}" name="Date" class="form-control" />
              <label>Date de Budget</label>
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
        const form = document.getElementById('updateBudgetForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        handleSubmit({ preventDefault: () => { }, target: { value: data } });
       
      },
      
    });
    
    
  }








}

export default BudgetUpdate;
