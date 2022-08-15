import React from "react";

const ArrayTable = ({props}) => {
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
                                        props.columns.map((column, index) => {
                                            return (
                                                <td >
                                                    {items[index]? items[index]: "null"}
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

export default React.memo(ArrayTable);