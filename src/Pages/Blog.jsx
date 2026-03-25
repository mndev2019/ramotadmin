import React, { useState } from 'react'
import TopHeader from '../Component/TopHeader'
import SectionTitle from '../Component/SectionTitle'
import FormLabel from '../Component/FormLabel'
import { Base_Url } from '../API/Base_Url'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

const Blog = () => {
    const [data, setData] = useState([])
    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [short_description, setshort_description] = useState("");
    const [description, setdescription] = useState("");
    const [editId, setEditId] = useState(null)

    /* ===============================
      HANDLE FILE
  =============================== */
    // const handlefile = (e) => {
    //     setimage(e.target.files[0])
    // }
    const handlefile = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // const maxSize = 500 * 1024; // 👉 500KB
        const maxSize = 200 * 1024;

        if (file.size > maxSize) {
            toast.error("Please upload file under 500KB");
            e.target.value = null; // input reset
            setimage(null);
            return;
        }

        setimage(file);
    };
    /* ===============================
        GET ALL BLOGS
    =============================== */
    const getBlogs = async () => {
        try {
            const res = await axios.get(`${Base_Url}/blog`)
            setData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getBlogs()
    }, [])

    /* ===============================
        SUBMIT (CREATE / UPDATE)
    =============================== */
    const handlesubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("title", title)
        formData.append("short_description", short_description)
        formData.append("description", description)
        if (image) {
            formData.append("image", image)
        }

        try {
            let resp;
            if (editId) {
                resp = await axios.put(`${Base_Url}/blog/${editId}`, formData)
                // alert("Blog Updated Successfully")
            } else {
                resp = await axios.post(`${Base_Url}/blog`, formData)
                // alert("Blog Created Successfully")
            }

            if (resp.data.success === true) {
                toast.success(resp.data.message || "Blog saved successfully");
                resetForm();
                getBlogs();
            } else {
                toast.error(resp.data.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error)
        }
    }

    /* ===============================
        EDIT
    =============================== */
    const handleEdit = (blog) => {
        setEditId(blog._id)
        settitle(blog.title)
        setshort_description(blog.short_description)
        setdescription(blog.description)
    }

    /* ===============================
        DELETE
    =============================== */
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            const response = await axios.delete(`${Base_Url}/blog/${id}`);

            if (response.data.success === true) {
                toast.success(response.data.message || "Blog deleted successfully");
                getBlogs();
            } else {
                toast.error(response.data.message || "Failed to delete blog");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Server error while deleting"
            );
            console.log(error);
        }
    };

    /* ===============================
        RESET FORM
    =============================== */
    const resetForm = () => {
        settitle("")
        setshort_description("")
        setdescription("")
        setimage(null)
        setEditId(null)
    }
    return (
        <>
            <TopHeader />
            <section className="py-4 px-4">
                <div className="container mx-auto">
                    <SectionTitle title="Blogs" />
                    <form onSubmit={handlesubmit}>
                        <div className='grid grid-cols-3 gap-4 items-baseline-last'>
                            <div>
                                <FormLabel label="Upload Image" />
                                <input
                                    type="file"
                                    onChange={handlefile}
                                    className="border p-2 w-full rounded"

                                />
                            </div>
                            <div>
                                <FormLabel label="Title" />
                                <input
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                            <div>
                                <FormLabel label="Short Description" />
                                <input
                                    value={short_description}
                                    onChange={(e) => setshort_description(e.target.value)}
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                            <div className='col-span-3'>
                                <FormLabel label="Description" />
                                <textarea
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    className="border p-2 w-full rounded"
                                />
                            </div>
                            <div className=" gap-2">
                                <button className="bg-blue-400 text-xs uppercase text-white px-5 rounded py-3 cursor-pointer">
                                    {editId ? "UPDATE" : "SUBMIT"}

                                </button>


                            </div>
                        </div>
                    </form>
                    <div className="pt-5 overflow-x-auto">
                        <table className="w-full table-fixed border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold text-gray-700 text-start">
                                    <th className="p-3 w-[15%] text-left">
                                        Image
                                    </th>
                                    <th className="p-3 w-[15%] text-left">Title</th>
                                    <th className="p-3 w-[10%] text-center">Short Description</th>
                                    <th className="p-3 w-[10%] text-center">Description</th>
                                    <th className="p-3 w-[10%] text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data?.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-500">
                                            No blog found
                                        </td>
                                    </tr>
                                ) : (
                                    data?.map(blog => (
                                        <tr
                                            key={blog._id}
                                            className="bg-white text-sm  shadow-sm rounded"
                                        >
                                            <td className="p-3 font-medium break-words">
                                                <img src={`${Base_Url}/${blog.image}`} className='h-20 w-20 rounded-fill' />
                                            </td>
                                            {/* Title */}
                                            <td className="p-3 font-medium break-words">
                                                {blog.title}
                                            </td>
                                            <td className="p-3 font-medium break-words">
                                                {blog.short_description}
                                            </td>
                                            <td
                                                className="p-3 font-medium break-words"
                                                style={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {blog.description}
                                            </td>


                                            {/* Action */}
                                            <td className="p-3">
                                                <div className="flex gap-3 justify-center">
                                                    <button
                                                        onClick={() => handleEdit(blog)}
                                                    >
                                                        <FaRegEdit className="text-blue-500 text-xl hover:scale-110 transition" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(blog._id)}
                                                    >
                                                        <AiOutlineDelete className="text-red-500 text-xl hover:scale-110 transition" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Blog
