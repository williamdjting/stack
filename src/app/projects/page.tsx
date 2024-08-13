import { Card } from "../ui/dashboard/cards";
import { datasheetData } from "../lib/datasheet-data";
import { Form } from "../ui/dashboard/form";
import { Notes } from "../ui/dashboard/notes";

import { Header } from "@/app/ui/dashboard/header";

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
        </div>


    </main>
  );
}
