import { createContext, useContext, useEffect, useState } from "react";
import UserApi from "../service/api/UserApi";
import { axiosClient } from "../api/axios";

const AuthContext = createContext({
    user: [],
  authenticated: false,
  setUser: () => {
  },
  logout: () => {
  },
  login: (email, password) => {
  },
  setAuthenticated: () => {
  },
  setToken: () => {
  },
  personnel:[],
  setPersonnel: () => {},
  loading:false,
  budget:[],
  setBudget: () => {},
  matiere:[],
  setMatiere: () => {},
  grade:[],
  setGrade: () => {},
  fonctionRole:[],
  setFonctionRole: () => {},
  detailCorrection:[],
  getDetailCorrection: () => {},
  loggednUser:[],
  getLoggedInUser: () => {},
  etablissement:[],
  getEtablissement: () => {},
  typedePaiement:[],
  getTypedePaiement: () => {},
  juries:[],
 getJurie:()=>{},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [personnel, setPersonnel] = useState([]); 
    const [budget, setBudget] = useState([]); 
    const [matiere, setMatiere] = useState([]); 
    const [grade, setGrade] = useState([]); 
    const [fonctionRole, setFonctionRole] = useState([]); 
    const [detailCorrection, setDetailCorrection] = useState([]); 
    const [loggednUser, setLoggedInUser] = useState([]);
    const [etablissement, setEtablissement] = useState([]); 
    const [typedePaiement, setTypedepaiement]=useState([])
    const [juries, setJuries]=useState([])

    
    const [loading, setLoading] = useState(false);
    const [authenticated, _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'));


    useEffect(() => {
      if (authenticated) {
        setLoading(true);
        getLoggedInUser();
        getDetailCorrection();
        getPersonnel();
        getBudget();
        getGrades();
        getFontionRole();
        getMatiere();
        getUser();
        getEtablissement();
        getTypedePaiement();
        getJurie();

      }
    }, [authenticated]);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     if (authenticated) {
    //       setLoading(true);
    //       try {
    //         const responses = await Promise.all([
    //           UserApi.getLoggedInUser(),
    //           UserApi.getDetailCorrection(),
    //           UserApi.getPersonnel(),
    //           UserApi.getBudget(),
    //           UserApi.getGrade(),
    //           UserApi.getFonctionRole(),
    //           UserApi.getMatiere(),
    //           UserApi.getUser(),
    //           // Add other API calls here
    //         ]);
    //         setLoggedInUser(responses[0].data);
    //         setDetailCorrection(responses[1].data);
    //         setPersonnel(responses[2].data);
    //         setBudget(responses[3].data);
    //         setGrade(responses[4].data);
    //         setFonctionRole(responses[5].data);
    //         setMatiere(responses[6].data);
    //         setUser(responses[7].data);

    //         // Update other states accordingly
    //       } catch (error) {
    //         console.error("Fetching data error", error);
    //         // Handle errors as needed
    //       } finally {
    //         setLoading(false);
    //       }
    //     }
    //   };
    
    //   fetchData();
    // }, [authenticated]);
    
    
    const login = async (email,password)=>{
      try {
        const response = await UserApi.login(email, password);
        const { token } = response.data;
        // console.log('tttt'+token);
        if (token) {
          setToken(token);
          setAuthenticated(true); // Ensure the authenticated state is updated
          return response; // Optionally return response for further handling
        }
        
      } catch (error) {
        console.error("Login error ..", error);
        throw  error; 
      }
    }
    
    
    
    const setAuthenticated = (isAuthenticated) => {
      _setAuthenticated(isAuthenticated)
      window.localStorage.setItem('AUTHENTICATED', JSON.stringify(isAuthenticated))
    }
    
    
    const logout =async () => {
      try {
        await axiosClient.get('/sanctum/csrf-cookie');
        // Call the backend to invalidate the session/token
        await axiosClient.post('/logout');
        setAuthenticated(false);
        // Remove token from localStorage or where it's stored
        localStorage.removeItem('token');
        // Redirect to login page or home
        
      } catch (error) {
        console.error("Logout error", error);
        // Handle logout error (optional)
      } finally {
        // Clear authentication state regardless of API call success
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('AUTHENTICATED');
        setUser({});
        _setAuthenticated(false);
      }
      
    }
    
    
    const getUser = async () => {
      try {
        const response = await UserApi.getUser();
        setUser(response.data); 
        // console.log('loooooooooo');
        // console.log(response);
        // console.log('loooooooooo');

      } catch (error) {
        console.error("Error fetching User", error);
        
      }finally {
        setLoading(false); 
    }
    };


    const getPersonnel = async () => {
      try {
        const response = await UserApi.getPersonnel();
        setPersonnel(response.data); 
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching Personnel", error);
        
      }
    };

    const addBudgetItem = (newBudgetItem) => {
      setBudget([...budget, newBudgetItem]);
    };
    const addJuryItem = (neewjury) => {
      setJuries([...juries, neewjury]);
    };

    const getBudget = async () => {
      try {
        const response = await UserApi.getBudget();
        setBudget(response.data); 
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching Budget", error);
        
      }
    };

    const getMatiere = async () => {
      try {
        const response = await UserApi.getMatiere();
        setMatiere(response.data); 
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching Matieres", error);
        
      }
    };
    const getGrades = async () => {
      try {
        const response = await UserApi.getGrade();
        setGrade(response.data); 
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching Grade", error);
        
      }
    };
    const getFontionRole = async () => {
      try {
        const response = await UserApi.getFonctionRole();
        setFonctionRole(response.data); 
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching Fonction-Role", error);
        
      }
    };
    const getJurie = async () => {
      try {
        const response = await UserApi.getJuries();
        setJuries(response.data); 
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching Juries", error);
        
      }
    };
    const getDetailCorrection = async () => {
      try {
        const response = await UserApi.getDetailCorrection();
        setDetailCorrection(response.data); 
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching Detail Correction", error);
        
      }
    };
    const getEtablissement = async () => {
      try {
        const response = await UserApi.getEtablissementScolair();
        setEtablissement(response.data); 
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching Etablissemnet Scolaires ", error);
        
      }
    };
    const getTypedePaiement = async () => {
      try {
        const response = await UserApi.getTypedePaiements();
        setTypedepaiement(response.data); 
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching Type de Paiement ", error);
        
      }
    };

    
    const getLoggedInUser = async () => {
      try {
        const response = await UserApi.getLoggedInUser();
        setLoggedInUser(response.data); 
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching User Loggin ", error);
        
      }
    };



    
      const setToken = (token) => {
        window.localStorage.setItem('token', token)
      }


    return (
        <AuthContext.Provider value={{
            user,
            authenticated, 
            setAuthenticated ,
            logout,
            login,
            setToken,
            personnel,
            loading,
            budget,
            grade,
            matiere,
            fonctionRole,
            detailCorrection,
            loggednUser,  
            etablissement,
            typedePaiement,
            addBudgetItem,
            juries,
            addJuryItem,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export  const Usercontext=()=>useContext(AuthContext)
export default AuthContext;
