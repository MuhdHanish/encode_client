import React from 'react'
import { User } from '../../../../dtos/User';

interface StudentTableProps {
  students: User[]
}

const StudentTable:React.FC<StudentTableProps> = ({students}) => {
  return (
    <div className="flex h-full w-full mt-5 ">
      <div className="w-full mx-10 h-full overflow-x-auto mb-10">
        <table className="w-full  text-sm text-center text-gray-500 dark:text-gray-400 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr
                key={idx}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {idx + 1}
                </th>
                <td className="px-6 py-4">{student?.username}</td>
                <td className="px-6 py-4">{student?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable