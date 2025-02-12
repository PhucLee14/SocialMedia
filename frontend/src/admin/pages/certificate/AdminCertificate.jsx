import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminCertificate = () => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/certificate")
            .then((res) => setCertificates(res.data))
            .catch((err) => console.log(err));
    }, [certificates]);
    return (
        <div>
            {certificates.map((certificate, index) => {
                return (
                    <div className=" flex justify-between items-center w-full border-b ">
                        <p
                            className="font-bold p-4 pr-96 cursor-pointer    "
                            onClick={(e) => {
                                document
                                    .getElementById(
                                        `certificate_modal_${index}`
                                    )
                                    .showModal();
                            }}
                        >
                            {certificate.title}
                        </p>
                        <dialog
                            id={`certificate_modal_${index}`}
                            className="modal"
                        >
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                    {certificate.title}
                                    <span className="ml-1 text-xs font-extralight italic text-slate-400">
                                        {"("}
                                        {certificate.status}
                                        {")"}
                                    </span>
                                </h3>
                                <p className="py-2 text-indigo-600 font-bold text-sm">
                                    Mục {certificate.name}
                                </p>
                                <p className="py-4">{certificate.note}</p>
                                <img src={certificate.images} alt="" />
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                );
            })}
        </div>
    );
};

export default AdminCertificate;
