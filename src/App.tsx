import {  useEffect, useState } from 'react'
import './App.css'
import { CiSearch } from "react-icons/ci";

function App() {

  type RepoTypes = {
    id: number,
    name: string,
    isliked: boolean
  }

  const [searchRepo, setSearchRepo] = useState('')

  const [repos, setRepos] = useState<RepoTypes[]>([])

  // useEffect(() => {
  //   fetch(`https://api.github.com/users/rBrun0/repos`).then((res) => res.json()).then((res) => {
  //     setRepos(res)
  //     console.log(repos)
  //   })
  //   }, [])


  function requestRepo() {
    if(searchRepo){
      fetch(`https://api.github.com/users/${searchRepo}/repos`).then((res) => res.json()).then((res) => {
        setRepos(res)
        console.log(repos)
      })
    }
  }

  function toggleLike(id: number) {
    setRepos(repos.map((repo) => repo.id === id? {...repo, isliked:!repo.isliked} : repo))
  }

  return (
    <>
    <header className='bg-black flex items-center justify-center text-white'>
      <h1 className=' text-4xl p-4'> <span className='text-red-500 mr-3'>GIT</span> REPOSITORY</h1>

      <div className='relative flex space-x-4'>
      <input type="text" className='bg-transparent border-b-2 border-b-rose-300 outline-none' value={searchRepo} onChange={(e) => setSearchRepo(e.target.value)}/>
      <CiSearch className='absolute left-[-17px] bottom-2 text-rose-300 font-bold'/>
      <button className='bg-rose-500 p-1 rounded-md hover:bg-rose-600' onClick={requestRepo}>buscar</button>
      </div>
    </header>

    <main className='flex flex-wrap px-4 space-x-2 space-y-2 justify-center'>
      {
        repos && repos.map((repo) => (
          <div key={repo.id} className='w-full max-w-sm bg-white rounded-md shadow-md p-6'>
            <h2 className='text-xl font-bold'>{repo.name}</h2>
            <p>Link: <a href={`https://github.com/${searchRepo}/${repo.name}`} target='_blank' rel='noopener noreferrer'>{`https://github.com/${searchRepo}/${repo.name}`}</a></p>
            <button className='bg-red-400 text-white px-2 rounded-md hover:bg-red-600' onClick={() => toggleLike(repo.id)}>{repo.isliked ? 'descurtir' : 'curtir'}</button>
          </div>
        ))
      }

    </main>

      <h1 className='mt-14 flex justify-center text-4xl'>REPOSITORIOS CURTIDOS</h1>

      <section className='flex flex-wrap px-4 space-x-2 space-y-2 justify-center'>
      {
        repos && repos.filter((repo) => repo.isliked).map((repo) => (
          <div key={repo.id} className='w-full max-w-sm bg-white rounded-md shadow-md p-6'>
            <h2 className='text-xl font-bold'>{repo.name}</h2>
            <p>Link: <a href={`https://github.com/${searchRepo}/${repo.name}`} target='_blank' rel='noopener noreferrer'>{`https://github.com/${searchRepo}/${repo.name}`}</a></p>
            <button className='bg-red-400 text-white px-2 rounded-md hover:bg-red-600' onClick={() => toggleLike(repo.id)}>descurtir</button>
          </div>
        ))
      }
      </section>
    </>
  )
}

export default App
