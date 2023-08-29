
import React,{useState} from "react";
import './../styles/App.css';
import axios from "axios";
import 'regenerator-runtime/runtime'

const App = () => {
  let [error,Seterror]=useState('')
  let [data,Setdata]=useState('')
  let [movies,Setmovies]=useState([])
  async function getdata(){
    try{
      let res=  await axios.get(`http://www.omdbapi.com/?s=${data}&apikey=105c5568`)
    console.log(res.data)
    if(res.data.Response=='True'){
      Setmovies(res.data.Search)
      Seterror('')
    }
    else{
      Seterror('Invalid movie name. Please try again.')
      Setmovies([])
    }
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Search Movie</h1>
      <input type='text' onChange={(event)=>{
        Setdata(event.target.value)
        Seterror("")
      }}></input>
      <button onClick={getdata}></button>
      {error && <div>Movie Not found</div>}
      { movies && <div> {movies.map(element=>{
          return (
            <li>
              <div>{element.Title}</div>
              <img src={element.Poster}></img>
            </li>
          )
        })}
        </div>}
    </div>
  )
}

export default App
