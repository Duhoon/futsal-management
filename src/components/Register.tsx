import { useState } from "react";
import './register.scss';

export default function Rank(){
  const [ player, setPlayer ] = useState<string>('');

  return (
    <div className='register-form-warpper'>
      <form className='register-form'>
        <label className='register-label' htmlFor='register-input'>이름</label>
        <input 
          onChange={(e)=>{setPlayer(e.target.value)}}
          className='register-input' 
          id='register-input' 
          value={player}
        />
      </form>
      <div className='button-group'>
        <button className='btn-secondary' role='button'>초기화</button>
        <button className='btn-primary' role='button'>출석</button>
      </div>
    </div>
  )
}