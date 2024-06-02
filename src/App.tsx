import { useState } from 'react';

import Rank from './components/Register';
import Table from './components/Table'
import Logo from './components/Logo';
import Board from './components/Board';

import { Team } from './types/team.type';
import { TeamsDummy, PlayerDummy } from './constants/player.dummy';

import './App.scss'

function App() {
  const [teams, setTeams] = useState<Team[]>(TeamsDummy);
  const header = ['번호', '이름']

  return (
    <>
      <Logo/>
      <Rank></Rank>
      <Board>
        {teams.map((team, index)=>(
          <Table index={index + 1} header={header} rows={team.player} />
        ))}
      </Board>
      
    </>
  )
}

export default App
