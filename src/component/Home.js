import React,{useState,useEffect,useRef} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Search from './Search';

export default function Home(){
    const [textColor, setTextColor] = useState('black');
    const [spinner, setSpinner] = useState(true);
    const [textClass, setTextClass] = useState('');    
    const mode = useRef()
    const con = useRef()
    const text = useRef()
    const moon = useRef()
    const [card,setcard] = useState('white') 
    const input = useRef()
    const inputy = useRef()
    const svg = useRef()
    const num = useRef()
    const where = useRef()
    const [data,setdata] = useState([])
    const [search,setsearch] = useState()
    const navigate = useNavigate()
    function handleSearch(e){
      const value = e.target.value;
      setsearch(value)
    }
    function handleSubmit(){
      navigate(`/country/${search}`)
    }
    async function handleChange(e){
      const value = await e.target.value;
      navigate(`/region/${value}`);
      console.log(value)
    }
    async function get(){
         await axios.get('https://restcountries.com/v3.1/all')
         .then((data) => {
          console.log(data.data);
          setSpinner(false)
          setdata(data.data);

        })


    }
    let DarkmodeStatus = false
    function handleClick(){
      if (DarkmodeStatus === false){
        mode.current.style.backgroundColor ='hsl(207, 26%, 17%)';
        num.current.style.color = 'white';
        where.current.style.color = 'white';
        moon.current.style.color = 'white';
        setcard('hsl(209, 23%, 22%'); 
        input.current.style.backgroundColor = 'hsl(209, 23%, 22%)';
        con.current.style.backgroundColor = 'hsl(209, 23%, 22%)';
        inputy.current.style.backgroundColor = 'hsl(209, 23%, 22%)';
        text.current.style.backgroundColor = 'hsl(209, 23%, 22%)';
        input.current.style.color = 'white';
        svg.current.style.color = 'white';
        inputy.current.style.color = 'white';
        text.current.style.color = 'white';
        setTextColor('white');
        setTextClass('class');
      


        DarkmodeStatus = true
      }else if(DarkmodeStatus === true){
        mode.current.style.backgroundColor ='';
        num.current.style.color = '';
        where.current.style.color = '';
        moon.current.style.color = '';
        inputy.current.style.color = '';
        text.current.style.color = '';
        setcard('white')
        input.current.style.backgroundColor = '';
        input.current.style.color = '';
        inputy.current.style.backgroundColor = '';
        text.current.style.backgroundColor = '';
        svg.current.style.color = '';
        con.current.style.backgroundColor = '';
        setTextColor('black')
        setTextClass('non_class')
      

        DarkmodeStatus = false
      }
    }
    useEffect(() => {
      get();

    }, []); 
  
  return (
    <div className="full" ref={mode}>
      <div className="container" ref={con}>
        <h2 className='where' ref={where}>where in the world?</h2>
      <div>
      <div className="mode" ref={num}>
        <label htmlFor='mode1'><button ref={moon} onClick={handleClick}><i class="fa-solid fa-moon"></i></button> Dark mode</label>
      </div>
    </div>
    </div>
    <main className="main">
      <div className="container1">
    <form onSubmit={handleSubmit}>
      <div className="search" ref={inputy}>
          <label ><i ref={svg} className="fa-solid fa-magnifying-glass"></i></label>
        
          <input className={textClass} type="text" ref={text} placeholder="Search for a country..." onChange={handleSearch} />
        </div>
        </form>
      <select onChange={handleChange} ref={input}>
        <option>
          select region
        </option>
        <option>
          Africa
        </option>
        <option>
          Asia
        </option>
        <option>
          Europe
        </option>
        <option>
          Oceania
        </option>
        <option>
          North America
        </option>       
        <option>
          South America
        </option>       
        <option>
        Antarctica
        </option>        
      </select>
      </div>
    </main>
    <div className="con_cards">
      {spinner ? <Search/> : ""}
    { data.map((country)=>{  
      return(                  
    <div className="card"  style={{color:textColor,background:card}} >
      <div className="card-img">
          <img src={country.flags.png} alt="" />
      </div>
      <div className="card-body"  >
          <div className="card-title" >
             <h3 >
              <Link style={{color:textColor}} to={'country/' + country.name.common}>{country.name.common}</Link>
             </h3> 
          </div>
          <div className="card-items">
              <h5>Population:{country.population.toLocaleString("en-US")} </h5>
              <h5>Region: {country.region}</h5>
              <h5>Capital:{country.capital}</h5>
          </div>
      </div>   
  </div>)
})
            
}
 </div>
 </div>
   
  )
}
