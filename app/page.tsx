import Notes from "../components/ui/dashboard/notes";


import { Header } from "../components/ui/dashboard/header";

import { Footer } from "../components/ui/dashboard/footer";

import { Sidebar } from "../components/ui/dashboard/sidebar";

// import { AddProject } from "../ui/dashboard/add-project";
import styles from "../styles/dashboard.module.css";
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
