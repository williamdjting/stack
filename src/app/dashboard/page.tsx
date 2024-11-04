import { Card } from "../ui/dashboard/cards";
//import { datasheetData } from "../lib/datasheet-data";
import { Form } from "../ui/dashboard/form";
import Notes from "../ui/dashboard/notes";

import Notes1 from "../ui/dashboard/notes1";

import { Header } from "@/app/ui/dashboard/header";

import { Footer } from "@/app/ui/dashboard/footer";

import { Sidebar } from "@/app/ui/dashboard/sidebar";

// import { AddProject } from "../ui/dashboard/add-project";
import styles from "./dashboard.module.css";
// import { isDataView } from "util/types";

// import SideNav from '@/app/ui/dashboard/sidenav';

// this is the homepage where the forms get rendedred

export default function Page() {
  return (
    <main>
      <div>


      {/* </div>
        <SideNav />
      <div > */}
        <Header />
        {/* <Form /> */}
        <div className={styles.container}>
          <div className={styles.box1}>
            <Sidebar />
          </div>

          <div className={styles.box2}>
            <Notes />
            {/* <Notes1 /> */}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
