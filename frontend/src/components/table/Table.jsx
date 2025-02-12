import React, { useEffect, useState } from "react";

import { useTable } from "react-table";
import NewsFeed from "../../pages/newsfeed/NewsFeed";
import axios from "axios";
import { extractTime } from "../../utils/extractTime";
import { Link } from "react-router-dom";
function Table({ dataName }) {
    var localStorageData = localStorage.getItem("user");
    if (localStorageData) {
        var userData = JSON.parse(localStorageData);
    }
    const [newsFeeds, setNewsFeeds] = useState([]);
    const [modal, setModal] = useState(false);
    const [point, setPoint] = useState(0);
    const [pos, setPos] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:5000/newsfeed")
            .then((res) => setNewsFeeds(res.data))
            .catch((err) => console.log("loi ben frontend"));
    }, []);

    console.log(newsFeeds);

    const data = React.useMemo(() => dataName, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "STT",
                accessor: "ID",
            },
            {
                Header: "Nội dung",
                accessor: "content",
            },
            {
                Header: "Điểm",
                accessor: "point",
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className="mb-10 flex flex-col">
            <div className="m-4 mb-0 text-sm flex justify-end items-end">
                {/* <div>
                    {" "}
                    Điểm hiện tại: <span className="font-bold">{point}</span>
                </div> */}
                <div className="my-4">
                    {userData ? (
                        userData.isAdmin ? (
                            <Link
                                to={"/certificate/pending"}
                                className="p-4 rounded-xl bg-indigo-600 text-white font-semibold ml-4"
                            >
                                Minh chứng chờ duyệt
                            </Link>
                        ) : (
                            <p></p>
                        )
                    ) : (
                        ""
                    )}
                    <Link
                        to={"/certificate"}
                        className="p-4 rounded-xl bg-indigo-600 text-white font-semibold ml-4"
                    >
                        Thêm minh chứng
                    </Link>
                </div>
            </div>
            <table
                {...getTableProps()}
                className="border-collapse overflow-hidden rounded-xl m-4 bg-white shadow-xl"
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="text-left bg-indigo-600 text-white p-4"
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                            <th className="text-left bg-indigo-600 text-white p-4 w-24 text-center">
                                Chi tiết
                            </th>
                            <th className="text-left bg-indigo-600 text-white p-4"></th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="hover:bg-indigo-50"
                            >
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="p-4 text-black"
                                    >
                                        {cell
                                            .getCellProps()
                                            .key.substring(
                                                cell.getCellProps().key.length -
                                                    7
                                            ) === "content"
                                            ? cell
                                                  .render("Cell")
                                                  .props.data[
                                                      index
                                                  ].content.split("\n")[0]
                                            : cell.render("Cell")}
                                        {cell
                                            .getCellProps()
                                            .key.substring(
                                                cell.getCellProps().key.length -
                                                    7
                                            ) === "content" ? (
                                            <div className="text-indigo-600 italic text-sm mt-2 font-bold h-full w-full  ">
                                                {cell
                                                    .render("Cell")
                                                    .props.data[
                                                        index
                                                    ].content.split("\n")
                                                    .map((item, i) =>
                                                        cell
                                                            .render("Cell")
                                                            .props.data[
                                                                index
                                                            ].content.split(
                                                                "\n"
                                                            )[i] !=
                                                            cell
                                                                .render("Cell")
                                                                .props.data[
                                                                    index
                                                                ].content.split(
                                                                    "\n"
                                                                )[0] &&
                                                        cell
                                                            .render("Cell")
                                                            .props.data[
                                                                index
                                                            ].content.split(
                                                                "\n"
                                                            )[i] !=
                                                            cell
                                                                .render("Cell")
                                                                .props.data[
                                                                    index
                                                                ].content.split(
                                                                    "\n"
                                                                )[
                                                                cell
                                                                    .render(
                                                                        "Cell"
                                                                    )
                                                                    .props.data[
                                                                        index
                                                                    ].content.split(
                                                                        "\n"
                                                                    ).length - 1
                                                            ] ? (
                                                            <p className="text-black font-normal ">
                                                                {item}
                                                            </p>
                                                        ) : (
                                                            <p></p>
                                                        )
                                                    )}
                                                {
                                                    cell
                                                        .render("Cell")
                                                        .props.data[
                                                            index
                                                        ].content.split("\n")[
                                                        cell
                                                            .render("Cell")
                                                            .props.data[
                                                                index
                                                            ].content.split(
                                                                "\n"
                                                            ).length - 1
                                                    ]
                                                }
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {}
                                    </td>
                                ))}
                                <td className=" text-center">
                                    <button
                                        className="text-indigo-600 font-bold hover:underline"
                                        onClick={() => {
                                            setPos(index);
                                            document
                                                .getElementById("my_modal_2")
                                                .showModal();
                                        }}
                                    >
                                        Xem thêm
                                    </button>
                                </td>
                                <td>
                                    {/* <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            const { value, checked } = e.target;
                                            if (checked) {
                                                setPoint(
                                                    point + data[index].point
                                                );
                                            } else {
                                                setPoint(
                                                    point - data[index].point
                                                );
                                            }
                                        }}
                                    /> */}
                                    <dialog id="my_modal_2" className="modal">
                                        <div className="modal-box max-w-full w-1/2">
                                            <p className="py-4">
                                                {/* {
                                                    data[pos].content.split(
                                                        "\n"
                                                    )[
                                                        data[pos].content.split(
                                                            "\n"
                                                        ).length - 1
                                                    ]
                                                } */}
                                                {newsFeeds
                                                    .reverse()
                                                    .map((news, index) => {
                                                        return news.name ===
                                                            data[pos].ID +
                                                                data[
                                                                    pos
                                                                ].content.charAt(
                                                                    0
                                                                ) ? (
                                                            <Link
                                                                to={`/newsfeed/${news._id}`}
                                                                key={index}
                                                                className=" flex flex-col items-center"
                                                            >
                                                                <div className="w-full  bg-white border-gray-300 border rounded-xl mb-4 relative">
                                                                    <div>
                                                                        <h1 className="m-4 mt-2 mb-0 font-bold text-lg">
                                                                            {
                                                                                news.title
                                                                            }
                                                                        </h1>
                                                                        <p className="m-4 mt-1 text-xs font-mediums text-gray-400">
                                                                            {extractTime(
                                                                                news.createdAt
                                                                            )}
                                                                            <span>
                                                                                {extractTime(
                                                                                    news.createdAt
                                                                                ) ==
                                                                                extractTime(
                                                                                    news.updatedAt
                                                                                )
                                                                                    ? ""
                                                                                    : " (Edited)"}
                                                                            </span>
                                                                        </p>
                                                                        <p className="ml-4 font-bold text-xs italic text-indigo-600">
                                                                            {
                                                                                news.type
                                                                            }
                                                                        </p>
                                                                        <div className="m-4">
                                                                            {
                                                                                news.content
                                                                            }
                                                                        </div>
                                                                        <div className="flex flex-wrap rounded-b-xl overflow-hidden">
                                                                            {news.images.map(
                                                                                (
                                                                                    img,
                                                                                    i
                                                                                ) => {
                                                                                    return (
                                                                                        <img
                                                                                            src={
                                                                                                img
                                                                                            }
                                                                                            alt=""
                                                                                            className="max-w-full w-full"
                                                                                        />
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ) : (
                                                            ""
                                                        );
                                                    })}
                                            </p>
                                        </div>
                                        <form
                                            method="dialog"
                                            className="modal-backdrop"
                                        >
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
