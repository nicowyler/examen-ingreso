import { useRef, useState } from 'react'
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
  const newCountyRef = useRef<HTMLInputElement>(null);

  const changeSelection = (id: number, selected: boolean) => {
    selectedCountires.forEach((c) => c.id === id ? c.selected = !selected : null);
    setSelectedCountires([...selectedCountires]);
    checkAll();

  }

  const checkAll = () => {
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

  const handelAddNewCountry = () => {
    if (newCountyRef.current) {
      const newCountry = newCountyRef.current.value;
      if (newCountry) {
        setSelectedCountires([...selectedCountires, { id: selectedCountires.length + 1, label: newCountry, selected: false }]);
        newCountyRef.current.value = '';
        setSelectAll(false);
      }
    }
  }

  return (
    <main className='w-screen h-screen flex justify-center items-center bg-slate-100'>
      <div className='w-96 h-fit flex flex-col rounded-lg overflow-hidden shadow-lg'>
        <span className='text-xl text-center bg-gray-600 text-white p-2 px-20'>
          <p>
            Examen de Ingreso
          </p>
          <p className='text-sm'>( Full Stack Senior React )</p>
        </span>

        <div className='w-full h-fit flex flex-col bg-gray-300 py-4 p-14'>
          <label htmlFor="newCounty">Agrega un Pais</label>
          <div className='flex items-center mt-4'>
            <input id="newCounty" type="text" className='w-full p-2 rounded-md mr-2' ref={newCountyRef} />
            <button className='w-10 h-10 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-600/70 hover:text-white/70' onClick={handelAddNewCountry}>+</button>
          </div>

          <p className='mt-6 mb-2'>Selecciona tu pais:</p>
          <label htmlFor='selectAll' className='p-1 cursor-pointer w-fit'>
            <input className='mr-2' id='selectAll' checked={selctAll} type="checkbox" onChange={handleSelectAll} />
            Select All
          </label>
          {selectedCountires.map(({ id, label, selected }) => (
            <label key={id} htmlFor={`${id}`} className='p-1 cursor-pointer w-fit'>
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
