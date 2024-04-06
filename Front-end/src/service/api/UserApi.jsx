import { axiosClient } from "../../api/axios";

const UserApi = {

  login: async (email, password) => {
    return axiosClient.post('/login', { email, password });
  },
  logout: async () => {
    return await axiosClient.post('/logout')
  },




  getUser: async () => {
    return await axiosClient.get('/get-users')
  },
  getUserById: async (userId) => {
    return axiosClient.get(`/users/get-user/${userId}`);
  },
  getPersonnel: async () => {
    return await axiosClient.get('/get-personnels')
  },
  getBudget: async () => {
    return await axiosClient.get('/get-budgets')
  },
  getMatiere: async () => {
    return await axiosClient.get('/get-matieres')
  },
  getGrade: async () => {
    return await axiosClient.get('/get-grades')
  },
  getFonctionRole: async () => {
    return await axiosClient.get('/get-fonction-roles')
  },
  getDetailCorrection: async () => {
    return await axiosClient.get('/get-detail-corrections')
  },
  getEtablissementScolair: async () => {
    return await axiosClient.get('/get-etblissement-scolaires')
  },
  getTypedePaiements: async () => {
    return await axiosClient.get('/get-type-paiement')
  },
  getJuries: async () => {
    return await axiosClient.get('/get-jury')
  },

  
  
  getLoggedInUser: async () => {
    return await axiosClient.get('/user/get-logged-in-user')
  },

  getPersonnelDoti: async (CodeDoti) => {
    return axiosClient.get(`/personnel/get-personnel/${CodeDoti}`);
  },


  
  Ajouter_User: async (budgetData) => {
    return axiosClient.post('/Ajouter-Users', budgetData);
  },
  Ajouter_Detail_correction: async (data) => {
    return axiosClient.post('/Ajouter-Detail-correction', data);
  },

  Ajouter_Budget: async (BudgetData) => {
    return axiosClient.post('/Ajouter-Budget', BudgetData);
  },
   Ajouter_Jury: async (JuryData) => {
    return axiosClient.post('/Ajouter-Jury', JuryData);
  },
  Ajouter_Personnel: async (PersonnelData) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    };
    return axiosClient.post('/Ajouter-Personnel', PersonnelData, config);
},

  




  updateUser: async (userId, userData) => {
    return axiosClient.put(`/users/Update-User/${userId}`, userData);
  },

  updatePersonnel: async (CodeDoti, PersonnelData) => {
    return axiosClient.put(`/personnel/Update-Personnel/${CodeDoti}`, PersonnelData);
  },
   
  updatBudget: async (IdBudget, Budgetdata) => {
    return axiosClient.put(`/budget/Update-Budget/${IdBudget}`, Budgetdata);
  },

  updateJury: async (NumJury, Jurydata) => {
    return axiosClient.put(`/jury/Update-jury/${NumJury}`, Jurydata);
  },






  


  deleteUser: async (userId) => {
    return axiosClient.delete(`/delete-User/${userId}`);
  },

  deletePersonnel: async (PersonnelDoti) => {
    return axiosClient.delete(`/delete-personnel/${PersonnelDoti}`);
  },


}
export default UserApi;