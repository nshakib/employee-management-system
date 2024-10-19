import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([])

  useEffect(()=>{
    const fetchEmployees = async() => {
      setDepLoading(true); 
      try {
        const response = await axios.get("http://localhost:5001/api/employee",{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (response.data.success){
          let sno = 1;
          const data = await response.data.employees.map((emp)=>(
            
            {
              _id: emp._id,
              sno: sno++,
              name: emp.userId.name,         // Use proper employee fields
              department: emp.department,
              designation: emp.designation,
              action: (<EmployeeButtons Id={emp._id} />)
              

            }
            
          ));
          console.log(response.data.employees);
          setEmployees(data)
          setFilteredEmployees(data)   
          
        }
      } catch (error) {
        if(error.response && !error.response.data.success)
          {
              alert(error.response.data.error)
          }
      }finally{
        setDepLoading(false)
      }
    }
    fetchEmployees();
  },[])

  const filterEmployees = (e) => {
    const records = employees.filter((emp)=>emp.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredEmployees(records);
  }

  return (
    <>
    {depLoading ? <div>Loading ....</div>:
    <div className='p-6'>
      <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Employees</h3>
        </div>

        <div className='flex justify-between items-center'>
            <input 
            type="text" 
            placeholder='Search by employee Name' 
            className='px-4 py-0.5 border'
            onChange={filterEmployees}
            
            />
            <Link 
              to="/admin-dashboard/add-employee" 
              className='px-4 py-1 bg-teal-600 rounded text-white'>
              Add New Employee
            </Link>
        </div>

        <div className='mt-5'>
        {employees.length === 0 ? (
              <div>There are no records to display.</div> // Show this when no departments
            ) : (
              <DataTable
                columns={columns}
                 data={filteredEmployees}
                pagination
              />
            )}
        </div>
    </div>
    }</>
  )
}

export default List;
