import React from 'react'

const AddDepartment = () => {
  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md  w-96'>
      <h2 className='text-2xl font-bold mb-6'>Add Department</h2>
      <form>

        <div>
          <label htmlFor="dep_name"
          className='text-sm font-medium text-gray-700'
          >
            Department Name
        </label>
          <input 
          type="text" 
          placeholder="Enter Department Name" 
          className='mt-1 w-full p-2 border border-gray-300 rounded-md'
          required
          />
        </div>

        <div className='mt-3'>
          <label htmlFor="description"
          className='block text-sm font-medium text-gray-700'
          >
            Description
        </label>
          <textarea 
          name="description" 
          placeholder="Description"
          className='mt-1 w-full p-2 border border-gray-300 rounded-md'
          rows="4"
          >
          </textarea>
          <button 
          type='submit'
          className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded'
          >Add Department</button>
        </div>
      </form>
    </div>
  );
}

export default AddDepartment