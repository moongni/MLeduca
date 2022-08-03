import React from "react";

const DictTable = ({props}) => {
    return (
        <div className="max-h-[28rem] overflow-scroll ">
            { props.data.length > 0 && 
                <table className="">
                    <thead>
                    <tr key={"column"}
                        className="">
                        { props.columns.map((column) => (
                            <th className="">{column}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="">
                        { props.data.map((items, idx) => {
                            return (
                                <tr key={idx}>
                                    {
                                        props.columns.map((column) => {
                                            return (
                                                <td >
                                                    {items[column]}
                                                </td>
                                            )
                                        })
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

export default DictTable;