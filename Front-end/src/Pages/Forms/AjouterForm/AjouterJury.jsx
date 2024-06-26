import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/styles/AjouterBudget.css';
import { Usercontext } from '../../../context/AuthProvider';
import UserApi from '../../../service/api/UserApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const AjouterJury = () => {
  const {  addJuryItem,juries,matiere, typedePaiement, user, logout, authenticated, loading } = Usercontext()
  const navigate = useNavigate()
  
  const [CodeMatiere, setCodeMatiere] = useState('');
  const [selectedIdTypePaiement, setSelectedIdTypePaiement] = useState('');
  const [Matiere_id,setMatiere_id]=useState('');

  const filteredMatieres = matiere.filter((m) => m.IdTypePaiement === selectedIdTypePaiement);
//   const [formData, setFormData] = useState({
//     NumJury: '',
//     CodeMatiere: '',
//     NombreCopies: '',
//   });
  const initialLine = {
    NumJury: '',
    CodeMatiere: '',
    NombreCopies: '',
  };
  const [lines, setLines] = useState([]);

  // Function to handle changes to any input
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'IdTypePaiement') {
      setSelectedIdTypePaiement(value);
    } else if (name === 'CodeMatiere') {
      const selectedMatiere = matiere.find((m) => m.CodeMatiere === value);
      setCodeMatiere(value);
      setMatiere_id(selectedMatiere ? selectedMatiere.id : '');
      setLines(lines.map((line, i) => {
        if (i === index) {
          return { ...line, CodeMatiere: value, Matiere_id: selectedMatiere ? selectedMatiere.id : '' };
        }
        return line;
      }));
    } else {
      const newLines = [...lines];
      newLines[index][name] = value;
      if (index === newLines.length - 1 || newLines[index].NumJury === !null || newLines[index].NombreCopies === !null) {
        setLines([...newLines, { NumJury: '', CodeMatiere: CodeMatiere, Matiere_id: Matiere_id, NombreCopies: '' }]);
      } else {
        setLines(newLines);
      }
    }

    console.log(filteredMatieres);
  };


  // Function to add a new line of inputs
  const handleAddLine = () => {
    setLines([...lines, { NumJury: '', CodeMatiere: CodeMatiere,Matiere_id:Matiere_id, NombreCopies: '' }]);
  };
  

  // Function to remove a line of inputs
  const handleRemoveLine = (index, e) => {
  
    const newLines = [...lines];
    newLines.splice(index, 1);
    setLines(newLines);
  };

  

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    lines.forEach((line) => {
        const submissionData = {
          NumJury: line.NumJury,
          CodeMatiere: line.CodeMatiere,
          NombreCopies: line.NombreCopies,
          Matiere_id:line.Matiere_id
        };
        // console.log(submissionData);
      });

    //   console.log(juries);

    // console.log('RRRR');
    addJuryItem({ juries: lines })
    // console.log('RRRR');
    console.log({juries: lines });

    try {
      const response = await UserApi.Ajouter_Jury({ juries: lines });
      // console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'woooow',
        text: "Jury Added successfully!",
      });
      navigate('/jury'); // Redirect on success
    } catch (error) {
      console.error('Failed to add Jury:', error.response ? error.response.data : error);
      Swal.fire({
        icon: 'error',
        title: 'Oops... Failed to add Jury',
      });
    }


  };


  return (
    <div className='' id='conBud' >
      <form onSubmit={handleSubmit}>
        <h2 className='H2BU'>Ajouter Jury</h2>
        <div className='row'>
          <div className="col-4"></div>
          <div className="label-Bud col-4 ">
          <select className="selectBud show-tick"  onChange={handleChange} name='IdTypePaiement' value={selectedIdTypePaiement}>
              <option selected disabled>Cycle</option>
              {typedePaiement.map((type) => (
                <option key={type.IdTypePaiement} value={type.IdTypePaiement}>{type.Libelle}</option>
              ))}
            </select>
            <select className="selectBud show-tick"  onChange={handleChange} name='CodeMatiere' value={CodeMatiere}>
              <option selected disabled>Matieres</option>
              {filteredMatieres.map((matieres) => (
                <option key={matieres.CodeMatiere} value={matieres.CodeMatiere}>{matieres.LibelleAr}</option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <button type="button" className='btn btn-outline-primary' onClick={handleAddLine}>Add</button>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Num Jury</th>
              <th>Nombre Copies</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => (
              <tr key={index}>
                <td><input type="text" className="form-control" placeholder="Num Jury" value={line.NumJury} onChange={(e) => handleChange(e, index)} name="NumJury" /></td>
<td><input type="number" className="form-control" placeholder="Nombre Copies" value={line.NombreCopies} onChange={(e) => handleChange(e, index)} name="NombreCopies" /></td>

                <td><button type="button" className="btn btn-outline-danger" onClick={(e) => handleRemoveLine(index, e)}>-</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col">
            <button type='submit' className='btn btn-dark me-2 w-25' id='buttonBud'>Submit All</button>
            <button type='button' className='btn btn-dark w-25' id='buttonBud'>Annuler</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AjouterJury;





