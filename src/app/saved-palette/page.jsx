"use client";
import React,{useEffect} from "react";
import Navbar from "@/app/components/Navbar";

const savedPalettePage = () => {
    useEffect(() => {
        document.title = 'Saved Palette';
    }, [])
    return (
        <div>
            <Navbar />
        </div>
    );
}

export default savedPalettePage;