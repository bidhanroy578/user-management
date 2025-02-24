import { FaAngleDoubleLeft } from "react-icons/fa";
import { Link } from "react-router";
import Swal from 'sweetalert2'
const NewUser = () => {

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
            confirmButtonText: "Yes, create it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://user-management-server-lyart.vercel.app/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId)
                            Swal.fire({
                                title: "Created!",
                                text: "New user has been Created.",
                                icon: "success",
                                confirmButtonColor: "#00f700",
                            })
                    })
            }
        })
    }

    return (
        <div className=' max-w-7xl md:px-16 mt-16 space-y-8 '>
            <Link to='/' className=' w-fit flex items-center gap-2 bg-green-100 px-5 py-2 rounded hover:scale-105 active:scale-95 transition-[scale]'><FaAngleDoubleLeft /> All Users</Link>
            <div className="text-center">
                <h3 className=" text-3xl font-medium">New User</h3>
                <p>Use the form bellow to create a new user</p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-[70%] mx-auto">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" placeholder="Name" className="mt-1 block w-full border border-slate-200 rounded focus:outline-green-300 px-2 py-1" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="text" name="email" placeholder="Email" className="mt-1 block w-full border border-slate-200 rounded focus:outline-green-300 px-2 py-1" required />
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

export default NewUser;