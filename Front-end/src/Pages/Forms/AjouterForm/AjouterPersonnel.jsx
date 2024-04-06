import React, {  useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/styles/AjouterBudget.css';
import { Usercontext } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../../service/api/UserApi';
import Swal from 'sweetalert2';

export default function AjouterPersonnel({ onCancel }) {

  const { grade,etablissement,AjouterDisplay,setAjouterDisplay, matiere, fonctionRole, logout, authenticated, loading } = Usercontext()
  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [isempty,setIsEmpty]=useState(false)
  
  useEffect(() => {
    showForm();
  }, []); 
  const [formData, setFormData] = useState({
    CodeDoti: '',
    Cin: '',
    Rib: '',
    CodeGrade: '',
    CodeFonct: '',
    CodeMatiere: '',
    LibelleAr: '',
    LibelleFr: '',
    Taux: '',
    CodeEtablissement:''
  });
 
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    setFile(e.target.file)
    setFileSelected(true);
    setIsEmpty(true)
   
  };


  const handleClearFile = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.value) {
        // Clear the file state
        setFile(null);
        setFileSelected(false);
        // Reset the file input value
        fileInput.value = '';
    } else {
      alert('File input is already empty!')
        
    }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // const data = new FormData();
    console.log(e.target.value);
    // Append text fields to FormData
    // Object.keys(formData).forEach(key => {
    //   data.append(key, formData[key]);
    // });
    // console.log(data);
    const data={
      CodeDoti:e.target.value.CodeDoti,
      Cin:e.target.value.Cin,
      Rib:e.target.value.Rib,
      CodeGrade:e.target.value.CodeGrade,
      CodeFonct:e.target.value.CodeFonct,
      CodeMatiere:e.target.value.CodeMatiere,
      LibelleAr:e.target.value.LibelleAr,
      LibelleFr:e.target.value.LibelleFr,
      Taux:e.target.value.Taux,
      CodeEtablissement:e.target.value.CodeEtablissement,
      FichierRib:e.target.value.FichierRib
    }
    console.log(data);
    // Append file if it exists
    // if (file) {
    //   data.append('FichierRib', file);
    // } else {
    //   console.error("File is required.");
    //   return;
    // }
    
  
    // Debug: Log FormData values (for debugging purposes, remove in production)
    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  
    // Submit the form data
    try {
      const response = await UserApi.Ajouter_Personnel(data);
      // console.log(response.data);
     
      Swal.fire({
        icon: 'success',
        title: 'woooow',
        text: "Personnel added successfully!",
      });
      navigate('/personnel'); // Redirect on success
    } catch (error) {
      console.error('Failed to add personnel:', error.response ? error.response.data : error);
      let errorMessage='';
      let errorMessages = [];
    
      if (error.response && error.response.data && error.response.data.errors) {
        const {FichierRib,Taux,CodeEtablissement, CodeDoti, Cin, Rib,CodeGrade,CodeFonct,CodeMatiere,LibelleAr,LibelleFr } = error.response.data.errors;
        if (LibelleAr) {
          errorMessages.push(LibelleAr);
        }
        if (LibelleFr) {
          errorMessages.push(LibelleFr);
        }
        if (CodeDoti) {
          errorMessages.push(CodeDoti);
        }
        if (Cin) {
          errorMessages.push(Cin);
        }
        if (CodeEtablissement) {
          errorMessages.push(CodeEtablissement);
        }
        if (CodeGrade) {
          errorMessages.push(CodeGrade);
        }
        if (CodeFonct) {
          errorMessages.push(CodeFonct);
        }
        if (CodeMatiere) {
          errorMessages.push(CodeMatiere);
        }
        if (Taux) {
          errorMessages.push(Taux);
        }
        if (Rib) {
          errorMessages.push(Rib);
        }
        if (FichierRib) {
          errorMessages.push(FichierRib);
        }
      }
    
      if (errorMessages.length > 0) {
        errorMessage = errorMessages.join('<br>');
      }
    
      Swal.fire({
        icon: 'error',
        title: 'Oops... Failed to add Personnel',
       
        html:`<div style="color: red; text-align: left;">${errorMessage}</div>` ,
      });
    }
  };

  const showForm= ()=>{
    
    

    Swal.fire({
      title: 'Ajouter Personnel',
      html: `
        <div>
          <form onSubmit={handleSubmit} id="AjouterPersonnelForm" encType="multipart/form-data">
            <div class="form-group row">
              <div class="col ">
                <label for="LibelleAr">الاسم العائلي والاسم الشخصي</label>
                <input type="text" class="form-control" id="LibelleAr" name="LibelleAr" placeholder="" value="${formData.LibelleAr}"  />
              </div>
              <div class="col">
                <label for="LibelleFr">Nom Prenom</label>
                <input type="text" class="form-control" id="LibelleFr" name="LibelleFr"  value="${formData.LibelleFr}" />
              </div>
              <div class="col">
                <label for="Cin">Cin</label>
                <input type="text" class="form-control" id="Cin" name="Cin"  value="${formData.Cin}" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col">
                <label for="CodeDoti">CodeDoti</label>
                <input type="text" class="form-control" id="CodeDoti" name="CodeDoti" value="${formData.CodeDoti}" />
              </div>
              <div class="col">
                <label for="Taux">Taux</label>
                <input type="text" class="form-control" id="Taux" name="Taux"  value="${formData.Taux}" />
              </div>
              <div class="col">
                <label for="CodeEtablissement">Etablissment</label>
                <select class="form-control" id="CodeEtablissement" name="CodeEtablissement" value={formData.CodeEtablissement}>
                  <option selected disabled>Etablissment</option>
                  ${etablissement.map((etablissements) => `<option key="${etablissements.CodeEtablissement}" value="${etablissements.CodeEtablissement}">${etablissements.LibelleAr}</option>`)}
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col">
                <label for="CodeGrade">Grade</label>
                <select class="form-control" id="CodeGrade" name="CodeGrade" value={formData.CodeGrade} >
                  <option selected disabled>Grade</option>
                  ${grade.map((grades) => `<option key="${grades.CodeGrade}" value="${grades.CodeGrade}">${grades.LibelleAr}</option>`)}
                </select>
              </div>
              <div class="col">
                <label for="CodeFonct">Fonction Role</label>
                <select class="form-control" id="CodeFonct" name="CodeFonct" value={formData.CodeFonct} >
                  <option selected>Fonction Role</option>
                  ${fonctionRole.map((fonctionRoles) => `<option key="${fonctionRoles.CodeFonctionRole}" value="${fonctionRoles.CodeFonct}">${fonctionRoles.LibelleAr}</option>`)}
                </select>
              </div>
              <div class="col">
                <label for="CodeMatiere">Code Matiere</label>
                <select class="form-control" id="CodeMatiere" name="CodeMatiere" value={formData.CodeMatiere} >
                  <option selected disabled>Code Matiere</option>
                  ${matiere.map((matieres) => `<option key="${matieres.CodeGrade}" value="${matieres.CodeMatiere}">${matieres.LibelleAr}</option>`)}
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col">
                <label for="Rib">RIB</label>
                <input type="text" class="form-control" id="Rib" name="Rib"  value="${formData.Rib}" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col">
                <label for="FichierRib">Ficher RIB</label>
                <input type="file" class="form-control-file" id="FichierRib" name="FichierRib"  />
                <button type="button" class="btn btn-danger"  id="ClearFile">Clear File</button>
              </div>
            </div>
          </form>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      allowOutsideClick: false,
      focusConfirm: false,
      preConfirm: () => {
        const form = document.getElementById('AjouterPersonnelForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        handleSubmit({ preventDefault: () => { }, target: { value: data } });
      },
      didOpen: () => {
      
        document.getElementById('FichierRib').addEventListener('change', handleFileChange);
        document.getElementById('ClearFile').addEventListener('click', handleClearFile);

       
      },
      willClose: () => {
        document.getElementById('FichierRib').removeEventListener('change', handleFileChange);
        document.getElementById('ClearFile').removeEventListener('click', handleClearFile);

    },
      
    });
    
    
    
  }

  
}
