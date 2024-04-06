import React, { useEffect, useState } from 'react';
import { CSmartTable } from '@coreui/react-pro';
import { CButton } from '@coreui/react-pro';
import { CCollapse } from '@coreui/react-pro';
import { CCardBody } from '@coreui/react-pro';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../context/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import AjouterJury from './Forms/AjouterForm/AjouterJury';
import JuryUpdate from './Forms/UpdateForms/JuryUpdate';
const Jury = () => {
  const navigate = useNavigate()

  const { juries,matiere, logout, authenticated, loading } = Usercontext()
  const [details, setDetails] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [code,setCode]=useState('')
  const [ModifierDisplay, setModifierDispalay] = useState(false);


  useEffect(() => {
    if (!authenticated) {
      logout()
      navigate('/login')
    }
  }, [authenticated])
  if (loading || !authenticated) {
    return <div>Loading...</div>;
  }
  const displayData = juries.map(jury => {
    // Find the matching personnel for each detailCorrection
    const matchedMatieres = matiere.find(mat => mat.CodeMatiere === jury.CodeMatiere);

    return {
        NumJury:jury.NumJury,
        Matiere: matchedMatieres?.LibelleAr,
        NombreCopies: jury.NombreCopies,
    };
});
  const columns = [
    { key: 'NumJury', label: 'Numero de Juries' },
    { key: 'Matiere', label: 'Matieres' },
    { key: 'NombreCopies', label: 'Nombre de copies' },
    {
      key: 'show_details',
      label: '',
      filter: false,
      sorter: false,
      _style: { width: '1%' },
      scopedSlots: { customRender: 'show_details' },
    },
  ];

  const goToAjouter = () => {
    navigate('/jury/ajouter-jury')
    // setDisplayJury("ajouter");
  };

  const handleUpdate = (IdBudget) => {
    if (!ModifierDisplay) { // Only execute if form has not been shown
      setCode(IdBudget);
      setModifierDispalay(true);
      setTimeout(() => {
        
        setModifierDispalay(false);
      }, 1000); 
    }


  };
  const handleCancel = () => {
    setDisplayJury(null); // Or whatever state indicates that no components should be displayed
  };

  const toggleDetails = (index) => {
    const newDetails = details.includes(index) ? details.filter((item) => item !== index) : [...details, index];
    setDetails(newDetails);
  };
  return (
    <div className='container-fluid'>
      <strong><h3 style={{ color: "#004f83", fontWeight: "bold" }}>Jury</h3> </strong>
      <div>
        <div className="d-flex  justify-content-end mb-2">

          <button onClick={goToAjouter} className="btn btn-outline-success">Ajouter</button>
        </div>
        <div className='row'>
          <div className='col'>

            <CSmartTable
              activePage={1}
              cleaner
              clickableRows
              columns={columns}
              columnFilter
              columnSorter
              footer
              items={displayData}
              itemsPerPageSelect
              itemsPerPage={5}
              pagination
              onFilteredItemsChange={(items) => {
                console.log(items)
              }}
              onSelectedItemsChange={(items) => {

                setSelectedItems(items);

              }}
              scopedColumns={{
                show_details: (item) => {
                  return (
                    <td className="py-2">
                      <CButton

                        className='border-primary '
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          toggleDetails(item.NumJury)
                        }}
                      >
                        {details.includes(item.NumJury) ? 'Hide' : 'Show'}
                      </CButton>
                    </td>
                  )
                },
                details: (item) => {
                  return (

                    <CCollapse visible={details.includes(item.NumJury)}>

                      <CCardBody className="p-3">
                        <h4>{item.name}</h4>
                        <p className="text-muted">crée le : {item.created_at}</p>
                        <CButton size="sm" color="info" onClick={() => handleUpdate(item.NumJury)}>
                          Modifier
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1">
                          Delete
                        </CButton>
                      </CCardBody>
                    </CCollapse>
                  )
                },
                typePaiementLibelle: (item) => {
                  return <td>{item.type_paiement?.Libelle}</td>;
                },
              }}
              selectable
              sorterValue={{ column: 'status', state: 'asc' }}
              tableFilter
              tableProps={{
                className: 'add-this-class',
                responsive: true,
                striped: true,
                hover: true,

              }}
              tableBodyProps={{
                className: 'align-middle'
              }}
            />
          </div>
          {/* {displayJury === "ajouter" &&
            <div className='AjouterBudget col-3'>
              <AjouterJury onCancel={handleCancel} />
            </div>
          } */}
          {ModifierDisplay &&
            <div className='UpdatePersonnel'>
              <JuryUpdate code={code} />
            </div>
          }
        </div>
      </div>

    </div>
  );
}

export default Jury;









