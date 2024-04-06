import styled from 'styled-components';
 
export const Container = styled.div`
  /* Assuming body styles are global, not including them here */
`;
 
export const DivWrapp = styled.div`
  margin: 0 auto;
`;
 
export const BlmdWrapp = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 20px;
  height: auto;
  margin-top: 10vh;
  background: #fff;
  padding: 1em 0;
  position: relative;
  transition: height 0.5s;
 
  padding: 15px;
  height: auto;
  overflow: hidden;
`;
 
export const BlmdContiner = styled.div`
  padding: 15px;
  height: auto;
  overflow: hidden;
 
  max-height: auto;
  transition: all 0.5s;
 
  padding: 15px 0 15px 30px;
  margin-right: 15px;
  margin-left: -30px;
  position: relative;
  color: #3f51b5;
 
`;
 
 
export const form=styled.form`
max-height: auto;
transition: all 0.5s;
 
 
`;
export const BlmdForm = styled.div`
  margin: 3rem 0;
  position: relative;
  width: 100%;
`;
 
export const BlmdLine = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;
  vertical-align: top;
`;
 
export const FormInput = styled.input`
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  padding: 0;
`;
 
export const BtnSubmit = styled.button`
  width: 85%;
  border-radius: 20px;
  margin-left: 18px;

  display: inline-flex;
  justify-content: center; 
  align-items: center;
`;
  
export const DivInputWrapp = styled.div`
  padding-left: 15px;
`;
 
export const Inp = styled.div`
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
  border-radius: 3px;
  overflow: hidden;
`;
 
export const H1 = styled.h1`
  text-align: center;
  padding: 15px 0 15px 30px;
  margin-right: 15px;
  margin-left: -30px;
  position: relative;
  color: black;
 
  border-left: 17px solid black;
`;
export const ErrorMsg = styled.div`
  color: #D8000C;
  background-color: #FFD2D2;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #D8000C;
  text-align: center;
  font-size: 0.9rem;
`;