import './App.css'
import {useState,useEffect} from 'react';

function App() {
  const [time,setTime] = useState({minutes:`00`,seconds:`00`})
  const [id,setId] = useState();
  const [flag,setFlag] = useState();
  const alerm = document.getElementById("alerm");  
  window.document.title = `${time.minutes} : ${time.seconds} - Time to focus!`


  function settingtime(){
    if(time.minutes <= 0){
      console.log("Please Set The Time");
    }else{
      setFlag(true)
      const intervalid = setInterval(()=>{
        setTime((prev) => ({...prev,seconds:prev.seconds-1}))
      },1000);
      
      setId(intervalid)
    }
  }

  function stoptimer(){
    setFlag(false)
    clearInterval(id)

  }


  function resetSecond(){
    clearTimeout(id);
    setTime((prev) => ({...prev,seconds:prev.seconds + 60}))
    setTime((prev) => ({...prev,minutes:prev.minutes - 1}))
    settingtime()
  }
  
  
  useEffect(()=>{
    if(time.seconds < 0){
      resetSecond()
    }else if(time.minutes === 0 && time.seconds === 0){
      const alerm = new Audio("./alerm/MV27TES-alarm.mp3").play();
      
      stoptimer();
    }
  },[time.seconds,time.minutes])



  return (
    <div className="App">
      <audio controls  style={{"width":"0"}}>
        <source id="alerm" src="./alerm/MV27TES-alarm.mp3" type="audio/ogg" />
      </audio>
      {
        flag ? <button style={{"backgroundColor":"red","color":"white","fontWeight":"bold"}} onClick={stoptimer}>PAUSE</button> :<button
        style={{"backgroundColor":"green","color":"white","fontWeight":"bold"}}
        onClick={settingtime}>Start</button>
      }
      <div>
        {
          flag ? "" : <div style={{"padding":"1rem"}}><label htmlFor="Enter Number"></label><input type="number" name="" id="" style={{"width":"80px","padding":"0.8rem","outline":"none","fontSize":"1.2rem","fontWeight":"bold","border":"none","backgroundColor":"beige","borderRadius":"15px"}} onChange={(e)=> setTime((prev) => ({...prev,minutes:e.target.value}))}/></div>
        }
      </div>
      <h1>{time.minutes+":"+time.seconds}</h1>
    </div>
  )
}

export default App
