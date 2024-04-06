import React, { useEffect, useState } from 'react';
import { CSmartTable } from '@coreui/react-pro';
import { CButton } from '@coreui/react-pro';
import { CCollapse } from '@coreui/react-pro';
import { CCardBody } from '@coreui/react-pro';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../context/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserApi from '../service/api/UserApi';

const Users = () => {
  const navigate = useNavigate()

  const { user, logout, authenticated, loading } = Usercontext()
  const [details, setDetails] = useState([])
  useEffect(() => {
    if (!authenticated) {
      logout()
      navigate('/login')
    }
  }, [authenticated])
  if (loading || !authenticated) {
    return <div>Loading...</div>;
  }
  const handleDeleteUser = async (userId) => {
    // Ask for confirmation
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
  
    if (isConfirmed) {
      try {
        await UserApi.deleteUser(userId);
        alert('User deleted successfully');
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete user', error);
        alert('Failed to delete user');
      }
    } else {
      // If the user clicks "Cancel", do nothing
      console.log('User deletion cancelled');
    }
  };
  const handleUpdateUser =(userId)=>{
    navigate(`/users/update-user/${userId}`);

  }
  const columns = [
    { key: 'id', label: 'User Id' },
    { key: 'name', label: 'Nom et Prenom' },
    { key: 'email', label: 'Email' },
    { key: 'created_at', label: 'Created le' },
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
    navigate('/users/Ajouter-User');
  };
  const toggleDetails = (index) => {
    const newDetails = details.includes(index) ? details.filter((item) => item !== index) : [...details, index];
    setDetails(newDetails);
  };
  return (
    <div className='container-fluid'>
      <strong><h3 style={{ color: "#004f83", fontWeight: "bold" }}>Users</h3> </strong>
      <div>
        <div className="d-flex  justify-content-end mb-2">
          <button onClick={goToAjouter} className="btn btn-outline-success">Ajouter</button>
        </div>
        <CSmartTable
          activePage={1}
          cleaner
          clickableRows
          columns={columns}
          columnFilter
          columnSorter
          footer
          items={user}
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          // onFilteredItemsChange={(items) => {
          //   console.log(items)
          // }}
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
                      toggleDetails(item.id)
                    }}
                  >
                    {details.includes(item.id) ? 'Hide' : 'Show'}
                  </CButton>
                </td>
              )
            },
            details: (item) => {
              return (

                <CCollapse visible={details.includes(item.id)}>

                  <CCardBody className="p-3">
                    <h4>{item.name}</h4>
                    <p className="text-muted">User since: {item.created_at}</p>
                    <CButton size="sm" color="info"  onClick={() => handleUpdateUser(item.id)} >
                      Modifier
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-1" onClick={() => handleDeleteUser(item.id)}>
                      Delete
                    </CButton>
                  </CCardBody>
                </CCollapse>
              )
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
    </div>
  );
}

export default Users;









