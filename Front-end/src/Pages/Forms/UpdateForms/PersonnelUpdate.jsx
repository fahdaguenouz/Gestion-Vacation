import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/styles/AjouterPersonnel.css';
import { Usercontext } from '../../../context/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import UserApi from '../../../service/api/UserApi';
import Swal from 'sweetalert2';

export default function PersonnelUpdate( {code}) {

  const { grade,etablissement, matiere, fonctionRole,personnel, logout, authenticated, loading } = Usercontext()
  const navigate = useNavigate()
  
  // const { CodeDoti } = useParams();
  let data={}
  const [codeDoti ,SetCodeDoti]=useState(code)
  // console.log('llllllll');
  //     console.log(code);
  //     console.log('lllllll');
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
    CodeEtablissement: '',
    status:''
  });
 
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

  useEffect(() => {
    
        loadPersonnelData();
        showForm();
    
  }, [])

  
  const loadPersonnelData = async () => {
    try {
      // const response=  await UserApi.getPersonnelDoti(codeDoti);
      // console.log('datataa0');
      // console.log(response.data);
      // console.log('datataa0');

      const personnelData = personnel.find((pers)=>pers.CodeDoti===codeDoti)
      console.log('77777777');
      console.log(personnelData);
      console.log('7777777');
       data ={
        CodeDoti: personnelData.CodeDoti,
        Cin: personnelData.Cin,
        Rib: personnelData.Rib,
        CodeGrade: personnelData.CodeGrade,
        CodeFonct: personnelData.CodeFonct,
        CodeMatiere: personnelData.CodeMatiere,
        LibelleAr: personnelData.LibelleAr,
        LibelleFr: personnelData.LibelleFr,
        Taux: personnelData.Taux,
        CodeEtablissement: personnelData.CodeEtablissement,
        status: personnelData.status,
      };
      console.log('""""""');
      console.log(data);
      console.log('""""""');
    } catch (error) {
      console.error('Error fetching personnel data:', error);
      // Handle error appropriately
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

    const fileInput = document.querySelector('input[type="file"]');
    const updateFormData ={
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
      status:e.target.value.status,
      
    }

    if (fileInput.value) {
      updateFormData.FichierRib = fileInput.value;
    }
  //   Object.entries(formData).forEach(([key, value]) => {
  //     updateFormData.append(key, formData[key]);
  // })
  console.log(updateFormData);
    try {
      await UserApi.updatePersonnel(codeDoti, updateFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire({
        icon: 'success',
        title: 'woooow',
        text: "Personnel Updated successfully!",
      });
      navigate('/personnel');
    } catch (error) {
      console.error('Failed to update personnel:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops... Failed to Update Personnel',
      });
    }
  };

  const showForm= ()=>{
   
    

    Swal.fire({
      title: 'Modifier Personnel',
      html: `<div class='container' id='cont'>
    
      <form onSubmit={handleSubmit} id="ModifierPersonnelForm" encType="multipart/form-data">
        <div class='row '>
          <div class="label-float col">
            <input type="text" placeholder=" " class="form-control"
              name="LibelleAr"
              value="${data.LibelleAr}"
              
               />
            <label>الاسم العائلي والاسم الشخصي</label>
          </div>
          <div class="label-float col">
            <input type="text" placeholder=" " required name="LibelleFr" class="form-control"
              value="${data.LibelleFr}"
               />
            <label>Nom Prenom</label>
          </div>
          <div class="label-float col ">
            <input type="text" placeholder=" " required name="Cin" class="form-control"
              value="${data.Cin}"
              readOnly 
              />
            <label>Cin</label>
          </div>
        </div>
        <div class="row">
        <div class="label-float col ">
            <input type="text" placeholder=" " readOnly  value="${data.CodeDoti}" name="CodeDoti" class="form-control"/>
            <label>CodeDoti</label>
          </div>
          <div class="label-float col">
            <input type="text" placeholder=" " required name="Taux" class="form-control"
              value="${data.Taux}"
               />
            <label>Taux</label>
          </div>
          <div class="label-float col">
            <select class="form-control" name="CodeEtablissement"
              value="${data.CodeEtablissement}"
               >
              <option selected disabled>Etablissment </option>
              ${
                etablissement.map((etablissements) => {
                  return (
                    `<option key="${etablissements.CodeEtablissement }" value="${etablissements.CodeEtablissement}" ${data.CodeEtablissement === etablissements.CodeEtablissement ? 'selected' : ''}>${etablissements.LibelleAr}</option>`
                  )
                })
              }
            </select>
          </div>
        </div>
        <div class='row '>
    
          <div class="label-float col">
            <select class="form-control" name="CodeGrade"
              value="${data.CodeGrade}"
               >
    
              <option selected disabled>Grade</option>
              ${
                grade.map((grades) => {
                  return (
                    `<option key="${grades.CodeGrade}" value="${grades.CodeGrade}" ${data.CodeGrade === grades.CodeGrade ? 'selected' : ''}>${grades.LibelleAr}</option>`
                  )
                })
              }
    
            </select>
          </div>
          <div class="label-float col">
            <select class="form-control" name="CodeFonct"
              value="${data.CodeFonct}"
               >
              <option selected disabled>Fonction Role</option>
              ${
                fonctionRole.map((fonctionRoles) => {
                  return (
                    `<option key="${fonctionRoles.CodeFonctionRole}" value="${fonctionRoles.CodeFonct}" ${data.CodeFonct === fonctionRoles.CodeFonct ? 'selected' : ''}>${fonctionRoles.LibelleAr}</option>`
                  )
                })
              }
            </select>
          </div>
          <div class="label-float col">
            <select class="form-control" name="CodeMatiere"
              value="${data.CodeMatiere}"
               >
              <option selected disabled>Code Matiere</option>
              ${
                matiere.map((matieres) => {
                  return (
                    `<option key="${matieres.CodeGrade}" value="${matieres.CodeMatiere}"  ${data.CodeMatiere === matieres.CodeMatiere ? 'selected' : ''}>${matieres.LibelleAr}</option>`
                  )
                })
              }
            </select>
          </div>
        </div>
        <div class='row '>
    
    
          <div class="label-float col">
            <input type="text" placeholder=" " required name="Rib" class="form-control"
              value="${data.Rib}"
               />
            <label>RIB</label>
          </div>
          <div class="label-float col">
            <select class="form-control" name="status"
              value="${data.status}"
               >
              <option selected disabled>Status</option>
              <option ${data.status === 'active' ? 'selected' : ''}  value='active'>Active</option>
              <option  ${data.status === 'inactive' ? 'selected' : ''} value='inactive'>Inactive</option>
            </select>
          </div>
    
        </div>
    
    
        <div class="row">
          <div class="label-float col">
            <input type="file"  name='FichierRib' />
            <label>Ficher RIB</label>
            <button type="button" class="btn btn-danger"  id="ClearFile">Clear File</button>
            </div>
        </div>
        </div>
      </form>
    </div>`,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      allowOutsideClick: false,
      focusConfirm: false,
      
      preConfirm: () => {
        const form = document.getElementById('ModifierPersonnelForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        handleSubmit({ preventDefault: () => { }, target: { value: data } });
       
      },
      didOpen: () => {
      
        // document.getElementById('FichierRib').addEventListener('change', handleFileChange);
        document.getElementById('ClearFile').addEventListener('click', handleClearFile);

       
      },
      willClose: () => {
        // document.getElementById('FichierRib').removeEventListener('change', handleFileChange);
        document.getElementById('ClearFile').removeEventListener('click', handleClearFile);

    },
    });
    
    
  }

  
}
