import React, { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [eye, setEye] = useState(true);
  const [form, setForm] = useState({ website: "", username: "", password: "" });
  const [data, setData] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setData(JSON.parse(passwords));
    }
  }, []);

  const saveData = (e) => {
    e.preventDefault();
    toast("Saved Password", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setData([...data, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...data, { ...form, id: uuidv4() }])
    );
    setForm({ website: "", username: "", password: "" });
  };

  const copyTxt = (e) => {
    toast("Copy to Clipboard ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(e);
    console.log("copy", e);
  };

  const deletePassword = (id) => {
    const con = confirm("Do you really want to delete this passowrd");
    if (con) {
      setData(data.filter((items) => items.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(data.filter((items) => items.id !== id))
      );
      toast("Deleted Password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    setForm({ website: "", username: "", password: "" });
  };

  const editPassword = (id) => {
    setForm(data.filter((items) => items.id === id)[0]);
    setData(data.filter((items) => items.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="min-h-[77vh]">
        <div className="text-center mt-20">
          <div className="text-4xl font-bold my-1">
            <span className="text-green-600 text-3xl">&lt;Pass</span>Protector
            <span className="text-green-600 text-3xl">/&gt;</span>
          </div>
          <p className="font-bold text-base">Your own Password Protector</p>
        </div>
        <form
          onSubmit={saveData}
          className="mx-auto flex flex-col justify-center items-center max-w-4xl px-2 py-5"
        >
          <input
            value={form.website}
            onChange={handleChange}
            className="border-2 bg-transparent border-green-700 placeholder:text-sm rounded-full w-full px-4 p-2 my-3"
            name="website"
            type="text"
            required
            placeholder="Enter Website Url"
          />
          <div className="block md:flex justify-between items-center gap-3 w-full">
            <input
              value={form.username}
              onChange={handleChange}
              className="border-2 border-green-700 bg-transparent placeholder:text-sm rounded-full w-full md:w-8/12 px-4 p-2 my-3"
              type="text"
              name="username"
              required
              placeholder="Enter Your Username"
            />
            <div className="relative w-full md:w-4/12">
              <input
                value={form.password}
                onChange={handleChange}
                className="border-2 border-green-700 bg-transparent placeholder:text-sm rounded-full w-full px-4 p-2 my-3"
                type={eye ? "password" : "text"}
                name="password"
                required
                placeholder="Enter Your Password"
              />
              <span
                onClick={() => {
                  setEye(!eye);
                }}
                className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"
              >
                {eye ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </span>
            </div>
          </div>
          <button className="flex justify-center items-center gap-1 bg-green-700 hover:bg-green-600 text-white py-2 px-5 rounded-xl my-3">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "28px", height: "28px" }}
            ></lord-icon>
            <span className="font-bold">Save</span>
          </button>
        </form>

        <div className="md:mx-auto gap-8 max-w-4xl mx-2">
          <h2 className="font-bold text-2xl pb-2">Your own Password Protector</h2>

          <div className="tableScroll overflow-x-auto mb-3">
            {data.length === 0 ? (
              <div className="text-center font-bold">
                <h1>No Password Available</h1>
              </div>
            ) : (
              <table className="table-auto w-full rounded-md overflow-hidden mb-3">
                <thead className="font-bold bg-green-700 text-white">
                  <tr>
                    <th className="w-5/12 border border-green-700 py-3">
                      Website
                    </th>
                    <th className="w-3/12 border border-green-700 py-3">
                      Username
                    </th>
                    <th className="w-2/12 border border-green-700 py-3">
                      Password
                    </th>
                    <th className="w-2/12 border border-green-700 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-green-500/20">
                  {data.map((items, i) => {
                    return (
                      <tr key={i} className="">
                        <td className="text-nowrap border border-green-700 p-2 text-center">
                          <a
                            className="underline "
                            target="_blank"
                            href={items.website}
                          >
                            {items.website}
                          </a>
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            // colors="primary:#ffffff"
                            style={{
                              width: "23px",
                              height: "23px",
                              paddingTop: "10px",
                              paddingLeft: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              copyTxt(items.website);
                            }}
                          ></lord-icon>
                        </td>
                        <td className="text-nowrap border border-green-700 p-2 text-center">
                          {items.username}
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            // colors="primary:#ffffff"
                            style={{
                              width: "23px",
                              height: "23px",
                              paddingTop: "10px",
                              paddingLeft: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              copyTxt(items.username);
                            }}
                          ></lord-icon>
                        </td>
                        <td className="text-nowrap border border-green-700 p-2 text-center">
                          {"*".repeat(items.password.length)}
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            // colors="primary:#ffffff"
                            style={{
                              width: "23px",
                              height: "23px",
                              paddingTop: "10px",
                              paddingLeft: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              copyTxt(items.password);
                            }}
                          ></lord-icon>
                        </td>
                        <td className="text-nowrap border border-green-700 p-2 text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{
                              width: "23px",
                              height: "23px",
                              paddingTop: "10px",
                              paddingLeft: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              editPassword(items.id);
                            }}
                          ></lord-icon>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{
                              width: "23px",
                              height: "23px",
                              paddingTop: "10px",
                              paddingLeft: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              deletePassword(items.id);
                            }}
                          ></lord-icon>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
