"use client";
import { useEffect } from "react";

const Page = () => {
    useEffect(() => {
        window.location.href = "/";
    }, []);
}

export default Page;