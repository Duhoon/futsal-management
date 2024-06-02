import { ReactNode } from "react"
import './board.scss';

interface BoardProps {
  children: ReactNode
}

export default function Board({children}: BoardProps){
  return(
    <div className='board'>
      {children}
    </div>
  )
}