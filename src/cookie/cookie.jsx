import { Cookies } from "react-cookie";
import React, { useState } from "react";

const cookies = new Cookies();

export const setCookie = (name, value, option={path:'/'}) => {
    console.log("setCookie");
    return cookies.set(name, value, {...option});
}

export const getCookie = (name, option={doNotParse:false}) => {
    return cookies.get(name, {...option});
}