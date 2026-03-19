import React, { useState} from "react";
import Footer from "../Layout/Footer";
import { toast } from "react-toastify";
import SectionTitle from "../Component/SectionTitle";
import TopHeader from "../Component/TopHeader";
import { Base_Url } from "../API/Base_Url";
import axios from "axios";
import moment from "moment";
import { MdDelete } from "react-icons/md";

const ContactForm = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    // Fetch
    const fetchData = async () => {
        try {
            const resp = await axios.get(`${Base_Url}/contact-enquiries`);
            if (resp.data.success) {
                setData(resp.data.data);
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch data");
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    // Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this entry?")) return;

        try {
            await axios.delete(`${Base_Url}/contact-enquiry/${id}`);
            setData(prev => prev.filter(item => item._id !== id));
            toast.success("Deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    // 🔍 FILTER LOGIC
    const filteredData = data.filter(item => {
        const matchesSearch =
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.mobile?.toLowerCase().includes(search.toLowerCase()) ||
            item.message?.toLowerCase().includes(search.toLowerCase());

        const matchesDate = dateFilter
            ? moment(item.createdAt).format("YYYY-MM-DD") === dateFilter
            : true;

        return matchesSearch && matchesDate;
    });

    // CSV
    const exportCSV = () => {
        const headers = ["Name", "Mobile", "Email", "Message"];

        const rows = filteredData.map(item => [
            item.name,
            item.mobile,
            item.email,
            item.message,
        ]);

        const csvContent =
            headers.join(",") + "\n" +
            rows.map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "contact-enquiries.csv";
        link.click();
    };

    return (
        <>
            <TopHeader />

            <section className="py-4 px-3 md:px-6">
                <div className="container mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
                        <SectionTitle title="Contact Enquiry" />

                        <button
                            onClick={exportCSV}
                            className="bg-indigo-500 text-white px-4 py-2 rounded text-sm"
                        >
                            Export CSV
                        </button>
                    </div>

                    {/* 🔍 FILTER SECTION */}
                    <div className="flex flex-col md:flex-row gap-3 mb-4">

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search by name, email, mobile..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded px-3 py-2 w-full md:w-[300px]"
                        />

                        {/* Date Filter */}
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="border rounded px-3 py-2 w-full md:w-[200px]"
                        />

                        {/* Clear */}
                        <button
                            onClick={() => {
                                setSearch("");
                                setDateFilter("");
                            }}
                            className="bg-gray-200 px-3 py-2 rounded text-sm"
                        >
                            Clear
                        </button>

                    </div>

                    {/* ===== DESKTOP TABLE ===== */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full min-w-[700px]">

                            <thead className="bg-gray-200">
                                <tr className="">
                                    <th className="p-3 text-start">Name</th>
                                    <th className="p-3 text-start">Mobile</th>
                                    <th className="p-3 text-start">Email</th>
                                    <th className="p-3 text-start">Message</th>
                                    <th className="p-3 text-start">Date</th>
                                    <th className="p-3 text-start">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className=" py-6">
                                            No data found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((itm) => (
                                        <tr key={itm._id} className="bg-white border-b">

                                            <td className="p-3">{itm.name}</td>
                                            <td>{itm.mobile}</td>
                                            <td>{itm.email}</td>
                                            <td className="max-w-[200px] truncate">{itm.message}</td>
                                            <td>{moment(itm.createdAt).format("DD MMM YYYY")}</td>

                                            <td>
                                                <button
                                                    onClick={() => handleDelete(itm._id)}
                                                    className="text-red-500 text-xl"
                                                >
                                                    <MdDelete />
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>

                    {/* ===== MOBILE CARDS ===== */}
                    <div className="md:hidden space-y-4">

                        {filteredData.length === 0 ? (
                            <p className="text-center text-gray-500">No data found</p>
                        ) : (
                            filteredData.map((itm) => (
                                <div key={itm._id} className="bg-white p-4 rounded shadow">

                                    <div className="flex justify-between">
                                        <b>{itm.name}</b>
                                        <MdDelete
                                            className="text-red-500 text-xl"
                                            onClick={() => handleDelete(itm._id)}
                                        />
                                    </div>

                                    <p className="text-sm">{itm.mobile}</p>
                                    <p className="text-sm">{itm.email}</p>
                                    <p className="text-sm break-words">{itm.message}</p>

                                    <div className="text-xs text-gray-400 text-right mt-2">
                                        {moment(itm.createdAt).format("DD MMM YYYY")}
                                    </div>

                                </div>
                            ))
                        )}

                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
};

export default ContactForm;