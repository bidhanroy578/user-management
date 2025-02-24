import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const AllUser = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUsers(data)
            })
    }, [])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00f700",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0)
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success" ,
                                confirmButtonColor: "#00f700",
                            });
                        setUsers(users.filter(user => user._id !== id))
                    })
            }
        });
    }


    return (
        <div className=' max-w-7xl px-16 mt-16 space-y-8 '>
            <Link to='/new-user' className='flex w-fit items-center gap-2 bg-green-100 px-5 py-2 rounded hover:scale-105 active:scale-95 transition-[scale]'>New User <FaUser /></Link>
            <table className='table-auto w-full text-center'>
                <thead>
                    <tr>
                        <th className='leading-16'>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user._id}>
                                <td className='leading-10'>1</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td>
                                    {/* onClick={()=>handleEdit(user._id)} */}
                                    <Link to={`/edit-user/${user._id}`} className='bg-green-100 px-3 py-1 rounded hover:scale-105 active:scale-95 transition-[scale]'>Edit</Link>
                                    <button onClick={() => handleDelete(user._id)} className='bg-red-100 px-3 py-1 rounded hover:scale-105 active:scale-95 transition-[scale]'>Delete</button>
                                </td>
                            </tr>
                        )}

                </tbody>
            </table>
        </div>
    );
};

export default AllUser;