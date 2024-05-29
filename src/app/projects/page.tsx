import { Card } from "../ui/dashboard/cards";
import { datasheetData } from "../lib/datasheet-data";
import { Form } from "../ui/dashboard/form";
import { AddProject } from "../ui/dashboard/add-project";
import  styles  from './dashboard.module.css';
import { isDataView } from "util/types";

export default function Page() {
  return (
    <main>
      {/* <div className={styles.dashboard}> */}
        {/* <div>
          {datasheetData.map((data) => {
            return (
              <Card
                key={data.id}
                title={data.name}
                value={data.description}
                value2={data.description2}
              />
            );
          })}
        </div> */}
        <div>
          {/* <AddProject/> */}
        </div>

        <div>
          <Form />
        </div>
      {/* </div> */}
    </main>
  );
}
