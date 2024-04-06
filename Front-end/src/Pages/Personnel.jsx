import React, { useEffect, useState } from 'react';
import { CBadge, CSmartTable } from '@coreui/react-pro';
import { CButton } from '@coreui/react-pro';
import { CCollapse } from '@coreui/react-pro';
import { CCardBody } from '@coreui/react-pro';
import { Link, useNavigate } from 'react-router-dom';
import { Usercontext } from '../context/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExportPersonnel from '../ExportPdf/ExportPersonnel';
import { axiosClient } from '../api/axios';
import UserApi from '../service/api/UserApi';
import AjouterPersonnel from './Forms/AjouterForm/AjouterPersonnel';
import PersonnelUpdate from './Forms/UpdateForms/PersonnelUpdate';
// import ExportPersonnel from '../ExportPdf/ExportPersonnel';
const Personnel = () => {
  const navigate = useNavigate()

  const { personnel, logout, authenticated, loading } = Usercontext()
  const [details, setDetails] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [exporting, setExporting] = useState(false); 
   const [code,setCode]=useState('')
   const [AjouterDisplay, setAjouterDispalay] = useState(false);
   const [ModifierDisplay, setModifierDispalay] = useState(false);

 
  useEffect(() => {
    if (!authenticated) {
      logout()
      navigate('/login')
    }
  }, [authenticated,selectedItems])

  if (loading || !authenticated) {
    return <div>Loading...</div>;
  }

  const HandlePersonnel = async (PersonnelDoti) => {
    // Ask for confirmation
    const isConfirmed = window.confirm('Are you sure you want to delete this Personnel?');
  
    if (isConfirmed) {
      try {
        await UserApi.deletePersonnel(PersonnelDoti);
        alert('Personnel deleted successfully');
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete Personnel', error);
        alert('Failed to delete Personnel');
      }
    } else {
      // If the user clicks "Cancel", do nothing
      console.log('Personnel deletion cancelled');
    }
  };

  const columns = [
    { key: 'CodeDoti', label: 'Code Doti' },
    { key: 'Cin', label: 'CIN' },
    { key: 'LibelleFr', label: 'Name (FR)' },
    { key: 'LibelleAr', label: 'Name (AR)', _props: { style: { direction: 'rtl' } } }, 
    { key: 'EtablissementLibelle', label: 'Etablissement '},
    { key: 'GradesLibelle', label: 'Grade ' },
    { key: 'FonctionRoleLibelle', label: 'Fonction' },
    { key: 'MatiersLibelle', label: 'Matieres' },
    { key: 'Rib', label: 'RIB' },
    { key: 'status', label: 'status' },
    {
      key: 'downloadRib',
      label: 'Download RIB',
      _style: { textAlign: 'center' },
      scopedSlots: {
        customRender: 'downloadRib', // This tells the table you'll handle this column's rendering
      },
    },

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

  const handleUpdate = (codeDoti) => {
    if (!ModifierDisplay) { // Only execute if form has not been shown
      setCode(codeDoti);
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
  const getBadge = (status) => {
    switch (status) {
      case 'active':
        return 'primary'
      case 'inactive':
        return 'danger'
      default:
        return 'primary'
    }
  }
  const flattenedPersonnel = personnel.map(item => ({
    ...item,
    EtablissementLibelle: item.etablissement_scolaire?.LibelleAr,
    GradesLibelle: item.grade?.LibelleAr,
    MatiersLibelle: item.matiere?.LibelleAr,
    FonctionRoleLibelle: item.fonction_role?.LibelleAr,
  }));
 
  return (
    <div className='container-fluid'>
      <strong><h3 style={{ color: "#004f83", fontWeight: "bold" }}>Personnel</h3> </strong>
      <div >
        <div className="d-flex  justify-content-end mb-2"> 

          <button onClick={goToAjouter} className="btn btn-outline-success">Ajouter</button>
        {/* <Link className="btn btn-outline-success" to='/personnel/Ajouter-Personnel'>Ajouter</Link> */}
        </div>
        <div className='row'>

        <div className='Tableaux col'>

        <CSmartTable

          activePage={1}
          cleaner
          
          clickableRows
          columns={columns}
          columnFilter
          columnSorter
          footer
          items={flattenedPersonnel}
          itemsPerPageSelect
          itemsPerPage={6}
          pagination
          // onFilteredItemsChange={(items) => {
          //   console.log('filter');
          //   console.log(items)
          //   console.log('filter');

          // }}
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
                      toggleDetails(item.CodeDoti)
                    }}
                  >
                    {details.includes(item.CodeDoti) ? 'Hide' : 'Show'}
                  </CButton>
                </td>
              )
            },
            details: (item) => {
              return (

                <CCollapse visible={details.includes(item.CodeDoti)}>

                  <CCardBody className="p-3">
                    <h4>{item.LibelleFr}</h4>
                    <p className="text-muted">User since: {item.created_at}</p>
                    <CButton size="sm" color="info" onClick={()=>handleUpdate(item.CodeDoti)} >
                      
                      Modifier
                      
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-1" onClick={() => HandlePersonnel(item.CodeDoti)}>
                      Delete
                    </CButton>
                  </CCardBody>
                </CCollapse>
              )
            },
            downloadRib: (item) => {
              
              const downloadUrl = `${axiosClient.defaults.baseURL}/personnel/${item.CodeDoti}/download-rib`; // Adjust this URL to match your actual API endpoint
              return (
                <td>
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    Download PDF
                  </a>
                </td>
              );
            },
            // EtablissementLibelle: (item) => {
            //   return <td>{item.etablissement_scolaire?.LibelleAr}</td>;
            // },
            // GradesLibelle: (item) => {
            //   return <td>{item.grade?.LibelleAr}</td>;
            // },
            // MatiersLibelle: (item) => {
            //   return <td>{item.matiere?.LibelleAr}</td>;
            // },
            // FonctionRoleLibelle: (item) => {
            //   return <td>{item.fonction_role?.LibelleAr}</td>;
            // },
            status: (item) => (
              <td>
                <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
              </td>
            ),
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
           <AjouterPersonnel  />
          </div>
        }
        {  ModifierDisplay && 
          <div className='UpdatePersonnel'>
            <PersonnelUpdate code={code}/>
          </div>
        }
        </div>
        
          
         
      </div>
    </div>
  );
}

export default Personnel;
