import React, { useState } from "react";
import TopHeader from "../Component/TopHeader";
import SectionTitle from "../Component/SectionTitle";
import axios from "axios";
import moment from "moment";
import { Base_Url } from "../API/Base_Url";
import { toast } from "react-toastify";

const GoogleForm = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    // ✅ Fetch Data
    const fetchData = async () => {
        try {
            const res = await axios.get(`${Base_Url}/google-service-enquiry`);
            if (res.data.success) {
                setData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    // ✅ FILTER LOGIC
    const filteredData = data.filter((item) => {
        const matchesSearch =
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.organisation?.toLowerCase().includes(search.toLowerCase()) ||
            item.domain?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.contactNo?.toLowerCase().includes(search.toLowerCase());

        const matchesDate = dateFilter
            ? moment(item.createdAt).format("YYYY-MM-DD") === dateFilter
            : true;

        return matchesSearch && matchesDate;
    });

    // ✅ Export CSV (filtered)
    const exportCSV = () => {
        const headers = ["Name", "Org", "Domain", "Users", "Email", "Phone"];

        const rows = filteredData.map(item => [
            item.name,
            item.organisation,
            item.domain,
            item.users,
            item.email,
            item.contactNo,
        ]);

        const csvContent =
            headers.join(",") + "\n" +
            rows.map(row => row.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "google-customers.csv";
        link.click();
    };
     // Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this entry?")) return;

        try {
            await axios.delete(`${Base_Url}/google-service-enquiry/${id}`);
            setData(prev => prev.filter(item => item._id !== id));
            toast.success("Deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <>
            <TopHeader />

            <section className="p-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
                    <SectionTitle title="Register Customer" />

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
                        placeholder="Search by name, org, domain..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded px-3 py-2 w-full md:w-[300px]"
                    />

                    {/* Date */}
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
                    <table className="w-full min-w-[800px]">

                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-start">Name</th>
                                <th className="p-3 text-start">Org</th>
                                <th className="p-3 text-start">Domain</th>
                                <th className="p-3 text-start">Users</th>
                                <th className="p-3 text-start">Email</th>
                                <th className="p-3 text-start">Phone</th>
                                <th className="p-3 text-start">Date</th>
                                <th className="p-3 text-start">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-6">
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item) => (
                                    <tr key={item._id} className="bg-white border-b">

                                        <td className="p-3">{item.name}</td>
                                        <td>{item.organisation}</td>
                                        <td>{item.domain}</td>
                                        <td>{item.users}</td>
                                        <td>{item.email}</td>
                                        <td>{item.contactNo}</td>
                                        <td>
                                            {moment(item.createdAt).format("DD MMM YYYY")}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(item._id)}
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
                <div className="md:hidden mt-4 space-y-4">

                    {filteredData.length === 0 ? (
                        <p className="text-center text-gray-500">No data found</p>
                    ) : (
                        filteredData.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded shadow space-y-2">

                                <div className="flex justify-between">
                                    <span>Name</span>
                                    <b>{item.name}</b>
                                </div>

                                <div className="flex justify-between">
                                    <span>Org</span>
                                    <span>{item.organisation}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Domain</span>
                                    <span>{item.domain}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Users</span>
                                    <span>{item.users}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Email</span>
                                    <span className="text-xs">{item.email}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Phone</span>
                                    <span>{item.contactNo}</span>
                                </div>

                                <div className="text-xs text-gray-400 text-right">
                                    {moment(item.createdAt).format("DD MMM YYYY, hh:mm A")}
                                </div>

                            </div>
                        ))
                    )}

                </div>

            </section>
        </>
    );
};

export default GoogleForm;