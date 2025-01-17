"use client";

import { CallToAction } from "./sections/CallToAction";
import { CaloriesForm } from "./sections/CaloriesForm";
import { Navbar } from "./sections/Navbar";


export default function Home() {

  return (
    <>
    <Navbar/>
    <CallToAction />
    <CaloriesForm />
    </>
  );
}
