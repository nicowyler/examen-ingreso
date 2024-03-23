import { useEffect, useState } from 'react'
import { countiesType } from './types'
import './App.css'

const countires: countiesType[] = [
  {
    id: 1,
    label: 'India',
    selected: false,
  },
  {
    id: 2,
    label: 'USA',
    selected: false,
  },
  {
    id: 3,
    label: 'France',
    selected: false,
  }
]

function App() {
  const [selectedCountires, setSelectedCountires] = useState<countiesType[]>(countires);
  const [selctAll, setSelectAll] = useState(false);

  const changeSelection = (id: number, selected: boolean) => {
    selectedCountires.forEach((c) => c.id === id ? c.selected = !selected : null);
    setSelectedCountires([...selectedCountires]);

    if (selectedCountires.every((c) => c.selected)) {
      setSelectAll(true);
    } else if (selectedCountires.some((c) => c.selected)) {
      setSelectAll(false);
    }
  }

  const handleSelectAll = () => {
    setSelectAll(!selctAll)
    selectedCountires.map((c) => c.selected = !selctAll);
    setSelectedCountires([...selectedCountires])
  }

  return (
    <main className='w-screen h-screen flex justify-center items-center bg-slate-100'>
      <div className='w-1/2 h-fit flex flex-col rounded-lg overflow-hidden shadow-lg'>
        <span className='text-xl text-center bg-gray-600 text-white p-2 px-20'>
          <p>
            Examen de Ingreso
          </p>
          <p className='text-sm'>( Full Stack Senior React )</p>
        </span>

        <div className='w-full h-fit flex flex-col bg-gray-300 py-4 p-20'>
          <p className='py-2'>Selecciona tu pais:</p>
          <label htmlFor={`selectAll`} className='p-1 cursor-pointer'>
            <input className='mr-2' id="selectAll" checked={selctAll} type="checkbox" onChange={handleSelectAll} />
            Select All
          </label>
          {selectedCountires.map(({ id, label, selected }) => (
            <label key={id} htmlFor={`${id}`} className='p-1 cursor-pointer'>
              <input className='mr-2' id={`${id}`} checked={selected} type="checkbox" onChange={() => changeSelection(id, selected)} />
              {label}
            </label>
          ))}
        </div>
      </div>
    </main>
  )
}

export default App;
