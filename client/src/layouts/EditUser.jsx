import { useEffect, useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Link, useParams } from "react-router";
import Swal from "sweetalert2";

const EditUser = () => {
    const { id } = useParams()
    // console.log(id)
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setUser(data)
            })
    }, [id])
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value;
        const email = form.email.value;
        const gender = form.gender.value;
        const status = form.status.value;
        const newUser = { name, email, gender, status }
        // console.log(newUser)
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00f700",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/users/${id}`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0)
                            Swal.fire({
                                title: "Updated!",
                                text: "User data has been updated",
                                icon: "success",
                                confirmButtonColor: "#00f700",
                            });
                            if( data.modifiedCount == 0 ) {
                                Swal.fire({
                                    title: "Not Updated!",
                                    text: "same data provided",
                                    icon: "error" , 
                                    confirmButtonColor: "#f60002",
                                });
                            }
                    })
            }
        });
    }
    return (
        <div className=' max-w-7xl px-16 mt-16 space-y-8 '>
            <Link to='/' className=' w-fit flex items-center gap-2 bg-green-100 px-5 py-2 rounded hover:scale-105 active:scale-95 transition-[scale]'><FaAngleDoubleLeft /> All Users</Link>
            <div className="text-center">
                <h3 className=" text-3xl font-medium">New User</h3>
                <p>Use the form bellow to create a new user</p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-[70%] mx-auto">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input defaultValue={user.name} type="text" name="name" placeholder="Name" className="mt-1 block w-full border border-slate-200 rounded focus:outline-green-300 px-2 py-1" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input defaultValue={user.email} type="text" name="email" placeholder="Email" className="mt-1 block w-full border border-slate-200 rounded focus:outline-green-300 px-2 py-1" required />
                </div>
                <div className="flex gap-5">
                    <label className="font-medium text-gray-700">Gender</label>
                    <div>
                        <input type="radio" className="mx-2 accent-green-300" name="gender" id="male" value='male' />
                        <label htmlFor="male">male</label>
                    </div>
                    <div>
                        <input type="radio" className="mx-2 accent-green-300" name="gender" id="female" value='female' />
                        <label htmlFor="female">female</label>
                    </div>
                </div>
                <div className="flex gap-5">
                    <label className="font-medium text-gray-700">Status</label>
                    <div>
                        <input type="radio" className="mx-2 accent-green-300" name="status" id="active" value='active' />
                        <label htmlFor="active">active</label>
                    </div>
                    <div>
                        <input type="radio" className="mx-2 accent-green-300" name="status" id="inactive" value='inactive' />
                        <label htmlFor="inactive">inactive</label>
                    </div>
                </div>
                <input type="submit" value="Save" className="mt-4 w-full font-bold flex items-center gap-2 bg-green-100 px-5 py-2 rounded hover:scale-105 active:scale-95 transition-[scale]" />
            </form>
        </div>
    );
};

export default EditUser;