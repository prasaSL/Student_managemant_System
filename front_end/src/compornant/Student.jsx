import axios from 'axios';
import {useEffect, useState } from "react";

function Student()
{
  const [id, setId] = useState('');
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [students, setStudents] = useState([]);

useEffect(() => {
  (async () => await Load())();
  }, []);

  async function  Load()
  {
     const result = await axios.get(
         "http://127.0.0.1:8000/api/student");
         setStudents(result.data);
         console.log(result.data);
  }
 
    
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://127.0.0.1:8000/api/student",
        {
        
          name: name,
          address: address,
          phone: phone
        
        });
          alert("Student Registation Successfully");
          setId("");
          setName("");
          setAddress("");
          setPhone("");
          Load();
        
        }
    catch(err)
        {
          alert("Student Registation Failed");
        }
   }
   async function editStudent(students)
   {
    setName(students.name);
    setAddress(students.address);
    setPhone(students.phone); 
 
    setId(students.id);
    
   }



   async function DeleteStudent(id)
   {
       
        await axios.delete("http://127.0.0.1:8000/api/student/" + id); 
        alert("Student deleted Successfully");
        Load();
   
   }



   async function update(event)
   {
    event.preventDefault();

   try
       {
        
        await axios.put("http://127.0.0.1:8000/api/student/"+ students.find(u => u.id === id).id || id,
       {
         id: id,
         name: name,
         address: address,
         phone: phone
       
       });
         alert("Registation Updateddddd");
         setId("");
         setName("");
         setAddress("");
         setPhone("");
         Load();
       
       }
   catch(err)
       {
         alert("User Registation Failed");
       }
  }

  return (
    <div className='p-5 bg-light'>
    <div className='text-center'>
       <h1>Student Details</h1></div>
       <div className="container" >
          <form>
              <div className="form-group">
               <input  type="text" className="form-control" id="student_id" hidden
               value={id}
               onChange={(event) =>
                {
                  setId(event.target.value);      
                }}
               
               />
               
                <label  htmlFor="studentName" >Student Name</label>
                <input  type="text" className="form-control" id="studentName"
                value={name}
                onChange={(event) =>
                  {
                    setName(event.target.value);      
                  }}
                />
              </div>
              <div className="form-group">
                <label>Student Address</label>
                <input  type="text" className="form-control" id="studentAddress" 
                 value={address}
                  onChange={(event) =>
                    {
                      setAddress(event.target.value);      
                    }}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="text" className="form-control" id="studentPhone" 
                  value={phone}
                onChange={(event) =>
                  {
                    setPhone(event.target.value);      
                  }}
                />
              </div>

                 <div>
              <button   className="btn btn-primary mt-4 m-1"  onClick={save}>Register</button>
              <button   className="btn btn-warning mt-4 m-1"  onClick={update}>Update</button>
              </div>   
            </form>
          </div>
<div>
    <br/>

<table className="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">Student Id</th>
      <th scope="col">Student Name</th>
      <th scope="col">Student Address</th>
      <th scope="col">Student Phone</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
    {students.map(function fn(student) {
        return (
            <tbody key={student.id}>
                <tr>
                    <th scope="row">{student.id}</th>
                    <td>{student.name}</td>
                    <td>{student.address}</td>
                    <td>{student.phone}</td>
                    <td>
                        <button type="button" className="btn btn-warning" onClick={() => editStudent(student)}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => DeleteStudent(student.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    })}
            </table>
       </div>
       </div>
            );
        }
 
export default Student;