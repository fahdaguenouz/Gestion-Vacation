import React, { useEffect, useState } from 'react';
import { CSmartTable } from '@coreui/react-pro';
import { CButton } from '@coreui/react-pro';
import { CCollapse } from '@coreui/react-pro';
import { CCardBody } from '@coreui/react-pro';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../context/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import AjouterBudget from './Forms/AjouterForm/AjouterBudget';
import BudgetUpdate from './Forms/UpdateForms/BudgetUpdate';
const Budget = () => {
  const navigate = useNavigate()

  const { budget, logout, authenticated, loading } = Usercontext()
  const [details, setDetails] = useState([])
  const [code,setCode]=useState('')
  
  const [AjouterDisplay, setAjouterDispalay] = useState(false);
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

  const columns = [
    { key: 'IdBudget', label: 'Code Budget' },
    { key: 'typePaiementLibelle', label: 'Cycle' },
    { key: 'MontantInitial', label: 'Le Montant Initial' },
    { key: 'Date', label: 'Date' },
    { key: 'anne', label: 'Anne', _props: { style: { direction: 'rtl' } } },
    { key: 'ResteDuMontant', label: 'Reste du Montant' },
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
    if (!AjouterDisplay) { // Only execute if form has not been shown
    
      setAjouterDispalay(true);
      setTimeout(() => {
        
        setAjouterDispalay(false);
      }, 1000); 
    }
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
 

  const toggleDetails = (index) => {
    const newDetails = details.includes(index) ? details.filter((item) => item !== index) : [...details, index];
    setDetails(newDetails);
  };
  return (
    <div className='container-fluid'>
      <strong><h3 style={{ color: "#004f83", fontWeight: "bold" }}>Budget</h3> </strong>
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
              items={budget}
              itemsPerPageSelect
              itemsPerPage={5}
              pagination
              onFilteredItemsChange={(items) => {
                // console.log(items)
              }}
              onSelectedItemsChange={(items) => {

                

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
                          toggleDetails(item.IdBudget)
                        }}
                      >
                        {details.includes(item.IdBudget) ? 'Hide' : 'Show'}
                      </CButton>
                    </td>
                  )
                },
                details: (item) => {
                  return (

                    <CCollapse visible={details.includes(item.IdBudget)}>

                      <CCardBody className="p-3">
                        <h4>{item.name}</h4>
                        <p className="text-muted">User since: {item.created_at}</p>
                        <CButton size="sm" color="info" onClick={() => handleUpdate(item.IdBudget)}>
                          Modifier
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1" onClick={() => HandleBudgetDelete(item.IdBudget)}>
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
          {AjouterDisplay && 
          <div className='AjouterPersonnel'>
           <AjouterBudget  />
          </div>
        }
        {  ModifierDisplay && 
          <div className='UpdatePersonnel '>
            <BudgetUpdate code={code}/>
          </div>
        }
        </div>
      </div>

    </div>
  );
}

export default Budget;









