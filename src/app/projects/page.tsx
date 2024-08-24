import { Card } from "../ui/dashboard/cards";
//import { datasheetData } from "../lib/datasheet-data";
import { Form } from "../ui/dashboard/form";
import Notes  from "../ui/dashboard/notes";

import Notes1 from "../ui/dashboard/notes1";

import { Header } from "@/app/ui/dashboard/header";

import { Footer } from "@/app/ui/dashboard/footer";

import { AddProject } from "../ui/dashboard/add-project";
import  styles  from './dashboard.module.css';
import { isDataView } from "util/types";

// this is the homepage where the forms get rendedred

export default function Page() {
  return (
    <main>

        <div>
          <Header />
          <Form />
          <Notes />
          <Notes1/>
          <Footer/>
        </div>


    </main>
  );
}
