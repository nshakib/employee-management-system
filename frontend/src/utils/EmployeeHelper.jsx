import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
        name: "S No",
        selector:(row) =>row.sno
  },
  {
        name: "Employee Name",
        selector:(row) =>row.name,
        sortable: true,
  },
  {
        name: "Action",
        selector:(row) =>row.action
  },
]

export const fetchDepartments = async () => {
      let departments = [];
      try {
        const response = await axios.get("http://localhost:5001/api/department",{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (response.data.success){
          departments = response.data.departments
        }

      } catch (error) {
        if(error.response && !error.response.data.success)
          {
              alert(error.response.data.error)
          }
      }
      return departments;
    }

    export const EmployeeButtons = ({Id, onDepartmentdelete}) =>{
      const navigate = useNavigate()

            const handleDelete = async (id) =>{
            const confirm = window.confirm('Are you want to delete')
            
            if(confirm){
            try {
                 
                  const response = await axios.delete(
                    `http://localhost:5001/api/employee/${id}`,
                    {
                    headers:{
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }, 
                  })
                  if (response.data.success){
                        onDepartmentdelete(id);
                  }
                  else {
                        alert("Failed to delete department.");
                      }
            } catch (error) {
                  if(error.response && !error.response.data.success)
                    {
                        alert(error.response.data.error)
                    }
                }
            }
      }
      return(
            <div className="flex space-x-3">
                  <button className="px-3 py-1 bg-teal-600 text-white"
                  onClick={()=>navigate(`/admin-dashboard/employee/${Id}`)}
                  >Edit</button>
                  <button className="px-3 py-1 bg-red-600 text-white"
                  onClick={() =>handleDelete(Id)}
                  >Delete</button>
            </div>
      )
}