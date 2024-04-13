import React, { useEffect, useState } from 'react';
import { CSmartTable } from '@coreui/react-pro';
import { CButton } from '@coreui/react-pro';
import { CCollapse } from '@coreui/react-pro';
import { CCardBody } from '@coreui/react-pro';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../context/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { pdf } from '@react-pdf/renderer';
import ExportDashboard from '../ExportPdf/ExportDashboard';

import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import AjouterDetails from './Forms/AjouterForm/AjouterDetails';
import DetailsUpdate from './Forms/UpdateForms/DetailsUpdate';
const Dashboard = () => {
    const navigate = useNavigate()

    const { personnel, loggednUser, detailCorrection, user, logout, authenticated, loading } = Usercontext()
    const [details, setDetails] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [code,setCode]=useState('')
    const [AjouterDisplay, setAjouterDispalay] = useState(false);
   const [ModifierDisplay, setModifierDispalay] = useState(false);



    useEffect(() => {
        if (!authenticated) {
            logout()
            navigate('/login')

        }
    }, [authenticated])

    if (!loggednUser || Object.keys(loggednUser).length === 0) {
        return <div>data is not available.</div>;
    }
    if (loading || !authenticated) {
        return <div>Loading...</div>;
    }

    // console.log(personnel);

    const displayData = detailCorrection.map(detail => {
        // Find the matching personnel for each detailCorrection
        const matchedPersonnel = personnel.find(p => p.CodeDoti === detail.CodeDoti);

        return {
            id:detail.id,
            codeDoti: detail.CodeDoti,
            personnelName: matchedPersonnel ? matchedPersonnel.LibelleFr : 'N/A',
            etablissementName: matchedPersonnel ? matchedPersonnel.etablissement_scolaire.LibelleAr : 'N/A',
            dateCorrection: detail.date_de_correction,
            CopieCorriger: detail.nombre_de_copie,
            nombreCopies: detail ? detail.jury.NombreCopies : 'N/A', // Assuming you have jury info in detailCorrection
            prixDeCopie: detail.prix_de_copie,
            niveau: detail ? detail.typepaiement.Libelle : 'N/A', // Assuming you have

            matiere: matchedPersonnel ? matchedPersonnel.matiere.LibelleAr : 'N/A',
            taux: matchedPersonnel ? matchedPersonnel.Taux : 'N/A',
            grade: matchedPersonnel ? matchedPersonnel.grade.LibelleFr : 'N/A',

        };
    });

    const columns = [
        { key: 'personnelName', label: 'Personnel Name' },
        { key: 'codeDoti', label: 'Code Doti' },
        { key: 'etablissementName', label: 'Etablissement' },
        { key: 'matiere', label: 'Matiere' },
        { key: 'taux', label: 'Taux' },
        { key: 'nombreCopies', label: 'Nombre Copies' },
        { key: 'CopieCorriger', label: 'Copie Corriger' },
        { key: 'prixDeCopie', label: 'Prix de Copie' },
        { key: 'dateCorrection', label: 'Date de Correction' },
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
    
      const handleUpdate = (id) => {
       
        if (!ModifierDisplay) { // Only execute if form has not been shown
            setCode(id);
            setModifierDispalay(true);
            setTimeout(() => {
              
              setModifierDispalay(false);
            }, 1000); 
          }

      };
     
    const handleExport = async (selectedItems) => {
        if (selectedItems.length === 1) {
            const blob = await pdf(<ExportDashboard data={selectedItems[0]} />).toBlob();
            saveAs(blob, `Export-${selectedItems[0].personnelName.replace(/\s+/g, '_')}.pdf`);
        } else {
            const zip = new JSZip();
            for (const item of selectedItems) {
                const blob = await pdf(<ExportDashboard data={item} />).toBlob();
                zip.file(`Export-${item.personnelName.replace(/\s+/g, '_')}.pdf`, blob);
            }
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, 'DashboardExport.zip');
        }
    };

    const toggleDetails = (index) => {
        const newDetails = details.includes(index) ? details.filter((item) => item !== index) : [...details, index];
        setDetails(newDetails);
    };

    return (
        <div>
            <strong><h3 style={{ color: "#004f83", fontWeight: "bold" }}>Dashboard</h3> </strong>
            <div>
                <b>
                    Bonjour Monsieur <span style={{ color: 'red' }}> {loggednUser.data.name}</span>
                </b>
            </div>
            <div className="d-flex  justify-content-end mb-2">

                <button onClick={() => handleExport(selectedItems)} className="btn btn-outline-success">Export</button>
                <button onClick={goToAjouter} className="btn btn-outline-success">Ajouter</button>
            </div>
            <div className="row">
                

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
                    itemsPerPage={6}
                    pagination
                    // onFilteredItemsChange={(items) => {
                    //     console.log(items)
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
                                            toggleDetails(item.codeDoti)

                                        }}
                                    >
                                        {details.includes(item.codeDoti) ? 'Hide' : 'Show'}
                                    </CButton>
                                </td>
                            )
                        },
                        details: (item) => {
                            return (

                                <CCollapse visible={details.includes(item.codeDoti)}>

                                    <CCardBody className="p-3">
                                        <h4>{item.LibelleFr}</h4>
                                        <p className="text-muted">User since: {item.created_at}</p>
                                        <CButton size="sm" color="info" onClick={() => handleUpdate(item.id)}>
                                            Modifier
                                        </CButton>
                                        <CButton size="sm" color="danger" className="ml-1" onClick={() => alert('supprimer')}>
                                            Delete
                                        </CButton>
                                    </CCardBody>
                                </CCollapse>
                            )
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
                        // status: (item) => (
                        //     <td>
                        //         <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                        //     </td>
                        // ),
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
            {
                AjouterDisplay  &&
                    <div className='AjouterDetails'>
                        <AjouterDetails  />
                    </div>
                }
            {
            ModifierDisplay  &&
                <div className='UpdatePersonnel'>
                    <DetailsUpdate code={code} />
                </div>
            }
            </div>

        </div>
    );
}

export default Dashboard;
