import { FaTshirt } from 'react-icons/fa';
import './table.scss';

interface TableProps {
  index: number,
  header: string[],
  rows: any[],
}

export default function Table ({index, header, rows}: TableProps){
  return (
    <div className='list-table-wrapper'>
      <div className='list-table-head'>
        <h1 className='list-table-title'>팀 {index}</h1>
        <FaTshirt className='list-table-color'/>
      </div>
      <ul className='list-table'>
        <li className='list-table-row list-table-header'>
          <dt className='list-table-index'>{header[0]}</dt>
          <dd className='list-table-value'>{header[1]}</dd>
        </li>
        { rows.map((row, index)=>{
          return(
            <dl className='list-table-row'>
              <dt className='list-table-index'>{index + 1}</dt>
              <dd className='list-table-value'>{row}</dd>
            </dl>
          )
        })}
      </ul>
    </div>
  )
}