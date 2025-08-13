import React, { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [aadNo, setAadNo] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [showOtpField, setShowOtpField] = useState<boolean>(false);
  const [otp, setOtp] = useState<number>(0);
  const changeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name == 'aadhar'){
      setAadNo(parseInt(e.target.value));
    }else if(e.target.name == 'name'){
      setName(e.target.value);
    }else{
      setOtp(parseInt(e.target.value));
    }
  }

  const adNoSubmitHandeler = async(e: React.MouseEvent) => {
    const response = await axios.post('http://localhost:8080/scrpe', {
      "aadharNo": aadNo,
      "name": name
    })
    if(response.data.success){
      setShowOtpField(true);
    }else{
      window.alert(response.data?.message);
    }
    e.preventDefault();
  }

  const otpAdSubmitHandeler = async(e:React.MouseEvent) => {
    const response = await axios.post('http://localhost:8080/aadharOtp', {
      "otp": otp,
      "name": name
    })
    console.log(response.data);
    e.preventDefault(); 
  }

  return (
    <div className='text-3xl'>
      <input name={'aadhar'} type='number' onChange={changeHandeler} className='text-xl text-black bg-blue-200 rounded-lg' placeholder='Aadhar no' ></input> 
      <input name={'name'} type='text' onChange={changeHandeler} className='text-xl text-black bg-blue-200 rounded-lg' placeholder='Name' ></input> 
      <br></br>
      <button onClick={adNoSubmitHandeler} className='bg-black text-white rounded-lg p-2 text-lg'>Submit</button>
      <br></br>
      {
        showOtpField && (
          <>
            <input name={'otp'} type='number' onChange={changeHandeler} className='text-xl text-black bg-blue-200 rounded-lg' placeholder='Aadhar no' ></input>
            <br></br>
            <button onClick={otpAdSubmitHandeler} className='bg-black text-white rounded-lg p-2 text-lg'>submit</button>
          </>
        )
      }
    </div>
  )
}

export default App
