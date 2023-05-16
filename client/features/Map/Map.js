import React, { useEffect, } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { runGpt} from "./MapSlice";

// <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3526.043352464805!2d-82.75223048870845!3d27.90064291683931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2fab8dda3a927%3A0xc29010392a0e6fa!2s1685%20Coral%20Way%20b%2C%20Largo%2C%20FL%2033771!5e0!3m2!1sen!2sus!4v1683774309076!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
//     Los%20Angeles%20CA -->
// <!-- 
//     give me all the movie locations of jurassic park and explain what was shot there in this format:             Location - Description (End)
//     https://platform.openai.com/playground -->
//     <!-- https://www.google.com/maps/place//@21.3982137,-158.0469447,10.67z -->
//     <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d299541.7993222058!2d-158.04694465273948!3d21.398213747602618!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sus!4v1683777597486!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>  -->

//     <!-- https://www.google.com/maps/place//@21.3982137,-158.0469447,10.67z -->




export const Map = () => {

    let moviesLocations = useSelector((state) => state.MapSlice.filmLocations);
    

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(runGpt("jurassic Park"))
    console.log("yeahBaby")

  }, [dispatch] );


// let accumulator1 = ['start']
// let gptOutputString =" "

// for (let x of moviesLocations) {
//   for (let y of x){
//     gptOutputString = gptOutputString + y
//     if (y == "$") {
//       accumulator1.push(gptOutputString)
//       gptOutputString = ""
//   }
//   }}

//   console.log(accumulator1)
console.log(moviesLocations)
let accu = []
console.log(JSON.stringify(moviesLocations))
let jkl = JSON.stringify(moviesLocations)
for (let x of jkl){
for (let y of x){
  accu.push(y.charCodeAt())
}}

console.log(accu)
console.log(accu.filter((x) => x !== 92))
let dark = accu.filter((x) => x !== 92)
console.log(dark)

let results = ""
let num2 = 0

dark.splice(1,1)
dark.splice(dark.length-1,1)

for (let x of dark){ 
//   for (let y of x)
// {
  // results = results + String.fromCharCode(x)
    // results = results + String.fromCharCode(accu[num2])
    // results = results + String.fromCharCode(accu.filter((x) => x !== 92)[num2])
    results = results + String.fromCharCode(dark[num2])

    num2++
// }
}
// results = results.slice
results = results.replace(`["`,"[").replace(`"]`,"]").replace('nn',"")
console.log(results)

let num3 = ""
let num4 = []
let num10 = 0
for (let x of results){
   if (x == "{" || num10 == 1){
      num10 = 1
    num3 = num3 + x
   }
   if (x == "}"){
    num10 = 0
    num4.push(num3)
    num3 = ""
   }
}
// \ num4 = num4.replace(`"{`,"{").replace(`}"`,"}").replace('nn',"")
console.log(num4)
// console.log(num4[0].Locations)

// console.log(JSON.parse(results))

// console.log(results)'
// console.log(JSON.parse(JSON.stringify(num4)))
let jsonArray = num4.map(str => JSON.parse(str.replace(/'/g, '"')));
console.log(jsonArray)
console.log(jsonArray[0])
let test = JSON.parse('{ "hello":"world" }')
console.log(test)

  return (
    <div className ="text-white">
    <p>Map</p>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d299541.7993222058!2d-158.04694465273948!3d21.398213747602618!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sus!4v1683777597486!5m2!1sen!2sus"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe> 

<div className="flex-1">
<div className="form-control text-white">
  <label className="label cursor-pointer text-white">
    <span className="label-text text-white">Red pill</span> 
    <input type="radio" name="radio-10" className="radio checked:bg-red-500 text-white" checked />
  </label>
</div>
<div className="form-control">
  <label className="label cursor-pointer text-white">
    <span className="label-text text-white">Blue pill</span> 
    <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked />
  </label>
</div>
<div className="form-control">
  <label className="label cursor-pointer text-white">
    <span className="label-text text-white">Blue pill</span> 
    <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked />
  </label>
</div>
</div>

<p>{moviesLocations}cool</p>
{moviesLocations.map((movie) => (
        
            <p key={1}>{movie.Location}</p>
                  
          
        ))}







    
      
      </div>
  )
}


export default Map;
