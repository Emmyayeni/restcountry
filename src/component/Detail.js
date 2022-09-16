import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect,useRef} from 'react'
import axios from 'axios'

export default function Detail() {
  const [stylecolor, setstylecolor] = useState('black')
   const mode = useRef()
   const con = useRef()
   const [backe,setbacke] = useState('white')
   const cover = useRef()
  const moon = useRef()
  const back = useRef()
  const num = useRef()
  const where = useRef()
    const {country} = useParams()
    const [data,setdata] = useState([])
    async function fetch(){
         await axios.get(`
         https://restcountries.com/v3.1/name/${country}?fullText=true`)
         .then((data) => {
          setdata(data.data);
          console.log(data.data)

        })
      
    }
    let DarkmodeStatus = false;
    function handleClick(){
      if(DarkmodeStatus === false){
        mode.current.style.backgroundColor ='hsl(207, 26%, 17%)';
        cover.current.style.backgroundColor ='hsl(207, 26%, 17%)';
        cover.current.style.color ='white';
        con.current.style.backgroundColor = 'hsl(209, 23%, 22%)';
        setbacke( 'hsl(209, 23%, 22%)');
        num.current.style.color = 'white';
        where.current.style.color = 'white';
        moon.current.style.color = 'white';
        back.current.style.color = 'white';
        setstylecolor('white')
        
        DarkmodeStatus = true;
        
      }
      else if(DarkmodeStatus === true){
        mode.current.style.backgroundColor ='';
        cover.current.style.backgroundColor ='';
        cover.current.style.color ='black';
        num.current.style.color = '';
        where.current.style.color = '';
        moon.current.style.color = '';
        back.current.style.color = 'black';
        con.current.style.backgroundColor = '';
        setbacke( 'white');
        setstylecolor('black');
        
        DarkmodeStatus = false;

      }
      


      
    }
    useEffect(() => {
      fetch();
    },[country]); 

  return (
    <div className="full" ref={mode}>
        <div className="container "  ref={con}>
        <h2 className='where' ref={where}>where in the world?</h2>
        <div>
        <div className="mode" ref={num}>
         <label htmlFor='mode1'><button ref={moon} onClick={handleClick}><i class="fa-regular fa-moon"></i></button> Dark mode</label>
        </div>
        <input type='checkbox' id="mode1" />
        </div>
    </div>
            { data.map((country)=>{
                return(
                    <div className='cover' ref={cover}>
                      <a href='/' ref={back}  class="back" style={{background:backe}}><i class="fa-solid fa-arrow-left"></i><label className='lab'>Back</label> </a>  
                    <div class="cooon">
                      <img src={country.flags.png} class="flage" alt="" />
                      <div class="first_one">
                        <h2 class="country_name">{country.name.common}</h2>
                        <div class="population">
                          <div className='fist'>Population:</div><div>{country.population.toLocaleString("en-US")}</div>
                        </div> 
                         <div class="Region">
                            <div className='fist'>Region:</div><div>{country.region}</div>
                        </div> 
                         <div class="Sub_Region">
                            <div className='fist'>Sub Region:</div><div>{country.subregion}</div>
                        </div>
                        <div class="capital">
                            <div className='fist'>Capital:</div><div>{country.capital}</div>
                        </div>
                      </div>
                      <div class="secound_one">
                        <div class="top_level">
                            <div className='fist'>Top Level Domain:</div><div>{country.domain}</div>
                        </div>
                        <div class="currency">
                            <div className='fist'>Currencies:</div>
                            <div>{Object.keys(country.currencies).map((key, index) => {return (<div>{country.currencies[key].name.split(',')}</div>)})}</div>
                        </div>
                        <div class="languages">
                            <div className='fist'>Lanuaguages:</div>
                            <div className='lang'>{Object.keys(country.languages).map((key, index) => {
                                return (
                                <div> {country.languages[key].split(',')}</div>
                                );
                              })}</div>
                            </div>
                      </div>
                    <div class="border">
                            <div className='bor fist'>Borders Countries:</div>
                            <div className='lang'>{Object.keys(country.borders).map((key, index) => {
                                return (
                                <div className='backe'  style={{color:stylecolor,background:backe}} > {country.borders[key]}</div>
                                );
                              })}</div>
                            </div>
                    </div>
                              
                </div>
            
                )
                
            })
                
            }   
        </div>
  )
}
