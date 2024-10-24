import React, { useEffect, useContext,useState } from "react";
import { Button, Card, CardContent, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {  Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import { AiOutlineMenu } from "react-icons/ai";
import { FaCarSide } from "react-icons/fa";
import { dataContext } from "../context/dataContext";
import "./homepage.css";
import { ReactTyped } from "react-typed";


export default function Component() {
    const navigate = useNavigate();
    const { loginStatus } = useContext(dataContext);

    const handleButton = () => {
        console.log("Button clicked");
        navigate("/buses");
    };

    useEffect(() => {
        loginStatus && navigate("/profile");
    }, [loginStatus]);

    const [sticky,setSticky]=useState(false);
  const [stick,setStick]=useState(false);
  const togglemenu=()=>{
    stick? setStick(false) : setStick(true);
  }

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY>50 ? setSticky(true) : setSticky(false);
    });


  },[]);

    return (
        // <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-100 to-green-300 dark:bg-gray-900 text-gray-800 dark:text-gray-100 photo">
        //     {/* Header */}
        //     <header className="px-4 lg:px-6 h-16 flex items-center bg-white dark:bg-gray-800 shadow-md">
        //     <Link href="#" className="flex items-center justify-center ">
        //         <FaCarSide className="h-8 w-8" />
        //             <div className="ml-2 font-semibold text-2xl"> {/* Changed to text-2xl for larger font size */}
        //               CabHub
        //             </div>
        //         </Link>
        //         <nav className="ml-auto flex gap-4 sm:gap-6">
        //             <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 text-green-700">
        //                 Home
        //             </Link>
        //             <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4 text-green-700">
        //                 Login
        //             </Link>
        //             <Link href="/signup" className="text-sm font-medium hover:underline underline-offset-4 text-green-700">
        //                 Signup
        //             </Link>
        //         </nav>
        //     </header>

        //     {/* Main Section */}
        //     <main className="flex-1 bg-white dark:bg-gray-900">
        //         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        //             <div className="container px-4 md:px-6">
        //                 <div className="flex flex-col items-center space-y-4 text-center">
        //                     <div className="space-y-2">
        //                         <Typography
        //                             variant="h3"
        //                             className="text-3xl font-bold tracking-tight sm:text-5xl text-green-600"
        //                         >
        //                             Welcome to Cab Hub
        //                         </Typography>
        //                         <Typography
        //                             variant="body1"
        //                             className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
        //                         >
        //                             Your journey starts here.
        //                         </Typography>
        //                     </div>
                            // <div className="flex flex-col gap-2 md:flex-row justify-center">
                            //     <Button
                            //         className="w-full md:w-auto bg-green-500 text-white hover:bg-green-600"
                            //         href="/login"
                            //     >
                            //         Login
                            //     </Button>
                            //     <Button
                            //         className="w-full md:w-auto bg-green-500 text-white hover:bg-green-600"
                            //         href="/signup"
                            //     >
                            //         Signup
                            //     </Button>
                            // </div>
        //                 </div>
        //             </div>
        //         </section>

               
        //     </main>

        //     {/* Footer */}
        //     <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-800 shadow-md">
        //         <Typography
        //             variant="body2"
        //             className="text-xs text-gray-500 dark:text-gray-400"
        //         >
        //             © 2024 Bus Booking. All rights reserved.
        //         </Typography>
        //         <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        //             <Link href="#" className="text-xs hover:underline underline-offset-4">
        //                 Terms of Service
        //             </Link>
        //             <Link href="#" className="text-xs hover:underline underline-offset-4">
        //                 Privacy
        //             </Link>
        //             <Link href="#" className="text-xs hover:underline underline-offset-4">
        //                 Contact
        //             </Link>
        //         </nav>
        //     </footer>
        // </div>

        <div className="photo">

            <nav className="`navbar ${sticky ? 'dark-nav' : ' '}`">
            <div className="xyz">
                <p>CabHub</p>
                <div className="mx-5">

                </div>
            </div>
                <ul>
                <li ><a href="/">Home</a></li>
                <li ><a href="/login">LogIn</a></li>
                <li ><a href="/signup">SignUp</a></li>
                </ul>
                
            </nav>
            <div className="hero">
            <div className='hero container'>
             <h1 >Welcome to CabHub</h1>
         <p className='parag'>
         Your journey starts here.
         </p>
         
          <div className="btt">
             <button class="button-6" role="button"><a href="/login">Login</a></button>
             <button class="button-6" role="button"><a href="/signup">Signup</a></button>
          </div>
        
        </div>
            </div>
            <div className='footer'>
        <p>© 2024 CarHub. All rights reserved.</p>
        <ul>
            <li>Terms of Services</li>
            <li>Privacy Policy</li>
        </ul>
    </div>
        </div>
    );
}

