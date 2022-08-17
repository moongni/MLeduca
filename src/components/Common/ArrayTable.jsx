import React from "react";

const ArrayTable = ({props}) => {
    return (
        <div className="max-h-[28rem] overflow-scroll ">
            { props.data.length > 0 && 
                <table className="">
                    <thead>
                        <tr key={"column"}
                            className="border-b-2 border-yellow-300">
                            { props.columns.map((column) => (
                                <th className="text-left p-3 border-r-8 border-slate-50">
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        { props.data.map((items, idx) => {
                            return (
                                <tr className="mx-1 py-2 border-b-2 border-slate-100"
                                    key={idx}>
                                    {
                                        props.columns.map((column, index) => (
                                                <td className="w-5 p-3 mr-2 tracking-widest">
                                                    {items[index]? items[index]: "null"}
                                                </td>
                                            )
                                        )
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default React.memo(ArrayTable);