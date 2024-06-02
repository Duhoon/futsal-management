import './table.scss';

interface TableProps {
  header?: string[],
  rows?: any[],
}

export default function Table ({header, rows}: TableProps){
  return (
    <div className='list-table-wrapper'>
      <h1 className='list-table-title'>팀 1</h1>
      <ul className='list-table'>
        <li className='list-table-row list-table-header'>
          <dt className='list-table-index'>번호</dt>
          <dd className='list-table-value'>이름</dd>
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